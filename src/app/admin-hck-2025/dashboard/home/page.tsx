'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Eye, EyeOff, RefreshCw, CheckCircle, Upload } from 'lucide-react';

interface HeroText  { title: string; subtitle: string; badge: string; cta1: string; cta2: string }
interface HeroImage { id: string; url: string; alt_text?: string; is_active: boolean; order_index: number }
interface StatItem  { key: string; value: string; label: string }

const DEFAULT_HERO: HeroText = {
  badge:    'CMFI Mercy Works — Hope Clinic Koumé',
  title:    'Quality Medical Care at Our Modern Clinic',
  subtitle: 'With our modern facilities and skilled medical staff, we provide quality care in a comfortable and healing environment.',
  cta1: 'Book Appointment', cta2: 'View Our Services',
};
const DEFAULT_IMAGES: HeroImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80', alt_text: 'African doctor', is_active: true, order_index: 0 },
  { id: '2', url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80',    alt_text: 'Maternity care',   is_active: true, order_index: 1 },
  { id: '3', url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&q=80', alt_text: 'African nurse',    is_active: true, order_index: 2 },
  { id: '4', url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1920&q=80', alt_text: 'Pediatric care',   is_active: true, order_index: 3 },
];
const DEFAULT_STATS: StatItem[] = [
  { key: 'patients',   value: '68,791+', label: 'Patients Treated (10 yrs)' },
  { key: 'surgeries',  value: '1,135+',  label: 'Surgeries Performed' },
  { key: 'deliveries', value: '1,576+',  label: 'Births / Deliveries' },
  { key: 'staff',      value: '87',      label: 'Dedicated Staff' },
  { key: 'clinics',    value: '15',      label: 'Hope Clinics Worldwide' },
  { key: 'campaigns',  value: '23',      label: 'Health Campaigns' },
];

const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden mb-6">
      <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#D1DCF5]">
        <h2 className="font-bold text-[#0F2340] text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function HomeManager() {
  const [hero,      setHero]     = useState<HeroText>(DEFAULT_HERO);
  const [images,    setImages]   = useState<HeroImage[]>(DEFAULT_IMAGES);
  const [stats,     setStats]    = useState<StatItem[]>(DEFAULT_STATS);
  const [newUrl,    setNewUrl]   = useState('');
  const [saving,    setSaving]   = useState<string | null>(null);
  const [toast,     setToast]    = useState('');
  const [uploading, setUploading] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    const load = async () => {
      try {
        const [heroR, imgR, statsR] = await Promise.all([
          fetch('/api/admin/home?section=hero'),
          fetch('/api/admin/home?section=hero_images'),
          fetch('/api/admin/home?section=stats'),
        ]);
        if (heroR.ok) { const d = await heroR.json(); if (d?.value) setHero(d.value as HeroText); }
        if (imgR.ok)  { const d = await imgR.json(); if (d?.value?.length) setImages(d.value as HeroImage[]); }
        if (statsR.ok){ const d = await statsR.json(); if (d?.value?.length) setStats(d.value as StatItem[]); }
      } catch { /* use defaults */ }
    };
    load();
  }, []);

  const save = async (section: string, payload: unknown) => {
    setSaving(section);
    try {
      const r = await fetch('/api/admin/home', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content: payload }),
      });
      if (r.ok) showToast(`${section} saved — frontend updated!`);
      else showToast('Save failed');
    } catch { showToast('Network error'); }
    setSaving(null);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'heroes');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) {
        const { url } = await r.json() as { url: string };
        if (url) {
          const newImg: HeroImage = { id: Date.now().toString(), url, is_active: true, order_index: images.length };
          setImages(p => [...p, newImg]);
          showToast('Image uploaded!');
        }
      }
    } catch { showToast('Upload failed'); }
    setUploading(false);
  };

  const addImageByUrl = () => {
    if (!newUrl.trim()) return;
    setImages(p => [...p, { id: Date.now().toString(), url: newUrl.trim(), is_active: true, order_index: p.length }]);
    setNewUrl('');
  };

  const SaveBtn = ({ section, payload }: { section: string; payload: unknown }) => (
    <button onClick={() => save(section, payload)} disabled={saving === section}
      className="flex items-center gap-1.5 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
      {saving === section ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
      {saving === section ? 'Saving…' : 'Save & Publish'}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Homepage Manager</h1>
        <p className="text-[#8896B3] text-sm">All changes sync to the public homepage instantly</p>
      </div>

      {/* Hero Text */}
      <Section title="🖼️ Hero Section — Text">
        <div className="space-y-4">
          {[
            ['Badge', 'badge'], ['Main Heading', 'title'],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">{label}</label>
              <input value={hero[key as keyof HeroText]} onChange={e => setHero(h => ({ ...h, [key]: e.target.value }))} className={inputCls} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Subtitle</label>
            <textarea value={hero.subtitle} onChange={e => setHero(h => ({ ...h, subtitle: e.target.value }))} rows={2} className={inputCls + ' resize-none'} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[['CTA Button 1', 'cta1'], ['CTA Button 2', 'cta2']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">{label}</label>
                <input value={hero[key as keyof HeroText]} onChange={e => setHero(h => ({ ...h, [key]: e.target.value }))} className={inputCls} />
              </div>
            ))}
          </div>
          <div className="flex justify-end"><SaveBtn section="hero" payload={hero} /></div>
        </div>
      </Section>

      {/* Hero Images */}
      <Section title="🖼️ Hero Background Images">
        <div className="space-y-2 mb-4">
          {images.map((img, i) => (
            <div key={img.id} className={`flex items-center gap-3 p-3 rounded-lg border ${img.is_active ? 'bg-white border-[#D1DCF5]' : 'bg-[#F8FAFF] border-[#E5E1DC] opacity-60'}`}>
              <GripVertical className="w-4 h-4 text-[#D1DCF5] cursor-grab flex-shrink-0" />
              <span className="text-[#D1DCF5] text-xs w-4 text-center flex-shrink-0">{i + 1}</span>
              <div className="w-16 h-9 rounded overflow-hidden bg-[#EBF0FB] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="flex-1 text-xs text-[#4A5568] truncate min-w-0">{img.url}</p>
              <button onClick={() => setImages(p => p.map(x => x.id === img.id ? { ...x, is_active: !x.is_active } : x))}
                className={`p-1.5 rounded-lg transition-colors ${img.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                {img.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => setImages(p => p.filter(x => x.id !== img.id))}
                className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Upload file */}
        <label className="flex items-center gap-2 cursor-pointer mb-3 border-2 border-dashed border-[#D1DCF5] rounded-xl p-4 hover:border-[#0F2340] hover:bg-[#F8FAFF] transition-all">
          {uploading ? <RefreshCw className="w-5 h-5 text-[#0F2340] animate-spin" /> : <Upload className="w-5 h-5 text-[#8896B3]" />}
          <span className="text-sm text-[#4A5568]">{uploading ? 'Uploading…' : 'Upload image file (JPG, PNG, WebP)'}</span>
          <input type="file" accept="image/*" className="hidden"
            onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0])} />
        </label>

        {/* Add by URL */}
        <div className="flex gap-2 mb-3">
          <input value={newUrl} onChange={e => setNewUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && addImageByUrl()}
            placeholder="Or paste image URL…" className={inputCls + ' flex-1'} />
          <button onClick={addImageByUrl} className="flex-shrink-0 flex items-center gap-1 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B]">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex justify-end"><SaveBtn section="hero_images" payload={images} /></div>
      </Section>

      {/* Stats */}
      <Section title="📊 Stats Counters">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          {stats.map((stat, i) => (
            <div key={stat.key} className="flex gap-2 p-3 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
              <div className="flex-1">
                <p className="text-[#8896B3] text-[10px] uppercase tracking-wide mb-1">Value</p>
                <input value={stat.value} onChange={e => setStats(s => s.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                  className="w-full border border-[#D1DCF5] rounded-md px-2 py-1.5 text-sm font-bold text-[#0F2340] focus:outline-none focus:border-[#0F2340]" />
              </div>
              <div className="flex-1">
                <p className="text-[#8896B3] text-[10px] uppercase tracking-wide mb-1">Label</p>
                <input value={stat.label} onChange={e => setStats(s => s.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                  className="w-full border border-[#D1DCF5] rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#0F2340]" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end"><SaveBtn section="stats" payload={stats} /></div>
      </Section>
    </div>
  );
}
