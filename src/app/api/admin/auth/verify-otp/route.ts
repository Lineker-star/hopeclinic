export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { jwtVerify, SignJWT } from 'jose';
import speakeasy from 'speakeasy';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();
    const pendingToken = req.cookies.get('admin_pending')?.value;

    if (!otp || !pendingToken) {
      return NextResponse.json(
        { error: 'Missing code or session. Please log in again.' },
        { status: 400 }
      );
    }

    // Decode the pending JWT to get adminId
    let adminId: string;
    try {
      const { payload } = await jwtVerify(pendingToken, SECRET);
      adminId = payload.adminId as string;
    } catch {
      return NextResponse.json(
        { error: 'Session expired. Please log in again.' },
        { status: 401 }
      );
    }

    // Fetch admin + their TOTP secret from Supabase
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, permissions, otp_secret, is_active')
      .eq('id', adminId)
      .eq('is_active', true)
      .single();

    if (error || !admin || !admin.otp_secret) {
      return NextResponse.json(
        { error: 'Admin not found or authenticator not configured.' },
        { status: 401 }
      );
    }

    // Verify TOTP code via speakeasy (±1 period = 30s tolerance each side)
    const valid = speakeasy.totp.verify({
      secret:   admin.otp_secret,
      encoding: 'base32',
      token:    otp.replace(/\s/g, ''),
      window:   1,
    });

    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid code. Check your Google Authenticator app and try again.' },
        { status: 401 }
      );
    }

    // Update last_login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminId);

    // Issue full 8-hour session JWT
    const sessionToken = await new SignJWT({
      adminId:     admin.id,
      email:       admin.email,
      name:        admin.name,
      role:        admin.role,
      permissions: admin.permissions ?? {},
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(SECRET);

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
