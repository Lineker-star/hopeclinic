export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateRow, deleteRow, parseId } from '@/lib/admin/crud';

type Params = Promise<{ id: string }>;

export const GET = async (_req: NextRequest, { params }: { params: Params }) => {
  const id = await parseId(params);
  const { data, error } = await supabaseAdmin.from('doctors').select('*').eq('id', id).single();
  if (error || !data) return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  return NextResponse.json(data);
};

export const PUT    = async (req: NextRequest, { params }: { params: Params }) => updateRow('doctors', await parseId(params), await req.json());
export const DELETE = async (_: NextRequest, { params }: { params: Params }) => deleteRow('doctors', await parseId(params));
