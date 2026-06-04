export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { updateRow, deleteRow, parseId } from '@/lib/admin/crud';
import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

type Params = Promise<{ id: string }>;

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const id = await parseId(params);
  const { data, error } = await supabaseAdmin.from('blog_posts').select('*').eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}
export const PUT    = async (req: NextRequest, { params }: { params: Params }) => updateRow('blog_posts', await parseId(params), await req.json());
export const DELETE = async (_: NextRequest, { params }: { params: Params }) => deleteRow('blog_posts', await parseId(params));
