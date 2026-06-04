import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

export interface AdminSession {
  adminId: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  permissions: Record<string, boolean>;
}

export async function signAdminToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/** Generate a new TOTP secret (base32) */
export async function generateTotpSecret(): Promise<string> {
  const speakeasy = await import('speakeasy');
  return speakeasy.default.generateSecret({ length: 20 }).base32;
}

/** Verify a TOTP token against a base32 secret */
export async function verifyTotpToken(secret: string, token: string): Promise<boolean> {
  try {
    const speakeasy = await import('speakeasy');
    return speakeasy.default.totp.verify({ secret, encoding: 'base32', token: token.replace(/\s/g, ''), window: 1 });
  } catch {
    return false;
  }
}

/** Generate a TOTP otpauth URI for QR code */
export async function getTotpUri(secret: string, email: string): Promise<string> {
  return `otpauth://totp/HopeClinic:${encodeURIComponent(email)}?secret=${secret}&issuer=HopeClinic`;
}

/** Generate a QR code data URL from a TOTP URI */
export async function generateQrCodeDataUrl(uri: string): Promise<string> {
  const QRCode = await import('qrcode');
  return QRCode.default.toDataURL(uri, { width: 256, margin: 2 });
}
