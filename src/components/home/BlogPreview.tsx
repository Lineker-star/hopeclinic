'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { recentPosts } from '@/data/blog-posts';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface PostRow {
  id: string; slug: string; title: string; excerpt?: string;
  cover_image_url?: string; coverImage?: string;
  category: string;
  author_name?: string; author?: string;
  author_image_url?: string; authorImage?: string;
  published_at?: string; publishedAt?: string;
  reading_time_minutes?: number; readingTime?: number;
}

const seedFallback: PostRow[] = recentPosts.map(p => ({
  id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt,
  coverImage: p.coverImage, category: p.category,
  author: p.author, authorImage: p.authorImage,
  publishedAt: p.publishedAt, readingTime: p.readingTime,
}));

export default function BlogPreview() {
  const { data: allPosts } = useSupabaseData<PostRow>('blog_posts', {
    filter: { is_published: true },
    orderBy: 'published_at',
    orderAsc: false,
    fallback: seedFallback,
    realtimeTable: 'blog_posts',
  });

  const posts = allPosts.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} className="text-center mb-12">
          <span className="text-[#0F2340] font-semibold text-sm uppercase tracking-widest">Stay Informed</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Health News &amp; Updates
          </h2>
          <p className="text-[#4A5568] mt-5 max-w-xl mx-auto">
            Health tips, events, and the latest news from Hope Clinic Koumé
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="initial" whileInView="animate" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imgUrl    = post.cover_image_url ?? post.coverImage ?? '';
            const author    = post.author_name     ?? post.author     ?? '';
            const authorImg = post.author_image_url ?? post.authorImage ?? '';
            const pubDate   = post.published_at    ?? post.publishedAt ?? '';
            const readTime  = post.reading_time_minutes ?? post.readingTime ?? 5;
            return (
              <motion.article key={post.id} variants={fadeInUp}
                className="bg-[#F8FAFF] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  {imgUrl && (
                    <Image src={imgUrl} alt={post.title}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0F2340] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />{post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-[#8896B3] text-xs">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} min read</span>
                    <span>•</span>
                    <span>{pubDate ? new Date(pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2 group-hover:text-[#0F2340] transition-colors line-clamp-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {authorImg && (
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#EBF0FB]">
                          <Image src={authorImg} alt={author} fill className="object-cover" sizes="28px" />
                        </div>
                      )}
                      <span className="text-[#4A5568] text-xs font-medium truncate max-w-[100px]">{author}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[#0F2340] text-sm font-semibold hover:text-[#D4A017] transition-colors">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
          transition={{ delay: 0.3 }} className="text-center mt-10">
          <Link href="/blog"
            className="inline-flex items-center gap-2 border-2 border-[#0F2340] text-[#0F2340] px-8 py-3 rounded-xl font-semibold hover:bg-[#0F2340] hover:text-white transition-all">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
