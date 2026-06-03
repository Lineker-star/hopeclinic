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

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
