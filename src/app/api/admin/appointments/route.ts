export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status');
  let q = supabaseAdmin.from('appointments')
    .select('*, doctor:doctors(name,title_prefix), department:departments(name)')
    .order('created_at', { ascending: false });
  if (status) q = q.eq('status', status) as typeof q;
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const body = await req.json();
  const ref  = `HC-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
  const { data, error } = await supabaseAdmin.from('appointments')
    .insert({ ...body, reference_number: body.reference_number || ref })
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
