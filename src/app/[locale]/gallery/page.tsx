'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn, Play } from 'lucide-react';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

const categories = [
  { id: 'all',          label: 'All Photos',        labelFr: 'Toutes les Photos' },
  { id: 'facility',     label: 'Our Facilities',    labelFr: 'Nos Installations' },
  { id: 'medical-team', label: 'Medical Team',      labelFr: 'Équipe Médicale' },
  { id: 'campaigns',    label: 'Health Campaigns',  labelFr: 'Campagnes de Santé' },
  { id: 'equipment',    label: 'Medical Equipment', labelFr: 'Équipements Médicaux' },
  { id: 'construction', label: 'Growth & Buildings',labelFr: 'Croissance & Bâtiments' },
];

interface GalleryImage { id: string; url: string; category: string; caption: string }

const SEED_IMAGES: GalleryImage[] = [
  { id: '1',  url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',  category: 'facility',     caption: 'Hope Clinic Koumé — Main Campus, Bertoua' },
  { id: '2',  url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop',  category: 'medical-team', caption: 'Our Medical Team at Work' },
  { id: '3',  url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop',    category: 'medical-team', caption: 'Compassionate Patient Care' },
  { id: '4',  url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop',    category: 'facility',     caption: 'Surgical Block — Hope Clinic Koumé' },
  { id: '5',  url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop', category: 'campaigns',    caption: 'Community Health Campaign — East Region' },
  { id: '6',  url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop', category: 'medical-team', caption: 'Maternity Ward — Mother & Child Pavilion (B4)' },
  { id: '7',  url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&auto=format&fit=crop', category: 'medical-team', caption: 'Paediatric Consultation with Dr. Enoh' },
  { id: '8',  url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&auto=format&fit=crop', category: 'equipment',    caption: 'Cardiac Monitoring Equipment' },
  { id: '9',  url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop', category: 'facility',     caption: 'Advanced Laboratory — URIT 5160 Blood Analyser' },
  { id: '10', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop', category: 'equipment',    caption: 'Radiology & Ultrasound Unit' },
  { id: '11', url: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&auto=format&fit=crop', category: 'campaigns',    caption: 'Hope Mobile Clinic — Community Outreach' },
  { id: '12', url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop', category: 'facility',     caption: 'On-site Pharmacy — Hope Clinic Koumé' },
  { id: '13', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop', category: 'construction', caption: 'Building Progress — Hope Clinic Campus' },
  { id: '14', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop', category: 'facility',     caption: 'Intensive Care Unit (ICU)' },
  { id: '15', url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop', category: 'medical-team', caption: 'Dental Hygiene Education Campaign' },
  { id: '16', url: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=800&auto=format&fit=crop', category: 'campaigns',    caption: 'Hope Mobile Clinic — Village Outreach' },
];

const videos = [
  { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop', title: 'Hope Clinic Koumé — 10 Years Overview' },
  { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop', title: 'Community Health Campaign 2024' },
  { id: 'v3', thumbnail: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&auto=format&fit=crop', title: 'Hope Mobile Clinic — East Region' },
];

const heights = ['h-52', 'h-64', 'h-48', 'h-72', 'h-56', 'h-60', 'h-44', 'h-68', 'h-52', 'h-56', 'h-64', 'h-48', 'h-60', 'h-52', 'h-56', 'h-64'];

async function fetchGallery(): Promise<GalleryImage[]> {
  try {
    const res = await fetch('/api/admin/gallery');
    if (res.ok) {
      const data = await res.json() as Record<string, unknown>[];
      const active = data.filter(r => r.is_active !== false);
      if (active.length > 0) {
        return active.map(r => ({
          id:       String(r.id),
          url:      String(r.url ?? r.image_url ?? ''),
          category: String(r.category ?? 'facility'),
          caption:  String(r.caption ?? r.alt ?? ''),
        }));
      }
    }
  } catch (e) {
    console.error('[fetchGallery] API error:', e);
  }
  return SEED_IMAGES;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIdx, setLightboxIdx]       = useState<number | null>(null);
  const [activeTab, setActiveTab]           = useState<'photos' | 'videos'>('photos');

  const { data: galleryImages } = useSupabaseRealtime<GalleryImage[]>(
    'gallery_items',
    fetchGallery,
    SEED_IMAGES,
  );

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">10 Years in Pictures</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Gallery &amp; Media
          </h1>
          <p className="text-white/80">Moments from our healing ministry</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Gallery</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['photos', 'videos'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#1B3A6B] text-white'
                  : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#1B3A6B] hover:text-[#1B3A6B]'
              }`}>
              {tab === 'photos' ? `📷 ${filtered.length} Photos` : `🎬 Videos`}
            </button>
          ))}
        </div>

        {activeTab === 'photos' && (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#1B3A6B] text-white'
                      : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#1B3A6B] hover:text-[#1B3A6B]'
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Masonry */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <div key={img.id}
                  className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  onClick={() => setLightboxIdx(filtered.indexOf(img))}>
                  <div className={`relative w-full ${heights[i % heights.length]}`}>
                    <Image src={img.url} alt={img.caption}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1B3A6B]/40 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#1B3A6B]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium">{img.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'videos' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#D1DCF5]">
                <div className="relative h-44 overflow-hidden">
                  <Image src={video.thumbnail} alt={video.title}
                    fill className="object-cover" sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-[#1B3A6B]/50 flex items-center justify-center group-hover:bg-[#1B3A6B]/70 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#D4A017] flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-[#1B3A6B] ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#1A1A2E] text-sm">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 bg-[#0F2347]/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}>
          <button
            className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxIdx(null)}>
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length); }}>
            ‹
          </button>
          <div className="relative max-w-5xl w-full" style={{ maxHeight: '85vh' }}>
            <Image src={filtered[lightboxIdx].url} alt={filtered[lightboxIdx].caption}
              width={1200} height={800}
              className="object-contain rounded-xl max-h-[80vh] w-auto mx-auto"
            />
            <p className="text-white/70 text-center mt-3 text-sm">{filtered[lightboxIdx].caption}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % filtered.length); }}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
