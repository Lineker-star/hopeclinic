'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { staffCounts } from '@/data/staff';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import type { StaffCategory } from '@/types';

async function fetchStaff(): Promise<DbStaff[]> {
  try {
    const res = await fetch('/api/admin/staff');
    if (res.ok) {
      const data = await res.json() as DbStaff[];
      const active = data.filter(s => s.is_active !== false);
      if (active.length > 0) return active;
    }
  } catch (e) {
    console.error('[fetchStaff] API error:', e);
  }
  return [];
}

interface DbStaff {
  id: string; name: string; title: string; category: StaffCategory;
  department?: string; image_url?: string; bio?: string;
  is_active: boolean; order_index: number;
}

const tabs: { key: StaffCategory; label: string; labelFr: string; emoji: string; total: number }[] = [
  { key: 'TOP_ADMINISTRATION', label: 'Administration',    labelFr: 'Direction',              emoji: '👑', total: staffCounts.TOP_ADMINISTRATION },
  { key: 'RESIDENT_DOCTORS',   label: 'Resident Doctors', labelFr: 'Médecins Résidents',     emoji: '⚕️', total: staffCounts.RESIDENT_DOCTORS },
  { key: 'MAIN_NURSES',        label: 'Main Nurses',      labelFr: 'Infirmières Principales', emoji: '🩺', total: staffCounts.MAIN_NURSES },
  { key: 'MIDWIVES',           label: 'Midwives',         labelFr: 'Sages-Femmes',           emoji: '🤱', total: staffCounts.MIDWIVES },
  { key: 'AIDING_NURSES',      label: 'Aiding Nurses',    labelFr: 'Infirmiers Auxiliaires', emoji: '💉', total: staffCounts.AIDING_NURSES },
  { key: 'SUPPORT_STAFF',      label: 'Support Staff',    labelFr: 'Personnel de Soutien',   emoji: '🏥', total: staffCounts.SUPPORT_STAFF },
];

const badgeColors: Record<StaffCategory, string> = {
  TOP_ADMINISTRATION: 'bg-[#1B3A6B] text-white',
  RESIDENT_DOCTORS:   'bg-[#2952A3] text-white',
  MAIN_NURSES:        'bg-green-700 text-white',
  MIDWIVES:           'bg-pink-600 text-white',
  AIDING_NURSES:      'bg-purple-600 text-white',
  SUPPORT_STAFF:      'bg-[#D4A017] text-[#1B3A6B]',
};

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<StaffCategory>('TOP_ADMINISTRATION');

  const { data: allStaff, loading } = useSupabaseRealtime<DbStaff[]>('staff', fetchStaff, []);

  const members = allStaff.filter(s => s.category === activeTab).sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
  const activeInfo = tabs.find(t => t.key === activeTab)!;

  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our People</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Staff
          </h1>
          <p className="text-white/80 text-lg">87 dedicated healthcare professionals serving with compassion</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Staff</span>
          </nav>
        </div>
      </div>

      {/* Stats banner */}
      <div className="bg-[#0F2347] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-center text-sm">
          {tabs.map(({ emoji, label, total }) => (
            <div key={label}>
              <span className="text-[#D4A017] font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{total}</span>
              <span className="text-white/60 ml-1">{label}</span>
            </div>
          ))}
          <div>
            <span className="text-[#D4A017] font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>87</span>
            <span className="text-white/60 ml-1">Total Staff</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#D1DCF5] sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0">
            {tabs.map(({ key, label, emoji, total }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex-shrink-0 px-4 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === key
                    ? 'border-[#1B3A6B] text-[#1B3A6B]'
                    : 'border-transparent text-[#4A5568] hover:text-[#1B3A6B]'
                }`}>
                <span>{emoji}</span>
                <span className="hidden sm:inline">{label}</span>
                <span className="ml-1 text-xs bg-[#EBF0FB] text-[#1B3A6B] px-1.5 py-0.5 rounded-full font-bold">
                  {total}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Cards */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {activeInfo.emoji} {activeInfo.label}
            <span className="ml-2 text-sm font-medium text-[#8896B3]">({activeInfo.total} total)</span>
          </h2>
          <p className="text-[#8896B3] text-xs mt-1">
            {activeInfo.label} / {activeInfo.labelFr}
            {activeInfo.total > members.length && (
              <span className="ml-2 text-[#D4A017]">• Showing {members.length} key members</span>
            )}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#D1DCF5] animate-pulse">
                <div className="h-48 bg-[#EBF0FB]" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-[#EBF0FB] rounded w-1/2" />
                  <div className="h-4 bg-[#EBF0FB] rounded w-3/4" />
                  <div className="h-3 bg-[#EBF0FB] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && members.length === 0 && (
          <div className="text-center py-20 text-[#8896B3]">
            <p className="text-lg font-medium">No staff members in this category yet.</p>
          </div>
        )}

        {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {members.map((member) => (
            <div key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-[#D1DCF5] hover:border-[#1B3A6B]">
              <div className="relative h-48 overflow-hidden bg-[#EBF0FB]">
                <Image src={member.image_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop'} alt={member.name}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div className="p-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[member.category]}`}>
                  {tabs.find(t => t.key === member.category)?.label}
                </span>
                <h3 className="font-bold text-[#1A1A2E] text-sm mt-2 leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {member.name}
                </h3>
                <p className="text-[#1B3A6B] text-xs font-medium mt-0.5">{member.title}</p>
                {member.department && (
                  <p className="text-[#8896B3] text-xs mt-0.5">{member.department}</p>
                )}
                {member.bio && (
                  <p className="text-[#4A5568] text-xs mt-2 line-clamp-2 leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}

          {/* Placeholder card if total > shown */}
          {activeInfo.total > members.length && (
            <div className="bg-[#F0F4FF] rounded-xl border-2 border-dashed border-[#D1DCF5] flex flex-col items-center justify-center p-6 text-center">
              <div className="text-3xl mb-2">{activeInfo.emoji}</div>
              <p className="text-[#8896B3] text-sm font-medium">
                +{activeInfo.total - members.length} more
              </p>
              <p className="text-[#8896B3] text-xs mt-1">{activeInfo.label}</p>
            </div>
          )}
        </div>
        )}
      </section>

      {/* Join CTA */}
      <section className="py-12 bg-[#1B3A6B] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Join Our Healing Team
          </h2>
          <p className="text-white/70 mb-6 text-sm">
            Are you a healthcare professional passionate about serving humanity? Hope Clinic Koumé
            welcomes dedicated individuals to join our 87-strong team.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#D4A017] text-[#1B3A6B] px-6 py-3 rounded-xl font-bold hover:bg-[#F5C842] transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
