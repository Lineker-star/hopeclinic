export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminSession } from '@/lib/admin/auth';

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section');
  if (!section) return NextResponse.json({ error: 'Missing section' }, { status: 400 });
  const { data } = await supabaseAdmin.from('home_content').select('*').eq('section', section).single();
  return NextResponse.json(data ?? null);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { section, content } = await req.json();
  const { data, error } = await supabaseAdmin
    .from('home_content')
    .upsert({ section, content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
