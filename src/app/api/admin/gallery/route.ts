export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';

export const GET  = () => listRows('gallery_items', { order: 'order_index' });
export const POST = (req: NextRequest) => req.json().then(b => insertRow('gallery_items', b));
