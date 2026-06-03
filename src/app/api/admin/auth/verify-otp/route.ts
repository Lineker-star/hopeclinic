export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { signAdminToken } from '@/lib/admin/auth';

export async function POST(req: NextRequest) {
  try {
    const { otp }   = await req.json();
    const adminId   = req.cookies.get('admin_pending')?.value;

    if (!otp || !adminId) {
      return NextResponse.json(
        { error: 'Missing OTP or session. Please log in again.' },
        { status: 400 }
      );
    }

    // Find a valid, unused, unexpired OTP for this admin
    const { data: session } = await supabaseAdmin
      .from('otp_sessions')
      .select('*')
      .eq('admin_id', adminId)
      .eq('otp_code', otp.trim())
      .eq('is_used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid or expired code.' },
        { status: 401 }
      );
    }

    // Mark OTP as used immediately (prevent replay)
    await supabaseAdmin
      .from('otp_sessions')
      .update({ is_used: true })
      .eq('id', session.id);

    // Fetch full admin record
    const { data: admin } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, role, permissions')
      .eq('id', adminId)
      .eq('is_active', true)
      .single();

    if (!admin) {
      return NextResponse.json({ error: 'Admin account not found.' }, { status: 401 });
    }

    // Update last_login timestamp
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminId);

    // Sign an 8-hour JWT session token
    const token = await signAdminToken({
      adminId: admin.id,
      email:   admin.email,
      name:    admin.name,
      role:    admin.role,
      permissions: admin.permissions ?? {},
    });

    // Set session cookie and clear the pending cookie
    const res = NextResponse.json({ success: true });
    res.cookies.delete('admin_pending');
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   8 * 60 * 60,   // 8 hours
      path:     '/',
    });
    return res;

  } catch (err) {
    console.error('[OTP Verify]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
