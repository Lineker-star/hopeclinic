export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return NextResponse.json({
      name:        payload.name,
      email:       payload.email,
      role:        payload.role,
      permissions: payload.permissions,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }
}
