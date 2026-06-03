export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const [appts, pending, msgs, doctors, staff, posts, gallery, locations] = await Promise.all([
      supabaseAdmin.from('appointments').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'PENDING'),
      supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
      supabaseAdmin.from('doctors').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('staff').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('blog_posts').select('id', { count: 'exact', head: true }).eq('is_published', true),
      supabaseAdmin.from('gallery_items').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('hope_clinic_locations').select('id', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      appointments: appts.count ?? 0,
      pending:      pending.count ?? 0,
      messages:     msgs.count ?? 0,
      doctors:      doctors.count ?? 0,
      staff:        staff.count ?? 0,
      posts:        posts.count ?? 0,
      gallery:      gallery.count ?? 0,
      locations:    locations.count ?? 0,
    });
  } catch {
    return NextResponse.json({ appointments:0,pending:0,messages:0,doctors:0,staff:0,posts:0,gallery:0,locations:0 });
  }
}
