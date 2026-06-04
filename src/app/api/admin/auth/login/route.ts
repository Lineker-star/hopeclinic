export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hope-clinic-secret-2025'
);

// Hardcoded credentials for testing
const ADMIN_EMAIL    = 'admin@hopeclinic.koume.org';
const ADMIN_PASSWORD = 'HopeClinic@2025!';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await new SignJWT({ adminId: 'admin-001', email: ADMIN_EMAIL })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(SECRET);

  const res = NextResponse.json({ success: true, requireOTP: true });
  res.cookies.set('admin_pending', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   600,
    path:     '/',
  });
  return res;
}
