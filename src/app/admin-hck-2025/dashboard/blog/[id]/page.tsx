'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, RefreshCw, ArrowLeft, Eye, EyeOff, Star, Upload, CheckCircle } from 'lucide-react';
import { blogPosts as SEED } from '@/data/blog-posts';

interface Post {
  id?: string; slug: string; title: string; excerpt: string; content: string;
  cover_image_url?: string; category: string; tags: string[];
  author_name?: string; author_image_url?: string;
  is_published: boolean; is_featured: boolean;
  reading_time_minutes: number;
}

const CATEGORIES = ['Events & Campaigns', 'Health Awareness', 'Clinic News', 'Medical Achievements', 'Partnerships'];
const inputCls   = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

const DEFAULT: Post = { slug: '', title: '', excerpt: '', content: '', category: CATEGORIES[0], tags: [], is_published: false, is_featured: false, reading_time_minutes: 5 };

export default function BlogEditor() {
  const router   = useRouter();
  const params   = useParams<{ id: string }>();
  const isNew    = params.id === 'new';
  const [form, setForm]         = useState<Post>(DEFAULT);
  const [loading, setLoading]   = useState(!isNew);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast]       = useState('');
  const [tagInput, setTagInput] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const set = (k: keyof Post, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const load = useCallback(async () => {
    if (isNew) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/blog/${params.id}`);
      if (r.ok) { const d = await r.json() as Post; setForm(d); }
      else {
        const seed = SEED.find(p => p.id === params.id);
        if (seed) setForm({ slug: seed.slug, title: seed.title, excerpt: seed.excerpt, content: seed.content, cover_image_url: seed.coverImage, category: seed.category, tags: seed.tags, author_name: seed.author, is_published: true, is_featured: false, reading_time_minutes: seed.readingTime });
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [isNew, params.id]);

  useEffect(() => { load(); }, [load]);

  const uploadCover = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'blog');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const { url } = await r.json() as { url: string }; if (url) set('cover_image_url', url); }
    } catch { /* ignore */ }
    setUploading(false);
  };

  const addTag   = () => { if (!tagInput.trim() || form.tags.includes(tagInput.trim())) return; set('tags', [...form.tags, tagInput.trim()]); setTagInput(''); };
  const removeTag = (t: string) => set('tags', form.tags.filter(x => x !== t));

  const handleSave = async () => {
    if (!form.title || !form.slug) { showToast('Title and slug are required'); return; }
    setSaving(true);
    try {
      const url    = isNew ? '/api/admin/blog' : `/api/admin/blog/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const payload = { ...form, ...(form.is_published && !isNew ? { published_at: new Date().toISOString() } : {}) };
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (r.ok) {
        showToast('Saved — blog page updated!');
        if (isNew) { const d = await r.json() as Post; setTimeout(() => router.push(`/admin-hck-2025/dashboard/blog/${d.id}`), 1000); }
      } else showToast('Save failed');
    } catch { showToast('Network error'); }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><RefreshCw className="w-8 h-8 text-[#0F2340] animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[#EBF0FB] text-[#4A5568]"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {isNew ? 'New Blog Post' : 'Edit Post'}
            </h1>
            <p className="text-[#8896B3] text-sm">Changes sync to the blog page instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => set('is_published', !form.is_published)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${form.is_published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-[#FEF3C7] text-[#D97706] hover:bg-[#FDE68A]'}`}>
            {form.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {form.is_published ? 'Published' : 'Draft'}
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-[#0F2340] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-[#D1DCF5] p-5">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">Title *</label>
                <input value={form.title} onChange={e => { set('title', e.target.value); if (!form.id) set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')); }}
                  className={inputCls} placeholder="Post title…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">Slug *</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} className={inputCls} placeholder="url-slug-here" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">Excerpt (150-200 chars)</label>
                <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} className={inputCls + ' resize-none'} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">Content (Markdown supported)</label>
                <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={16}
                  className={inputCls + ' resize-y font-mono text-xs leading-relaxed'} placeholder="Write your article here…" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Cover image */}
          <div className="bg-white rounded-xl border border-[#D1DCF5] p-4">
            <label className="block text-xs font-semibold text-[#0F2340] mb-2">Cover Image</label>
            {form.cover_image_url && <img src={form.cover_image_url} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />}
            <input value={form.cover_image_url ?? ''} onChange={e => set('cover_image_url', e.target.value)}
              className={inputCls + ' mb-2'} placeholder="Image URL" />
            <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-[#D1DCF5] rounded-lg p-3 hover:border-[#0F2340] hover:bg-[#F8FAFF] transition-all text-sm text-[#4A5568]">
              {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? 'Uploading…' : 'Upload cover image'}
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadCover(e.target.files[0])} />
            </label>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-xl border border-[#D1DCF5] p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls + ' bg-white'}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Author Name</label>
              <input value={form.author_name ?? ''} onChange={e => set('author_name', e.target.value)} className={inputCls} placeholder="Dr. …" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Reading Time (min)</label>
              <input type="number" value={form.reading_time_minutes} onChange={e => set('reading_time_minutes', +e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-2">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] text-xs px-2 py-0.5 rounded-full">
                    {t} <button type="button" onClick={() => removeTag(t)} className="text-[#8896B3] hover:text-[#C8102E]">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()}
                  placeholder="Add tag…" className={inputCls + ' flex-1 text-xs'} />
                <button type="button" onClick={addTag} className="px-2 py-1.5 bg-[#EBF0FB] text-[#0F2340] rounded-lg text-xs font-semibold hover:bg-[#D1DCF5]">+</button>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="w-4 h-4 accent-[#D4A017]" />
              <span className="text-sm text-[#2D2D2D] flex items-center gap-1"><Star className="w-3 h-3 text-[#D4A017]" /> Featured post</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
