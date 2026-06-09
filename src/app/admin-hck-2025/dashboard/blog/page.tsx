'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Eye, EyeOff, Star, Search, Tag, RefreshCw } from 'lucide-react';
interface Post { id: string; slug: string; title: string; excerpt?: string; cover_image_url?: string; category: string; tags?: string[]; author_name?: string; author_image_url?: string; is_published: boolean; is_featured: boolean; published_at?: string; reading_time_minutes?: number; created_at?: string }

const CATEGORIES = ['All', 'Events & Campaigns', 'Health Awareness', 'Clinic News', 'Medical Achievements', 'Partnerships'];
const STATUS_OPTS = ['ALL', 'PUBLISHED', 'DRAFT'];

export default function BlogManager() {
  const [posts,    setPosts]    = useState<Post[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [catFilter,setCatFilter] = useState('All');
  const [statFilter,setStatFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/admin/blog').then(r => r.ok ? r.json() : []).then(d => setPosts(Array.isArray(d) ? d : [])).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const togglePublished = async (id: string) => {
    const post = posts.find(p => p.id === id)!;
    const nowPublished = !post.is_published;
    setPosts(prev => prev.map(p => p.id === id
      ? { ...p, is_published: nowPublished, published_at: nowPublished ? new Date().toISOString() : p.published_at }
      : p
    ));
    await fetch(`/api/admin/blog/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_published: nowPublished, published_at: nowPublished ? new Date().toISOString() : null }) }).catch(() => {});
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    setPosts(p => p.filter(x => x.id !== id));
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const filtered = posts.filter(p => {
    const matchSrch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat  = catFilter === 'All' || p.category === catFilter;
    const matchStat = statFilter === 'ALL' || (statFilter === 'PUBLISHED' ? p.is_published : !p.is_published);
    return matchSrch && matchCat && matchStat;
  });

  const published = posts.filter(p => p.is_published).length;
  const drafts    = posts.filter(p => !p.is_published).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Blog & News Manager</h1>
          <p className="text-[#8896B3] text-sm">{published} published · {drafts} draft{drafts !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin-hck-2025/dashboard/blog/new"
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {/* Status */}
        {STATUS_OPTS.map(s => (
          <button key={s} onClick={() => setStatFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statFilter === s ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#0F2340]'}`}>
            {s === 'ALL' ? `All (${posts.length})` : s === 'PUBLISHED' ? `Published (${published})` : `Drafts (${drafts})`}
          </button>
        ))}
        <div className="h-7 w-px bg-[#D1DCF5] self-center mx-1" />
        {/* Categories */}
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${catFilter === c ? 'bg-[#D4A017] text-[#0F2340]' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#D4A017]'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
          className="w-full pl-9 pr-4 py-2.5 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-12 text-center text-[#8896B3]"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[#D1DCF5] p-12 text-center text-[#8896B3] text-sm">{posts.length === 0 ? 'No posts yet. Click "New Post" to create one.' : 'No posts match your filters.'}</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
                <tr>{['Cover', 'Title & Category', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#4A5568] uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4FF]">
                {filtered.map(post => (
                  <tr key={post.id} className="hover:bg-[#FAFBFF] transition-colors">
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-[#EBF0FB] flex-shrink-0">
                        {post.cover_image_url && <Image src={post.cover_image_url} alt="" fill className="object-cover" sizes="64px" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="font-semibold text-[#0F2340] text-xs leading-snug line-clamp-2">{post.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="bg-[#EBF0FB] text-[#0F2340] text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />{post.category}
                        </span>
                        {post.is_featured && <span className="bg-[#FFF8E1] text-[#D4A017] text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Star className="w-2.5 h-2.5" />Featured</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {post.author_image_url && (
                          <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={post.author_image_url} alt="" fill className="object-cover" sizes="24px" />
                          </div>
                        )}
                        <span className="text-xs text-[#4A5568] truncate max-w-[80px]">{post.author_name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8896B3] text-xs whitespace-nowrap">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/admin-hck-2025/dashboard/blog/${post.id}`}
                          className="p-1.5 rounded-lg text-[#0F2340] hover:bg-[#EBF0FB] transition-colors"><Edit3 className="w-3.5 h-3.5" /></Link>
                        <button onClick={() => togglePublished(post.id)}
                          className={`p-1.5 rounded-lg transition-colors ${post.is_published ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}
                          title={post.is_published ? 'Unpublish' : 'Publish'}>
                          {post.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => deletePost(post.id)}
                          className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
