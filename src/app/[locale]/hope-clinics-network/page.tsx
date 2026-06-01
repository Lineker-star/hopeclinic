import type { Metadata } from 'next';
import Link from 'next/link';
import { clinicsByRegion, hopeClinicLocations } from '@/data/hope-clinics';
import { MapPin, Calendar, CheckCircle, Clock, Navigation } from 'lucide-react';
import NetworkMapWrapper from '@/components/map/NetworkMapWrapper';

export const metadata: Metadata = {
  title: 'Hope Clinics Global Network',
  description: 'Explore the global network of Hope Clinics — 15 active clinics across Cameroon, Africa, and the world, serving 30,726+ patients.',
};

const statusConfig = {
  ACTIVE: { label: 'Active', color: '#16A34A', bg: '#DCFCE7', icon: CheckCircle },
  PLANNED: { label: 'Planned', color: '#2563EB', bg: '#DBEAFE', icon: Navigation },
  IN_CONSTRUCTION: { label: 'In Construction', color: '#D97706', bg: '#FEF3C7', icon: Clock },
  HISTORICAL: { label: 'Historical', color: '#6B7280', bg: '#F3F4F6', icon: MapPin },
};

const regions = [
  { key: 'eastCameroon' as const, label: 'East Region of Cameroon', emoji: '🇨🇲', description: 'The birthplace and heart of the Hope Clinic network' },
  { key: 'cameroon' as const, label: 'Rest of Cameroon', emoji: '🇨🇲', description: 'Expanding across Cameroon\'s major cities' },
  { key: 'africa' as const, label: 'Africa', emoji: '🌍', description: 'A continent-wide healing ministry' },
  { key: 'world' as const, label: 'The World', emoji: '🌏', description: 'Reaching beyond Africa to the nations' },
];

export default function HopeClinicsNetworkPage() {
  const activeClinics = hopeClinicLocations.filter(c => c.status === 'ACTIVE').length;

  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/80" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Global Healing Ministry</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Hope Clinics Global Network
          </h1>
          <p className="text-white/80 text-lg mb-8">Bringing healing to communities across Cameroon, Africa, and the world</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { n: activeClinics.toString(), label: 'Active Clinics' },
              { n: '30,726+', label: 'Patients Served' },
              { n: '10+', label: 'Countries' },
            ].map(({ n, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#D4A017]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{n}</div>
                <div className="text-white/70 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-[#E5E1DC] py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 justify-center text-sm">
          {Object.entries(statusConfig).map(([key, { label, color, bg }]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[#5A5A5A]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Interactive World Map
        </h2>
        <NetworkMapWrapper />
      </section>

      {/* Clinic listings by region */}
      {regions.map(({ key, label, emoji, description }) => {
        const clinics = clinicsByRegion[key];
        if (!clinics.length) return null;
        return (
          <section key={key} className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {label}
                </h2>
                <p className="text-[#9A9A9A] text-sm">{description}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clinics.map((clinic) => {
                const config = statusConfig[clinic.status];
                const StatusIcon = config.icon;
                const isMain = clinic.name.includes('(HQ)');
                return (
                  <div
                    key={clinic.id}
                    className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 ${isMain ? 'border-[#C8102E]' : ''}`}
                    style={!isMain ? { borderLeftColor: config.color } : undefined}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-[#1A1A1A] text-sm leading-tight flex-1 mr-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {clinic.name}
                        {isMain && <span className="ml-1 text-[#C8102E]">★</span>}
                      </h3>
                      <span
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                        style={{ color: config.color, backgroundColor: config.bg }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#5A5A5A] text-xs mb-1">
                      <MapPin className="w-3 h-3 text-[#C8102E]" />
                      {clinic.city}, {clinic.country}
                    </div>
                    {clinic.yearFounded && (
                      <div className="flex items-center gap-1.5 text-[#9A9A9A] text-xs">
                        <Calendar className="w-3 h-3" />
                        Est. {clinic.yearFounded}
                      </div>
                    )}
                    {clinic.description && (
                      <p className="text-[#9A9A9A] text-xs mt-2 line-clamp-2 leading-relaxed">
                        {clinic.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Start a clinic CTA */}
      <section className="py-14 bg-[#C8102E] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Start a Hope Clinic in Your City
          </h2>
          <p className="text-white/80 mb-6">
            Are you passionate about bringing quality healthcare to your community? The Hope Clinic network welcomes partners to help establish new clinics.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#C8102E] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F9F6F1] transition-colors">
            Contact Us to Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
