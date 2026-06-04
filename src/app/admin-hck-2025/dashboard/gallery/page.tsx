'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Eye, EyeOff, Upload, X, RefreshCw, CheckCircle, ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string; type: string; url: string; thumbnail_url?: string;
  caption?: string; category: string; is_active: boolean; order_index: number;
}

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🖼️' },
  { id: 'facility',     label: 'Facilities',  emoji: '🏥' },
  { id: 'medical-team', label: 'Team',         emoji: '👨‍⚕️' },
  { id: 'campaigns',    label: 'Campaigns',    emoji: '🚐' },
  { id: 'equipment',    label: 'Equipment',    emoji: '🔬' },
  { id: 'construction', label: 'Construction', emoji: '🏗️' },
  { id: 'community',    label: 'Community',    emoji: '🌍' },
];

const SEED_ITEMS: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', category: 'facility',     caption: 'Hope Clinic Koumé — Main Campus', is_active: true, order_index: 0 },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80', category: 'medical-team', caption: 'Medical Team at Work', is_active: true, order_index: 1 },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', category: 'campaigns',    caption: 'Community Health Campaign', is_active: true, order_index: 2 },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', category: 'equipment',    caption: 'Advanced Laboratory', is_active: true, order_index: 3 },
];

export default function GalleryManager() {
  const [items, setItems]         = useState<GalleryItem[]>(SEED_ITEMS);
  const [loading, setLoading]     = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast]         = useState('');
  const [urlInput, setUrlInput]   = useState('');
  const [catForUrl, setCatForUrl] = useState('facility');
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/gallery');
      if (r.ok) { const d = await r.json() as GalleryItem[]; if (d.length) setItems(d); }
    } catch { /* keep seed */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append('file', file); fd.append('folder', 'gallery');
      try {
        const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        if (r.ok) {
          const { url } = await r.json() as { url: string };
          if (url) {
            const body: Partial<GalleryItem> = { type: 'image', url, category: activeCategory === 'all' ? 'facility' : activeCategory, is_active: true, order_index: items.length };
            const r2 = await fetch('/api/admin/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (r2.ok) { const d = await r2.json() as GalleryItem; setItems(p => [...p, d]); }
          }
        }
      } catch { /* ignore individual failures */ }
    }
    showToast('Images uploaded!');
    setUploading(false);
  };

  const addByUrl = async () => {
    if (!urlInput.trim()) return;
    const body: Partial<GalleryItem> = { type: 'image', url: urlInput.trim(), category: catForUrl, is_active: true, order_index: items.length };
    try {
      const r = await fetch('/api/admin/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (r.ok) { const d = await r.json() as GalleryItem; setItems(p => [...p, d]); setUrlInput(''); showToast('Added!'); }
    } catch {
      setItems(p => [...p, { ...body, id: Date.now().toString() } as GalleryItem]);
      setUrlInput('');
    }
  };

  const toggle = async (id: string) => {
    setItems(p => p.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i));
    const item = items.find(i => i.id === id)!;
    await fetch(`/api/admin/gallery/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !item.is_active }) }).catch(() => {});
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    setItems(p => p.filter(i => i.id !== id));
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Deleted');
  };

  const visible = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gallery Manager</h1>
          <p className="text-[#8896B3] text-sm">{items.filter(i => i.is_active).length} visible · {items.length} total</p>
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
          {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading…' : 'Upload Images'}
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)} />
      </div>

      {/* Add by URL */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-4 mb-5 flex gap-2 flex-wrap">
        <input value={urlInput} onChange={e => setUrlInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addByUrl()}
          placeholder="Or paste image URL…" className="flex-1 min-w-[200px] border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340]" />
        <select value={catForUrl} onChange={e => setCatForUrl(e.target.value)} className="border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0F2340]">
          {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <button onClick={addByUrl} disabled={!urlInput.trim()}
          className="flex items-center gap-1 bg-[#D4A017] text-[#0F2340] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F5C842] disabled:opacity-50">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Category tabs */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] mb-5 overflow-x-auto">
        <div className="flex min-w-max">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? items.length : items.filter(i => i.category === cat.id).length;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-all flex-shrink-0 ${activeCategory === cat.id ? 'border-[#0F2340] text-[#0F2340]' : 'border-transparent text-[#4A5568] hover:text-[#0F2340]'}`}>
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="ml-1 text-xs bg-[#EBF0FB] text-[#0F2340] px-1.5 py-0.5 rounded-full font-bold">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-12 text-center text-[#8896B3]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" />
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[#D1DCF5] p-12 text-center">
          <ImageIcon className="w-12 h-12 text-[#D1DCF5] mx-auto mb-3" />
          <p className="text-[#8896B3] text-sm">No images. Upload or add by URL above.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {visible.map(item => (
            <div key={item.id} className={`break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm ${!item.is_active ? 'opacity-50' : ''}`}>
              <div className="relative bg-[#EBF0FB] w-full" style={{ aspectRatio: '4/3' }}>
                <Image src={item.url} alt={item.caption ?? ''} fill className="object-cover" sizes="20vw" />
                <div className="absolute inset-0 bg-[#0F2340]/0 group-hover:bg-[#0F2340]/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => toggle(item.id)} className="p-2 bg-white rounded-full shadow-lg text-[#0F2340] hover:text-green-600" title={item.is_active ? 'Hide' : 'Show'}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(item.id)} className="p-2 bg-white rounded-full shadow-lg text-[#C8102E] hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              {item.caption && <div className="px-2 py-1.5 bg-white border-t border-[#F0F4FF]"><p className="text-[10px] text-[#8896B3] truncate">{item.caption}</p></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
