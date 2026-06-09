export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

const BUCKET  = 'hope-clinic-media';
const MAX_MB  = 10;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const form   = await req.formData();
  const file   = form.get('file') as File | null;
  const folder = (form.get('folder') as string) || 'general';

  if (!file)
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ error: `Invalid type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, SVG` }, { status: 400 });
  if (file.size > MAX_MB * 1024 * 1024)
    return NextResponse.json({ error: `File too large. Max ${MAX_MB} MB` }, { status: 400 });

  const ext      = file.name.split('.').pop() ?? 'jpg';
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer   = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error('[Upload] Supabase Storage error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl }, { status: 201 });
}
