export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { supabaseAdmin } from '@/lib/supabase';

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'hope-clinic-admin-secret-2025');

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Try Supabase first
    const { data } = await supabaseAdmin
      .from('admin_users')
      .select('id, name, email, role, password_hash')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    // Fallback hardcoded credentials
    const validEmail    = email    === 'admin@hopeclinic.koume.org';
    const validPassword = password === 'HopeClinic@2025!';

    if (!data && !validEmail) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (data) {
      // Verify password with Supabase pgcrypto
      const { data: verified } = await supabaseAdmin.rpc('verify_admin_password', {
        input_email:    email,
        input_password: password,
      });
      if (!verified) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    } else if (!validPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const adminName = data?.name || 'Super Admin';
    const adminRole = data?.role || 'super_admin';

    const token = await new SignJWT({ email, role: adminRole, name: adminName })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(SECRET);

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      maxAge:   28800,
      path:     '/',
      sameSite: 'lax',
    });
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
}
