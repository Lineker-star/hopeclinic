export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section') ?? 'hero';
  const { data } = await supabaseAdmin.from('site_settings').select('*').eq('key', `home_${section}`).single();
  return NextResponse.json(data ?? null);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const { section, content } = await req.json();
  const { data, error } = await supabaseAdmin.from('site_settings')
    .upsert({ key: `home_${section}`, value: content, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
