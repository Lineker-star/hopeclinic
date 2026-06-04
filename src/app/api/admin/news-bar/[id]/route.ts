export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { updateRow, deleteRow, parseId } from '@/lib/admin/crud';

type Params = Promise<{ id: string }>;
export const PUT    = async (req: NextRequest, { params }: { params: Params }) => updateRow('news_bar', await parseId(params), await req.json());
export const DELETE = async (_: NextRequest, { params }: { params: Params }) => deleteRow('news_bar', await parseId(params));
