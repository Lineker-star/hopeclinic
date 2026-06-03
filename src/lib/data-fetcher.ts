/**
 * Server-side data fetcher: tries Supabase first, falls back to static seed data.
 */
async function fromSupabase<T>(table: string, build: (q: import('@supabase/supabase-js').SupabaseClient) => unknown): Promise<T[] | null> {
  try {
    const { supabaseAdmin } = await import('./supabase');
    const { data, error } = await (build(supabaseAdmin) as Promise<{ data: T[] | null; error: unknown }>);
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getDoctors() {
  const live = await fromSupabase('doctors', q =>
    (q as import('@supabase/supabase-js').SupabaseClient).from('doctors').select('*').eq('is_active', true).order('order_index')
  );
  if (live) return live;
  const { doctors } = await import('@/data/doctors');
  return doctors;
}

export async function getStaff() {
  const live = await fromSupabase('staff', q =>
    (q as import('@supabase/supabase-js').SupabaseClient).from('staff').select('*').eq('is_active', true).order('order_index')
  );
  if (live) return live;
  const { staff } = await import('@/data/staff');
  return staff;
}

export async function getBlogPosts(publishedOnly = true) {
  const live = await fromSupabase('blog_posts', q => {
    const base = (q as import('@supabase/supabase-js').SupabaseClient).from('blog_posts').select('*');
    return publishedOnly
      ? base.eq('is_published', true).order('published_at', { ascending: false })
      : base.order('created_at', { ascending: false });
  });
  if (live) return live;
  const { blogPosts } = await import('@/data/blog-posts');
  return blogPosts;
}

export async function getHopeClinics() {
  const live = await fromSupabase('hope_clinic_locations', q =>
    (q as import('@supabase/supabase-js').SupabaseClient).from('hope_clinic_locations').select('*').order('order_index')
  );
  if (live) return live;
  const { hopeClinicLocations } = await import('@/data/hope-clinics');
  return hopeClinicLocations;
}

export async function getGalleryItems(category?: string) {
  const live = await fromSupabase('gallery_items', q => {
    const base = (q as import('@supabase/supabase-js').SupabaseClient).from('gallery_items').select('*').eq('is_active', true);
    return category && category !== 'all' ? base.eq('category', category).order('order_index') : base.order('order_index');
  });
  return live ?? [];
}

export async function getTestimonials() {
  const live = await fromSupabase('testimonials', q =>
    (q as import('@supabase/supabase-js').SupabaseClient).from('testimonials').select('*').eq('is_active', true).order('order_index')
  );
  if (live) return live;
  const { testimonials } = await import('@/data/testimonials');
  return testimonials;
}

export async function getPartners() {
  const live = await fromSupabase('partners', q =>
    (q as import('@supabase/supabase-js').SupabaseClient).from('partners').select('*').eq('is_active', true).order('order_index')
  );
  return live ?? [];
}
