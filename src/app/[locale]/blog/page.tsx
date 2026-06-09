'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts as SEED } from '@/data/blog-posts';
import { Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const categories = ['All', 'Events & Campaigns', 'Health Awareness', 'Clinic News', 'Medical Achievements', 'Partnerships'];

interface Post { id: string; slug: string; title: string; excerpt: string; cover_image_url?: string; coverImage?: string; category: string; author_name?: string; author?: string; author_image_url?: string; authorImage?: string; published_at?: string; publishedAt?: string; reading_time_minutes?: number; readingTime?: number }

const seedPosts: Post[] = SEED.map(p => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, cover_image_url: p.coverImage, category: p.category, author_name: p.author, author_image_url: p.authorImage, published_at: p.publishedAt, reading_time_minutes: p.readingTime }));

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const { data: posts } = useSupabaseData<Post>('blog_posts', {
    filter: { is_published: true },
    orderBy: 'published_at',
    orderAsc: false,
    fallback: seedPosts,
    realtimeTable: 'blog_posts',
  });

  const filtered = posts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesQ   = !query || p.title.toLowerCase().includes(query.toLowerCase()) || (p.excerpt ?? '').toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Stay Informed</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            News &amp; Articles
          </h1>
          <p className="text-white/80">Health tips, clinic news and community stories from Hope Clinic Koumé</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Blog</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        <Link href={`/blog/${posts[0]?.slug ?? ""}`} className="group block mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-72 sm:h-96">
            <Image src={(posts[0]?.cover_image_url ?? posts[0]?.coverImage ?? "")} alt={(posts[0]?.title ?? "")}
              fill className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw" priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A6B]/85 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end max-w-2xl">
              <span className="inline-flex items-center gap-1 bg-[#D4A017] text-[#1B3A6B] text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit">
                ⭐ Featured
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 group-hover:text-[#D4A017] transition-colors"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {(posts[0]?.title ?? "")}
              </h2>
              <p className="text-white/70 text-sm line-clamp-2">{(posts[0]?.excerpt ?? "")}</p>
              <div className="flex items-center gap-3 mt-3 text-white/50 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{(posts[0]?.reading_time_minutes ?? posts[0]?.readingTime ?? 5)} min read</span>
                <span>•</span>
                <span>{new Date((posts[0]?.published_at ?? posts[0]?.publishedAt ?? "")).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2.5 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#1B3A6B] hover:text-[#1B3A6B]'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#8896B3]">
            <p className="text-lg">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <article key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-[#D1DCF5] hover:border-[#1B3A6B]">
                <div className="relative h-48 overflow-hidden">
                  <Image src={(post.cover_image_url ?? post.coverImage ?? "")} alt={post.title}
                    fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#1B3A6B] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />{post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#8896B3] text-xs mb-2">
                    <Clock className="w-3 h-3" />{(post.reading_time_minutes ?? post.readingTime ?? 5)} min read
                    <span>•</span>
                    {new Date((post.published_at ?? post.publishedAt ?? "")).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2 line-clamp-2 group-hover:text-[#1B3A6B] transition-colors"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#EBF0FB]">
                        <Image src={(post.author_image_url ?? post.authorImage ?? "")} alt={(post.author_name ?? post.author ?? "")} fill className="object-cover" sizes="28px" />
                      </div>
                      <span className="text-[#4A5568] text-xs font-medium truncate max-w-[100px]">{(post.author_name ?? post.author ?? "")}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[#1B3A6B] text-sm font-semibold hover:text-[#D4A017] transition-colors">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="py-14 bg-[#1B3A6B] text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Stay Updated
          </h2>
          <p className="text-white/65 text-sm mb-6">Subscribe to receive health tips and news from Hope Clinic Koumé</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A017]"
            />
            <button type="submit"
              className="bg-[#D4A017] text-[#1B3A6B] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#F5C842] transition-colors flex-shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
