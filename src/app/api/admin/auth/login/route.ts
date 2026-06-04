export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Query admin_users table
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, permissions, password_hash, otp_secret, is_active')
      .eq('email', email.toLowerCase().trim())
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      // Same error for both "not found" and "wrong password" — prevents user enumeration
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify bcrypt password hash
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign a short-lived "pending" JWT (10 min) — full session only after TOTP
    const pendingToken = await new SignJWT({ adminId: admin.id, email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('10m')
      .sign(SECRET);

    const res = NextResponse.json({ success: true, requireOTP: true });
    res.cookies.set('admin_pending', pendingToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   600,
      path:     '/',
    });
    return res;

  } catch (err) {
    console.error('[Admin Login]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
