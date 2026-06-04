export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';

export const GET  = () => listRows('news_bar', { order: 'order_index' });
export const POST = (req: NextRequest) => req.json().then(b => insertRow('news_bar', b));
