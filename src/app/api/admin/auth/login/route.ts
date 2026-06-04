export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hope-clinic-secret-2025'
);

const FALLBACK_EMAIL    = 'admin@hopeclinic.koume.org';
const FALLBACK_PASSWORD = 'HopeClinic@2025!';

async function issueSession(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { email?: string; password?: string };
  const email    = (body.email    ?? '').trim().toLowerCase();
  const password = body.password  ?? '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  let adminId    = 'admin-001';
  let adminName  = 'Hope Clinic Admin';
  let adminEmail = FALLBACK_EMAIL;
  let adminRole  = 'super_admin';
  let adminPerms: Record<string, unknown> = {};
  let authenticated = false;

  // ── 1. Try Supabase admin_users ───────────────────────────────────────────
  try {
    const { supabaseAdmin } = await import('@/lib/supabase');
    const { data } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, permissions, password_hash, is_active')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (data?.password_hash && !data.password_hash.includes('placeholder')) {
      const valid = await bcrypt.compare(password, data.password_hash);
      if (valid) {
        adminId    = data.id;
        adminEmail = data.email;
        adminName  = data.name;
        adminRole  = data.role;
        adminPerms = data.permissions ?? {};
        authenticated = true;

        // Update last_login — non-blocking, best-effort
        void supabaseAdmin
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.id);
      }
    }
  } catch {
    // Supabase unavailable — fall through to hardcoded check
  }

  // ── 2. Hardcoded fallback ─────────────────────────────────────────────────
  if (!authenticated) {
    if (email === FALLBACK_EMAIL && password === FALLBACK_PASSWORD) {
      authenticated = true;
    }
  }

  if (!authenticated) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  // ── 3. Issue 8-hour session JWT directly (no OTP step) ───────────────────
  const token = await issueSession({
    adminId,
    email:       adminEmail,
    name:        adminName,
    role:        adminRole,
    permissions: adminPerms,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   8 * 60 * 60,
    path:     '/',
  });
  return res;
}
