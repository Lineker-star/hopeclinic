'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface HeroImage { id: string; url: string; order_index: number; is_active: boolean; alt_text?: string }
interface StatItem  { key: string; value: string; label: string }
interface HeroText  { title: string; subtitle: string; badge: string; cta1: string; cta2: string }

const DEFAULT_HERO: HeroText = {
  badge:    'CMFI Mercy Works — Hope Clinic Koumé',
  title:    'Quality Medical Care at Our Modern Clinic',
  subtitle: 'With our modern facilities and skilled medical staff, we provide quality care in a comfortable and healing environment.',
  cta1: 'Book Appointment', cta2: 'View Our Services',
};

const DEFAULT_IMAGES: HeroImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80', order_index: 0, is_active: true, alt_text: 'African doctor consultation' },
  { id: '2', url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80',    order_index: 1, is_active: true, alt_text: 'African maternity care' },
  { id: '3', url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&q=80', order_index: 2, is_active: true, alt_text: 'African nurse with patient' },
  { id: '4', url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1920&q=80', order_index: 3, is_active: true, alt_text: 'African pediatric care' },
];

const DEFAULT_STATS: StatItem[] = [
  { key: 'patients',   value: '68,791+', label: 'Patients Treated (10 yrs)' },
  { key: 'surgeries',  value: '1,135+',  label: 'Surgeries Performed' },
  { key: 'deliveries', value: '1,576+',  label: 'Births / Deliveries' },
  { key: 'staff',      value: '87',      label: 'Dedicated Staff' },
  { key: 'clinics',    value: '15',      label: 'Hope Clinics Worldwide' },
  { key: 'campaigns',  value: '23',      label: 'Health Campaigns' },
];

const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340] transition-all';

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
  const [saved,     setSaved]    = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/home?section=hero').then(r => r.ok ? r.json() : null).then(d => { if (d?.content) setHero(d.content); }).catch(() => {});
    fetch('/api/admin/home?section=hero_images').then(r => r.ok ? r.json() : null).then(d => { if (d?.length) setImages(d); }).catch(() => {});
    fetch('/api/admin/home?section=stats').then(r => r.ok ? r.json() : null).then(d => { if (d?.content?.length) setStats(d.content); }).catch(() => {});
  }, []);

  const persist = async (section: string, payload: unknown) => {
    setSaving(section);
    try {
      await fetch('/api/admin/home', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, content: payload }) });
      setSaved(section); setTimeout(() => setSaved(null), 2000);
    } catch { /**/ } finally { setSaving(null); }
  };

  const SaveBtn = ({ section, payload }: { section: string; payload: unknown }) => (
    <button onClick={() => persist(section, payload)} disabled={saving === section}
      className="flex items-center gap-1.5 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
      {saving === section ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : saved === section ? '✓ Saved' : <><Save className="w-3.5 h-3.5" /> Save</>}
    </button>
  );

  const addImage  = () => { if (!newUrl.trim()) return; setImages(p => [...p, { id: Date.now().toString(), url: newUrl.trim(), order_index: p.length, is_active: true }]); setNewUrl(''); };
  const delImage  = (id: string) => setImages(p => p.filter(i => i.id !== id));
  const togImage  = (id: string) => setImages(p => p.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Homepage Manager</h1>
        <p className="text-[#8896B3] text-sm">Edit hero text, background images, and stats counters</p>
      </div>

      {/* Hero Text */}
      <Section title="🖼️ Hero Section — Text">
        <div className="space-y-4">
          {[
            ['Badge Label', 'badge', false],
            ['Main Heading', 'title', false],
            ['Subtitle', 'subtitle', true],
            ['CTA Button 1', 'cta1', false],
            ['CTA Button 2', 'cta2', false],
          ].map(([label, key, multi]) => (
            <div key={key as string}>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">{label as string}</label>
              {multi
                ? <textarea value={hero[key as keyof HeroText]} onChange={e => setHero(h => ({ ...h, [key as string]: e.target.value }))} rows={2} className={inputCls + ' resize-none'} />
                : <input value={hero[key as keyof HeroText]} onChange={e => setHero(h => ({ ...h, [key as string]: e.target.value }))} className={inputCls} />
              }
            </div>
          ))}
          <div className="flex justify-end"><SaveBtn section="hero" payload={hero} /></div>
        </div>
      </Section>

      {/* Hero Images */}
      <Section title="🖼️ Hero Background Images (slideshow)">
        <div className="space-y-2 mb-4">
          {images.map((img, i) => (
            <div key={img.id} className={`flex items-center gap-3 p-3 rounded-lg border ${img.is_active ? 'bg-white border-[#D1DCF5]' : 'bg-[#F8FAFF] border-[#E5E1DC] opacity-60'}`}>
              <GripVertical className="w-4 h-4 text-[#8896B3] cursor-grab flex-shrink-0" />
              <span className="text-[#8896B3] text-xs w-4 flex-shrink-0">{i + 1}</span>
              {/* thumbnail */}
              <div className="w-16 h-9 rounded overflow-hidden bg-[#EBF0FB] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="flex-1 text-xs text-[#4A5568] truncate min-w-0">{img.alt_text || img.url}</p>
              <button onClick={() => togImage(img.id)} className={`p-1.5 rounded-lg transition-colors ${img.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                {img.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => delImage(img.id)} className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input value={newUrl} onChange={e => setNewUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && addImage()}
            placeholder="Paste image URL (Unsplash, Cloudinary, etc.)" className={inputCls + ' flex-1'} />
          <button onClick={addImage} className="flex-shrink-0 flex items-center gap-1 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex justify-end"><SaveBtn section="hero_images" payload={images} /></div>
      </Section>

      {/* Stats */}
      <Section title="📊 Stats Counters (animated numbers on homepage)">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          {stats.map((stat, i) => (
            <div key={stat.key} className="flex items-center gap-3 p-3 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[#8896B3] text-[10px] uppercase tracking-wide mb-1">Value</p>
                  <input value={stat.value} onChange={e => setStats(s => s.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                    className="w-full border border-[#D1DCF5] rounded-md px-2 py-1.5 text-sm font-bold text-[#0F2340] focus:outline-none focus:border-[#0F2340]" />
                </div>
                <div>
                  <p className="text-[#8896B3] text-[10px] uppercase tracking-wide mb-1">Label</p>
                  <input value={stat.label} onChange={e => setStats(s => s.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    className="w-full border border-[#D1DCF5] rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#0F2340]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end"><SaveBtn section="stats" payload={stats} /></div>
      </Section>
    </div>
  );
}
