'use client';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface Post {
  id: string; slug: string; title: string; excerpt?: string; content?: string;
  cover_image_url?: string; category: string; tags?: string[];
  author_name?: string; author_image_url?: string;
  is_published: boolean; published_at?: string; reading_time_minutes?: number;
}

function Skeleton() {
  return (
    <div className="animate-pulse bg-[#F9F6F1]">
      <div className="h-72 sm:h-96 bg-[#D1DCF5]" />
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="h-14 bg-[#D1DCF5] rounded-2xl" />
        <div className="h-64 bg-[#D1DCF5] rounded-2xl" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#F9F6F1]">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Post Not Found
      </h1>
      <p className="text-[#9A9A9A] mb-6">This article doesn&apos;t exist or has been removed.</p>
      <Link href="/blog"
        className="flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#A30D26] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [navPosts, setNavPosts] = useState<Pick<Post, 'id' | 'slug' | 'title'>[]>([]);

  const fetchPost = useCallback(async (): Promise<Post | null> => {
    try {
      const r = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`);
      if (r.ok) return r.json() as Promise<Post>;
    } catch { /* fallthrough */ }
    return null;
  }, [slug]);

  const { data: post, loading } = useSupabaseRealtime<Post | null>(
    'blog_posts', fetchPost, null, `slug=eq.${slug}`,
  );

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(r => r.ok ? r.json() : [])
      .then((posts: Post[]) => setNavPosts(posts.filter(p => p.is_published)))
      .catch(() => {});
  }, []);

  if (loading) return <Skeleton />;
  if (!post) return <NotFound />;

  const idx      = navPosts.findIndex(p => p.slug === slug);
  const prevPost = navPosts[idx + 1];
  const nextPost = navPosts[idx - 1];

  const coverImg  = post.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop';
  const authorImg = post.author_image_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop';

  return (
    <div className="bg-[#F9F6F1]">
      {/* Cover */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={coverImg} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#C8102E] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />{post.category}
            </span>
            {post.reading_time_minutes && (
              <span className="text-white/60 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />{post.reading_time_minutes} min read
              </span>
            )}
          </div>
          <h1 className="text-white text-2xl sm:text-4xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#9A9A9A] mb-8">
          <Link href="/" className="hover:text-[#C8102E]">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C8102E]">Blog</Link>
          <span>/</span>
          <span className="text-[#C8102E] truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Author */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={authorImg} alt={post.author_name || 'Author'} fill className="object-cover" sizes="56px" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A]">{post.author_name || 'Hope Clinic'}</p>
            {post.published_at && (
              <p className="text-[#9A9A9A] text-sm">
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="ml-auto hidden sm:flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-[#F2F0ED] text-[#4A4A4A] rounded-full">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-h1:text-3xl
          prose-p:text-[#5A5A5A] prose-p:leading-relaxed
          prose-a:text-[#C8102E] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#1A1A1A] prose-ul:text-[#5A5A5A] prose-ol:text-[#5A5A5A]
          prose-table:text-sm prose-th:bg-[#F9F6F1] prose-th:text-[#1A1A1A]"
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          <div dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/\n/g, '<br/>') }} />
        </div>

        {/* Navigation */}
        {(prevPost || nextPost) && (
          <div className="flex gap-4 mt-10">
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`}
                className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
                <ArrowLeft className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[#9A9A9A] text-xs">Previous</p>
                  <p className="font-semibold text-[#1A1A1A] text-sm truncate group-hover:text-[#C8102E] transition-colors">{nextPost.title}</p>
                </div>
              </Link>
            )}
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`}
                className="flex-1 flex items-center justify-end gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group text-right">
                <div className="min-w-0">
                  <p className="text-[#9A9A9A] text-xs">Next</p>
                  <p className="font-semibold text-[#1A1A1A] text-sm truncate group-hover:text-[#C8102E] transition-colors">{prevPost.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
              </Link>
            )}
          </div>
        )}

        {/* Back to blog */}
        <div className="text-center mt-8">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-[#C8102E] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
