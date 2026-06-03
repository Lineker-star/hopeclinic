export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateOTP } from '@/lib/admin/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Look up admin
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await supabaseAdmin.from('otp_sessions').insert({
      admin_id: admin.id,
      otp_code: otp,
      expires_at: expiresAt.toISOString(),
    });

    // Send OTP email via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'noreply@hopeclinickoume.org',
          to: email,
          subject: 'Hope Clinic Admin — Your OTP Code',
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
              <h2 style="color:#0F2340">Hope Clinic Admin Portal</h2>
              <p>Your one-time verification code:</p>
              <div style="font-size:40px;font-weight:bold;letter-spacing:8px;color:#0F2340;text-align:center;
                   padding:24px;background:#EBF0FB;border-radius:12px;margin:24px 0">
                ${otp}
              </div>
              <p style="color:#8896B3;font-size:13px">
                This code expires in 10 minutes.<br>
                If you did not request this, please ignore this email.
              </p>
            </div>
          `,
        }),
      });
    } else {
      // Dev fallback — remove before production
      console.log(`[DEV] OTP for ${email}: ${otp}`);
    }

    // Store admin_id temporarily for OTP verification step
    const res = NextResponse.json({ success: true, message: 'OTP sent to your email' });
    res.cookies.set('admin_pending', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 min
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('[Admin Login]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
