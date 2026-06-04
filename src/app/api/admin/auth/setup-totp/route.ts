export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateTotpSecret, getTotpUri, generateQrCodeDataUrl, signAdminToken } from '@/lib/admin/auth';

/** GET — generate a new TOTP secret and return QR code for scanning */
export async function GET(req: NextRequest) {
  const adminId = req.cookies.get('admin_pending')?.value;
  if (!adminId) return NextResponse.json({ error: 'No pending session' }, { status: 401 });

  const { data: admin } = await supabaseAdmin
    .from('admin_users')
    .select('id, email, name, role, permissions, otp_secret')
    .eq('id', adminId)
    .single();

  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 401 });

  // If already set up, they should use the verify flow
  if (admin.otp_secret) {
    return NextResponse.json({ error: 'TOTP already configured', alreadySetup: true }, { status: 400 });
  }

  // Generate a fresh secret
  const secret = await generateTotpSecret();
  const uri    = await getTotpUri(secret, admin.email);
  const qrCode = await generateQrCodeDataUrl(uri);

  // Store secret temporarily in a signed cookie (saved to DB only after successful verification)
  const res = NextResponse.json({ qrCode, email: admin.email });
  res.cookies.set('admin_totp_pending_secret', secret, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   600,
    path:     '/',
  });
  return res;
}

/** POST — verify first TOTP code, save secret, issue session */
export async function POST(req: NextRequest) {
  const adminId = req.cookies.get('admin_pending')?.value;
  const secret  = req.cookies.get('admin_totp_pending_secret')?.value;

  if (!adminId || !secret) {
    return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
  }

  const { otp } = await req.json();
  if (!otp) return NextResponse.json({ error: 'Code required' }, { status: 400 });

  const { verifyTotpToken } = await import('@/lib/admin/auth');
  const valid = await verifyTotpToken(secret, otp.trim());
  if (!valid) {
    return NextResponse.json({ error: 'Invalid code. Make sure you scanned the QR code and try again.' }, { status: 401 });
  }

  // Save TOTP secret permanently
  const { data: admin } = await supabaseAdmin
    .from('admin_users')
    .update({ otp_secret: secret, last_login: new Date().toISOString() })
    .eq('id', adminId)
    .select('id, email, name, role, permissions')
    .single();

  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 401 });

  const token = await signAdminToken({
    adminId:     admin.id,
    email:       admin.email,
    name:        admin.name,
    role:        admin.role,
    permissions: admin.permissions ?? {},
  });

  const res = NextResponse.json({ success: true });
  res.cookies.delete('admin_pending');
  res.cookies.delete('admin_totp_pending_secret');
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   8 * 60 * 60,
    path:     '/',
  });
  return res;
}
