'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { staffByCategory } from '@/data/staff';
import type { StaffCategory } from '@/types';

const tabs: { key: StaffCategory; label: string; emoji: string }[] = [
  { key: 'TOP_ADMINISTRATION', label: 'Administration', emoji: '👔' },
  { key: 'RESIDENT_DOCTORS', label: 'Resident Doctors', emoji: '🩺' },
  { key: 'MAIN_NURSES', label: 'Main Nurses', emoji: '💉' },
  { key: 'MIDWIVES', label: 'Midwives', emoji: '👶' },
  { key: 'AIDING_NURSES', label: 'Auxiliary Nurses', emoji: '🏥' },
  { key: 'SUPPORT_STAFF', label: 'Support Staff', emoji: '⭐' },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<StaffCategory>('TOP_ADMINISTRATION');
  const members = staffByCategory[activeTab];

  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Team</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Staff
          </h1>
          <p className="text-white/80 text-lg">Dedicated professionals serving with compassion and excellence</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Staff</span>
          </nav>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E5E1DC] sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {tabs.map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-shrink-0 px-4 py-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === key
                    ? 'border-[#C8102E] text-[#C8102E]'
                    : 'border-transparent text-[#5A5A5A] hover:text-[#C8102E]'
                }`}
              >
                <span>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {tabs.find(t => t.key === activeTab)?.emoji} {tabs.find(t => t.key === activeTab)?.label}
          </h2>
          <p className="text-[#9A9A9A] text-sm">{members.length} team member{members.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    member.category === 'TOP_ADMINISTRATION' ? 'bg-[#C8102E]/10 text-[#C8102E]' :
                    member.category === 'RESIDENT_DOCTORS' ? 'bg-blue-100 text-blue-700' :
                    member.category === 'MAIN_NURSES' ? 'bg-green-100 text-green-700' :
                    member.category === 'MIDWIVES' ? 'bg-pink-100 text-pink-700' :
                    member.category === 'AIDING_NURSES' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {tabs.find(t => t.key === member.category)?.label}
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base leading-tight mt-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {member.name}
                </h3>
                <p className="text-[#C8102E] text-xs font-medium mt-0.5">{member.title}</p>
                {member.department && (
                  <p className="text-[#9A9A9A] text-xs mt-1">{member.department}</p>
                )}
                {member.bio && (
                  <p className="text-[#5A5A5A] text-xs mt-2 line-clamp-2 leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join team CTA */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Join Our Healing Team
          </h2>
          <p className="text-[#5A5A5A] mb-6">
            Are you a healthcare professional with a passion for serving humanity? Hope Clinic Koumé welcomes dedicated individuals to join our mission.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8B0000] transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
