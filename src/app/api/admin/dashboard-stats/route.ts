export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const counts = await Promise.all([
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
      appointments: counts[0].count ?? 0,
      pendingAppointments: counts[1].count ?? 0,
      unreadMessages: counts[2].count ?? 0,
      doctors: counts[3].count ?? 0,
      staff: counts[4].count ?? 0,
      publishedPosts: counts[5].count ?? 0,
      galleryItems: counts[6].count ?? 0,
      locations: counts[7].count ?? 0,
    });
  } catch {
    return NextResponse.json({ appointments:0,pendingAppointments:0,unreadMessages:0,doctors:0,staff:0,publishedPosts:0,galleryItems:0,locations:0 });
  }
}
