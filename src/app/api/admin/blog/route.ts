export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { listRows, insertRow } from '@/lib/admin/crud';
import { supabaseAdmin } from '@/lib/supabase';

export const GET = async (req: NextRequest) => {
  const slug = new URL(req.url).searchParams.get('slug');
  if (slug) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error || !data) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(data);
  }
  return listRows('blog_posts', { order: 'published_at', ascending: false });
};

export const POST = (req: NextRequest) => req.json().then((b: Record<string, unknown>) => insertRow('blog_posts', b));
