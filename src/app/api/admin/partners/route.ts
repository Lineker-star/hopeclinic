export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';

export const GET  = ()                   => listRows('partners', { order: 'order_index' });
export const POST = (req: NextRequest)   => req.json().then((b: Record<string, unknown>) => insertRow('partners', b));
