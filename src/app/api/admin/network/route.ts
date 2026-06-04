export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';

export const GET  = () => listRows('hope_clinic_locations', { order: 'order_index' });
export const POST = (req: NextRequest) => req.json().then(b => insertRow('hope_clinic_locations', b));
