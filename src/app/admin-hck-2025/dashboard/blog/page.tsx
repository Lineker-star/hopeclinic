'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit3, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { blogPosts as seedPosts } from '@/data/blog-posts';

interface BlogPost { id: string; title: string; category: string; cover_image_url: string; is_published: boolean; is_featured: boolean; published_at: string; author_name: string; reading_time_minutes: number; }

const CATEGORIES = ['All', 'Events & Campaigns', 'Health Awareness', 'Clinic News', 'Medical Achievements', 'Partnerships'];

export default function BlogAdmin() {
  const [posts, setPosts]       = useState<BlogPost[]>([]);
  const [loading, setLoading]   = useState(true);
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/blog');
    if (r.ok) setPosts(await r.json());
    else setPosts(seedPosts.map(p => ({
      id: p.id, title: p.title, category: p.category, cover_image_url: p.coverImage,
      is_published: true, is_featured: false, published_at: p.publishedAt,
      author_name: p.author, reading_time_minutes: p.readingTime,
    })));
    setLoading(false);
  };

  const togglePublished = async (id: string, current: boolean) => {
    await fetch(`/api/admin/blog/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_published: !current, published_at: !current ? new Date().toISOString() : null }) });
    setPosts(ps => ps.map(p => p.id === id ? { ...p, is_published: !current } : p));
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    setPosts(ps => ps.filter(p => p.id !== id));
  };

  const filtered = posts.filter(p => {
    const matchCat    = catFilter === 'All' || p.category === catFilter;
    const matchStatus = statusFilter === 'ALL' || (statusFilter === 'PUBLISHED' ? p.is_published : !p.is_published);
    return matchCat && matchStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Blog & News</h1>
          <p className="text-[#8896B3] text-sm">{posts.filter(p => p.is_published).length} published · {posts.filter(p => !p.is_published).length} drafts</p>
        </div>
        <Link href="/admin-hck-2025/dashboard/blog/new"
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['ALL', 'PUBLISHED', 'DRAFT'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statusFilter === s ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5]'}`}>
            {s === 'ALL' ? 'All' : s === 'PUBLISHED' ? 'Published' : 'Drafts'}
          </button>
        ))}
        <div className="w-px h-7 bg-[#D1DCF5] self-center mx-1" />
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${catFilter === cat ? 'bg-[#D4A017] text-[#0F2340]' : 'bg-white text-[#4A5568] border border-[#D1DCF5]'}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? <div className="text-center py-12 text-[#8896B3]">Loading posts...</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
              <tr>
                {['Cover', 'Title', 'Category', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[#4A5568] font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4FF]">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-[#F8FAFF] transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-[#EBF0FB]">
                      {post.cover_image_url && <Image src={post.cover_image_url} alt="" fill className="object-cover" sizes="56px" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-semibold text-[#0F2340] line-clamp-2 text-xs leading-snug">{post.title}</p>
                    {post.is_featured && <span className="text-[#D4A017] text-xs flex items-center gap-1 mt-0.5"><Star className="w-3 h-3" />Featured</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#EBF0FB] text-[#0F2340] text-xs px-2 py-0.5 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4A5568] text-xs">{post.author_name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8896B3] text-xs">{post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link href={`/admin-hck-2025/dashboard/blog/${post.id}`}
                        className="p-1.5 rounded-lg text-[#0F2340] hover:bg-[#EBF0FB] transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button onClick={() => togglePublished(post.id, post.is_published)}
                        className={`p-1.5 rounded-lg transition-colors ${post.is_published ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                        {post.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => deletePost(post.id)}
                        className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
