export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get('filter');
  let q = supabaseAdmin.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (filter === 'UNREAD')   q = q.eq('is_read', false) as typeof q;
  if (filter === 'UNREPLIED') q = q.eq('is_replied', false) as typeof q;
  if (filter === 'REPLIED')  q = q.eq('is_replied', true) as typeof q;
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// Public: allow anyone to submit a contact message
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('contact_messages').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
