export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const items = await req.json() as Array<{ id: string; order_index: number }>;
  const updates = items.map(({ id, order_index }) =>
    supabaseAdmin.from('news_bar').update({ order_index }).eq('id', id)
  );
  await Promise.all(updates);
  return NextResponse.json({ success: true });
}
