import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = blogPosts.findIndex((p) => p.slug === slug);
  const prev = blogPosts[idx - 1];
  const next = blogPosts[idx + 1];

  return (
    <div className="bg-[#F9F6F1]">
      {/* Cover */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#C8102E] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />{post.category}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min read</span>
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
            <Image src={post.authorImage} alt={post.author} fill className="object-cover" sizes="56px" />
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A]">{post.author}</p>
            <p className="text-[#9A9A9A] text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="ml-auto hidden sm:flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-[#F2F0ED] text-[#4A4A4A] rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-h1:text-3xl
          prose-p:text-[#5A5A5A] prose-p:leading-relaxed
          prose-a:text-[#C8102E] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#1A1A1A] prose-ul:text-[#5A5A5A] prose-ol:text-[#5A5A5A]
          prose-table:text-sm prose-th:bg-[#F9F6F1] prose-th:text-[#1A1A1A]"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-10">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <ArrowLeft className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[#9A9A9A] text-xs">Previous</p>
                <p className="font-semibold text-[#1A1A1A] text-sm truncate group-hover:text-[#C8102E] transition-colors">{prev.title}</p>
              </div>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="flex-1 flex items-center justify-end gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group text-right">
              <div className="min-w-0">
                <p className="text-[#9A9A9A] text-xs">Next</p>
                <p className="font-semibold text-[#1A1A1A] text-sm truncate group-hover:text-[#C8102E] transition-colors">{next.title}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
            </Link>
          )}
        </div>

        {/* Back to blog */}
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#C8102E] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
