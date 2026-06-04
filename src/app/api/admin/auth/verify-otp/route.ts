export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';
import speakeasy from 'speakeasy';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hope-clinic-secret-2025'
);

// Fallback admin (used when Supabase is not configured or query fails)
const FALLBACK = {
  adminId:    'admin-001',
  email:      'admin@hopeclinic.koume.org',
  name:       'Hope Clinic Admin',
  role:       'super_admin' as const,
  otp_secret: 'JBSWY3DPEHPK3PXP',
  permissions: {},
};

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
    }

    // ── Step 1: Identify admin ──────────────────────────────────────────────
    // Try to decode the admin_pending JWT to get adminId
    let adminId: string  = FALLBACK.adminId;
    let adminEmail: string = FALLBACK.email;

    const pendingToken = req.cookies.get('admin_pending')?.value;
    if (pendingToken) {
      try {
        const { payload } = await jwtVerify(pendingToken, JWT_SECRET);
        if (payload.adminId) adminId    = payload.adminId as string;
        if (payload.email)   adminEmail = payload.email as string;
      } catch {
        // Expired or invalid pending token — continue with fallback
      }
    }

    // ── Step 2: Get otp_secret (Supabase first, then fallback) ─────────────
    let otpSecret = FALLBACK.otp_secret;
    let adminName = FALLBACK.name;
    let adminRole: 'super_admin' | 'admin' = FALLBACK.role;
    let adminPermissions: Record<string, boolean> = FALLBACK.permissions;

    try {
      const { supabaseAdmin } = await import('@/lib/supabase');
      const { data } = await supabaseAdmin
        .from('admin_users')
        .select('id, email, name, role, permissions, otp_secret, is_active')
        .eq('email', adminEmail)
        .eq('is_active', true)
        .single();

      if (data?.otp_secret) {
        otpSecret         = data.otp_secret;
        adminId           = data.id;
        adminEmail        = data.email;
        adminName         = data.name;
        adminRole         = data.role;
        adminPermissions  = data.permissions ?? {};
      }
    } catch {
      // Supabase not configured — use fallback values
    }

    // ── Step 3: Verify TOTP (±1 period = ±30 seconds tolerance) ────────────
    const valid = speakeasy.totp.verify({
      secret:   otpSecret,
      encoding: 'base32',
      token:    otp.replace(/\s/g, ''),
      window:   1,
    });

    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid code. Check your Google Authenticator and try again.' },
        { status: 401 }
      );
    }

    // ── Step 4: Update last_login (best-effort, non-blocking) ───────────────
    try {
      const { supabaseAdmin } = await import('@/lib/supabase');
      await supabaseAdmin
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('email', adminEmail);
    } catch {
      // Non-critical — proceed regardless
    }

    // ── Step 5: Issue 8-hour session JWT ────────────────────────────────────
    const sessionToken = await new SignJWT({
      adminId,
      email:       adminEmail,
      name:        adminName,
      role:        adminRole,
      permissions: adminPermissions,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(JWT_SECRET);

    const res = NextResponse.json({ success: true });
    res.cookies.delete('admin_pending');
    res.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   8 * 60 * 60,
      path:     '/',
    });
    return res;

  } catch (err) {
    console.error('[TOTP Verify]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
