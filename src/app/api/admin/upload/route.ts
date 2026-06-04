export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin/crud';

const BUCKET = 'hope-clinic-media';
const MAX_MB = 10;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const form   = await req.formData();
  const file   = form.get('file') as File | null;
  const folder = (form.get('folder') as string) || 'general';

  if (!file)                        return NextResponse.json({ error: 'No file' }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  if (file.size > MAX_MB * 1024 * 1024) return NextResponse.json({ error: `Max ${MAX_MB}MB` }, { status: 400 });

  const ext      = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer   = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    // Bucket may not exist yet — return a placeholder URL so the app keeps working
    console.warn('[Upload] Supabase Storage error:', error.message);
    return NextResponse.json({ url: '', error: error.message }, { status: 200 });
  }

  const { data: { publicUrl } } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(data.path);
  return NextResponse.json({ url: publicUrl }, { status: 201 });
}
