export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({
    name:        session.name,
    email:       session.email,
    role:        session.role,
    permissions: session.permissions,
  });
}
