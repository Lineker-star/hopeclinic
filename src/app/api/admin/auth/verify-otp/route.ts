export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { signAdminToken } from '@/lib/admin/auth';

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();
    const adminId = req.cookies.get('admin_pending')?.value;

    if (!otp || !adminId) {
      return NextResponse.json({ error: 'Missing OTP or session' }, { status: 400 });
    }

    // Find valid OTP
    const { data: session } = await supabaseAdmin
      .from('otp_sessions')
      .select('*')
      .eq('admin_id', adminId)
      .eq('otp_code', otp)
      .eq('is_used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // Mark OTP used
    await supabaseAdmin
      .from('otp_sessions')
      .update({ is_used: true })
      .eq('id', session.id);

    // Get admin details
    const { data: admin } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, permissions')
      .eq('id', adminId)
      .single();

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 401 });
    }

    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminId);

    // Issue session token
    const token = await signAdminToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions || {},
    });

    const res = NextResponse.json({ success: true, redirect: '/admin-hck-2025/dashboard' });

    // Clear pending cookie, set session
    res.cookies.delete('admin_pending');
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('[Admin OTP Verify]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
