'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn, Play } from 'lucide-react';

const categories = ['All', 'Facility', 'Staff at Work', 'Patient Care', 'Events & Campaigns', 'Hope Clinics Network'];

const galleryImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop', category: 'Facility', caption: 'Hope Clinic Koumé — Main Building' },
  { id: '2', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop', category: 'Staff at Work', caption: 'Our Medical Team at Work' },
  { id: '3', url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop', category: 'Patient Care', caption: 'Compassionate Patient Care' },
  { id: '4', url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop', category: 'Facility', caption: 'Operating Theater' },
  { id: '5', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop', category: 'Events & Campaigns', caption: 'Community Health Campaign' },
  { id: '6', url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop', category: 'Patient Care', caption: 'Maternity Ward — Newborn Care' },
  { id: '7', url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&auto=format&fit=crop', category: 'Patient Care', caption: 'Pediatric Consultation' },
  { id: '8', url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&auto=format&fit=crop', category: 'Staff at Work', caption: 'Cardiac Monitoring' },
  { id: '9', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop', category: 'Facility', caption: 'Our Modern Laboratory' },
  { id: '10', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop', category: 'Facility', caption: 'Radiology & Imaging Unit' },
  { id: '11', url: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&auto=format&fit=crop', category: 'Hope Clinics Network', caption: 'Hope Clinic Network — Africa' },
  { id: '12', url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop', category: 'Staff at Work', caption: 'Dental Care Department' },
];

const videos = [
  { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop', title: 'Hope Clinic Koumé — Overview', youtubeId: '' },
  { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop', title: 'Community Health Campaign 2024', youtubeId: '' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Story in Pictures</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Gallery & Media
          </h1>
          <p className="text-white/80">Moments from our healing ministry</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['photos', 'videos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-[#C8102E] text-white' : 'bg-white text-[#5A5A5A] border border-[#E5E1DC] hover:bg-[#F9F6F1]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'photos' && (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat ? 'bg-[#C8102E] text-white' : 'bg-white text-[#5A5A5A] border border-[#E5E1DC] hover:bg-red-50 hover:border-[#C8102E] hover:text-[#C8102E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <div
                  key={img.id}
                  className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  onClick={() => setLightboxIdx(filtered.indexOf(img))}
                >
                  <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}>
                    <Image
                      src={img.url} alt={img.caption}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div key={video.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#C8102E] flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#1A1A1A] text-sm">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
            onClick={() => setLightboxIdx(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl w-full" style={{ maxHeight: '80vh' }}>
            <Image
              src={filtered[lightboxIdx].url}
              alt={filtered[lightboxIdx].caption}
              width={1200} height={800}
              className="object-contain rounded-xl max-h-[80vh] w-auto mx-auto"
            />
            <p className="text-white/80 text-center mt-3 text-sm">{filtered[lightboxIdx].caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
