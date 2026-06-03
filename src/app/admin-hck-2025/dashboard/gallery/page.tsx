'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Eye, EyeOff, Upload, X, RefreshCw, ImageIcon } from 'lucide-react';

interface GalleryItem { id: string; type: 'image' | 'video'; url: string; thumbnail_url?: string; caption?: string; category: string; is_active: boolean; order_index: number }

const CATEGORIES = [
  { id: 'all',          label: 'All',             emoji: '🖼️' },
  { id: 'facility',     label: 'Our Facilities',  emoji: '🏥' },
  { id: 'medical-team', label: 'Medical Team',    emoji: '👨‍⚕️' },
  { id: 'campaigns',    label: 'Campaigns',       emoji: '🚐' },
  { id: 'equipment',    label: 'Equipment',       emoji: '🔬' },
  { id: 'construction', label: 'Construction',    emoji: '🏗️' },
  { id: 'community',    label: 'Community',       emoji: '🌍' },
];

const SEED_ITEMS: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', category: 'facility',     caption: 'Hope Clinic Koumé — Main Campus',           is_active: true, order_index: 0 },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80', category: 'medical-team', caption: 'Our Medical Team at Work',                   is_active: true, order_index: 1 },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', category: 'campaigns',    caption: 'Community Health Campaign — East Region',    is_active: true, order_index: 2 },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', category: 'equipment',    caption: 'Advanced Laboratory',                        is_active: true, order_index: 3 },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',   category: 'facility',     caption: 'Surgical Block',                             is_active: true, order_index: 4 },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', category: 'construction', caption: 'Building Progress — Hope Clinic Campus',     is_active: true, order_index: 5 },
];

function AddModal({ activeCategory, onClose, onAdd }: { activeCategory: string; onClose: () => void; onAdd: (items: Partial<GalleryItem>[]) => Promise<void> }) {
  const [urls,    setUrls]    = useState('');
  const [caption, setCaption] = useState('');
  const [cat,     setCat]     = useState(activeCategory === 'all' ? 'facility' : activeCategory);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append('file', file); fd.append('folder', 'gallery');
      try {
        const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        if (r.ok) { const d = await r.json(); uploaded.push(d.url); }
      } catch { /* ignore */ }
    }
    setUploading(false);
    if (uploaded.length) {
      const items = uploaded.map((url, i) => ({ type: 'image' as const, url, caption: caption || undefined, category: cat, is_active: true, order_index: i }));
      await onAdd(items);
    }
  };

  const addByUrl = async () => {
    const lines = urls.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const items = lines.map((url, i) => ({ type: 'image' as const, url, caption: caption || undefined, category: cat, is_active: true, order_index: i }));
    await onAdd(items);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5]">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Add Images</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          {/* File drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#D1DCF5] rounded-xl p-8 text-center cursor-pointer hover:border-[#0F2340] hover:bg-[#F8FAFF] transition-all"
          >
            {uploading ? <RefreshCw className="w-8 h-8 text-[#0F2340] animate-spin mx-auto mb-2" /> : <Upload className="w-8 h-8 text-[#8896B3] mx-auto mb-2" />}
            <p className="text-sm font-semibold text-[#0F2340]">{uploading ? 'Uploading…' : 'Click to upload images'}</p>
            <p className="text-xs text-[#8896B3] mt-1">JPG, PNG, WebP — max 10MB each</p>
            <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
              onChange={e => e.target.files && uploadFiles(e.target.files)} />
          </div>

          <div className="text-center text-[#8896B3] text-xs">— or paste image URLs —</div>

          {/* URL input */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Image URLs (one per line)</label>
            <textarea value={urls} onChange={e => setUrls(e.target.value)} rows={3}
              className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340] resize-none"
              placeholder="https://images.unsplash.com/…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Category</label>
              <select value={cat} onChange={e => setCat(e.target.value)}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340] bg-white">
                {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Caption (optional)</label>
              <input value={caption} onChange={e => setCaption(e.target.value)}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340]"
                placeholder="Photo description…" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#D1DCF5]">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={addByUrl} disabled={!urls.trim()}
            className="flex-1 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            Add by URL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryManager() {
  const [items,   setItems]   = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.ok ? r.json() : null).then(d => setItems(d?.length ? d : SEED_ITEMS)).catch(() => setItems(SEED_ITEMS)).finally(() => setLoading(false));
  }, []);

  const visible = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory);

  const toggle = async (id: string) => {
    setItems(p => p.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i));
    const item = items.find(i => i.id === id)!;
    await fetch(`/api/admin/gallery/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !item.is_active }) }).catch(() => {});
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    setItems(p => p.filter(i => i.id !== id));
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const addItems = async (newItems: Partial<GalleryItem>[]) => {
    const added: GalleryItem[] = [];
    for (const item of newItems) {
      try {
        const r = await fetch('/api/admin/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
        if (r.ok) added.push(await r.json());
        else added.push({ ...item, id: Date.now().toString() + Math.random() } as GalleryItem);
      } catch { added.push({ ...item, id: Date.now().toString() + Math.random() } as GalleryItem); }
    }
    setItems(p => [...p, ...added]);
    setShowAdd(false);
  };

  const activeCount = items.filter(i => i.is_active).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gallery Manager</h1>
          <p className="text-[#8896B3] text-sm">{activeCount} visible · {items.length} total images</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Images
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
          <p className="text-[#8896B3] text-sm mb-3">No images in this category.</p>
          <button onClick={() => setShowAdd(true)} className="text-[#0F2340] text-sm font-semibold hover:underline">+ Add images</button>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {visible.map(item => (
            <div key={item.id} className={`break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm ${!item.is_active ? 'opacity-50' : ''}`}>
              <div className="relative bg-[#EBF0FB] w-full" style={{ aspectRatio: '4/3' }}>
                <Image src={item.url} alt={item.caption || ''} fill className="object-cover" sizes="20vw" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0F2340]/0 group-hover:bg-[#0F2340]/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => toggle(item.id)}
                    className="p-2 bg-white rounded-full shadow-lg text-[#0F2340] hover:text-green-600 transition-colors"
                    title={item.is_active ? 'Hide' : 'Show'}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(item.id)}
                    className="p-2 bg-white rounded-full shadow-lg text-[#C8102E] hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {item.caption && (
                <div className="px-2 py-1.5 bg-white border-t border-[#F0F4FF]">
                  <p className="text-[10px] text-[#8896B3] truncate">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showAdd && <AddModal activeCategory={activeCategory} onClose={() => setShowAdd(false)} onAdd={addItems} />}
    </div>
  );
}
