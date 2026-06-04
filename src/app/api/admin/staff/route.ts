export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';

export const GET  = () => listRows('staff', { order: 'order_index' });
export const POST = (req: NextRequest) => req.json().then(b => insertRow('staff', b));
