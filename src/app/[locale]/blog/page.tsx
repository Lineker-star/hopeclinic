import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health News & Blog',
  description: 'Health tips, news, events and updates from Hope Clinic Koumé — stay informed about health in Bertoua and Cameroon.',
};

const categories = ['All', 'Health Tips', 'Events & Campaigns', 'Health Awareness', 'Hope Clinic Updates', 'Community Outreach'];

export default function BlogPage() {
  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Stay Informed</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Health News & Blog
          </h1>
          <p className="text-white/80">Health tips, news, and updates from Hope Clinic Koumé</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Blog</span>
          </nav>
        </div>
      </div>

      {/* Featured post */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-72 sm:h-96">
            <Image
              src={blogPosts[0].coverImage}
              alt={blogPosts[0].title}
              fill className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw" priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end max-w-2xl">
              <span className="inline-flex items-center gap-1 bg-[#C8102E] text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit">
                <Tag className="w-3 h-3" /> {blogPosts[0].category}
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 group-hover:text-[#D4A017] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {blogPosts[0].title}
              </h2>
              <p className="text-white/70 text-sm line-clamp-2">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-3 mt-3 text-white/50 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blogPosts[0].readingTime} min read</span>
                <span>•</span>
                <span>{new Date(blogPosts[0].publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mt-8 mb-6">
          {categories.map((cat) => (
            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat === 'All' ? 'bg-[#C8102E] text-white' : 'bg-white text-[#5A5A5A] hover:bg-[#C8102E] hover:text-white border border-[#E5E1DC]'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage} alt={post.title}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#C8102E] text-white text-xs font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[#9A9A9A] text-xs mb-2">
                  <Clock className="w-3 h-3" />{post.readingTime} min read
                  <span>•</span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-2 line-clamp-2 group-hover:text-[#C8102E] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {post.title}
                </h3>
                <p className="text-[#5A5A5A] text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden">
                      <Image src={post.authorImage} alt={post.author} fill className="object-cover" sizes="28px" />
                    </div>
                    <span className="text-[#4A4A4A] text-xs font-medium">{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-[#C8102E] text-sm font-semibold">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 bg-[#1A1A1A] text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Stay Updated</h2>
          <p className="text-white/70 text-sm mb-6">Subscribe to receive health tips and news from Hope Clinic Koumé</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email address" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50" />
            <button type="submit" className="bg-[#C8102E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#8B0000] transition-colors flex-shrink-0">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
