import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { recentPosts } from '@/data/blog-posts';

export default function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Stay Informed</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Health News & Updates
          </h2>
          <p className="text-[#5A5A5A] mt-3 max-w-xl mx-auto">
            Stay informed with the latest health tips, events, and news from Hope Clinic Koumé
          </p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#F9F6F1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#C8102E] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-[#9A9A9A] text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readingTime} min read
                  </div>
                  <span className="text-[#E5E1DC]">•</span>
                  <span className="text-[#9A9A9A] text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3
                  className="font-bold text-[#1A1A1A] text-base mb-2 leading-tight group-hover:text-[#C8102E] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {post.title}
                </h3>

                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden">
                      <Image src={post.authorImage} alt={post.author} fill className="object-cover" sizes="28px" />
                    </div>
                    <span className="text-[#4A4A4A] text-xs font-medium">{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[#C8102E] text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-[#C8102E] text-[#C8102E] px-8 py-3 rounded-xl font-semibold hover:bg-[#C8102E] hover:text-white transition-all"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
