import type { Metadata } from 'next';
import Link from 'next/link';
import { clinicsByRegion, hopeClinicLocations, activeClinics, inConstructionClinics, plannedClinics } from '@/data/hope-clinics';
import { MapPin, Calendar, CheckCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import NetworkMapWrapper from '@/components/map/NetworkMapWrapper';

export const metadata: Metadata = {
  title: 'Hope Clinics Global Network',
  description: '15 active Hope Clinics across 10+ countries. 30,726+ patients served. The global healing network of CMFI Mercy Works.',
};

const statusConfig = {
  ACTIVE:          { label: 'Active',          color: '#16A34A', bg: '#DCFCE7', icon: CheckCircle },
  PLANNED:         { label: 'Planned',          color: '#2563EB', bg: '#DBEAFE', icon: Navigation },
  IN_CONSTRUCTION: { label: 'In Construction',  color: '#D97706', bg: '#FEF3C7', icon: Clock },
  HISTORICAL:      { label: 'Historical',       color: '#6B7280', bg: '#F3F4F6', icon: MapPin },
} as const;

type StatusKey = keyof typeof statusConfig;

const regions = [
  { key: 'eastCameroon' as const, label: 'East Region of Cameroon', emoji: '🇨🇲', desc: 'The birthplace and HQ of the Hope Clinic network' },
  { key: 'cameroon'     as const, label: 'Rest of Cameroon',        emoji: '🇨🇲', desc: 'Expanding healthcare across Cameroon\'s major cities' },
  { key: 'africa'       as const, label: 'Africa',                  emoji: '🌍', desc: 'A continent-wide healing ministry' },
  { key: 'world'        as const, label: 'The World',               emoji: '🌏', desc: 'Reaching beyond Africa to the nations' },
];

export default function HopeClinicsNetworkPage() {
  return (
    <div className="bg-[#F8FAFF]">

      {/* Hero */}
      <div className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/85" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Global Healing Ministry</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            The Global Hope Clinic Network
          </h1>
          <p className="text-white/80 text-lg mb-8">
            15 Functional Clinics | 30,726+ Patients | 10+ Countries | 1 Mission
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { n: activeClinics.length.toString(), label: 'Active Clinics' },
              { n: '30,726+', label: 'Patients (Latest Yr)' },
              { n: '10+',     label: 'Countries' },
              { n: plannedClinics.length.toString() + '+', label: 'Clinics Planned' },
            ].map(({ n, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-[#D4A017]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {n}
                </div>
                <div className="text-white/65 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-[#D1DCF5] py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 justify-center text-sm">
          {Object.entries(statusConfig).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[#4A5568]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4 gold-underline"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Interactive World Map
        </h2>
        <NetworkMapWrapper />
      </section>

      {/* Tabbed clinic listings */}
      {regions.map(({ key, label, emoji, desc }) => {
        const clinics = clinicsByRegion[key];
        if (!clinics.length) return null;
        return (
          <section key={key} className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {label}
                </h2>
                <p className="text-[#8896B3] text-sm">{desc} — {clinics.length} location{clinics.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clinics.map((clinic) => {
                const config = statusConfig[clinic.status as StatusKey];
                const StatusIcon = config.icon;
                const isHQ = clinic.name.includes('(HQ)');
                return (
                  <div key={clinic.id}
                    className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 ${isHQ ? 'border-[#D4A017]' : ''}`}
                    style={!isHQ ? { borderLeftColor: config.color } : undefined}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-[#1A1A2E] text-sm leading-tight flex-1 mr-2"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {clinic.name}
                        {isHQ && <span className="ml-1 text-[#D4A017]">★</span>}
                      </h3>
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                        style={{ color: config.color, backgroundColor: config.bg }}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#4A5568] text-xs mb-1">
                      <MapPin className="w-3 h-3 text-[#1B3A6B]" />
                      {clinic.city}, {clinic.country}
                    </div>
                    {clinic.yearFounded && (
                      <div className="flex items-center gap-1.5 text-[#8896B3] text-xs">
                        <Calendar className="w-3 h-3" />
                        Est. {clinic.yearFounded}
                      </div>
                    )}
                    {clinic.description && (
                      <p className="text-[#8896B3] text-xs mt-2 line-clamp-2 leading-relaxed">
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
      <section className="py-14 bg-[#1B3A6B] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Start a Hope Clinic in Your City
          </h2>
          <p className="text-white/70 mb-6 text-sm">
            Do you feel called to bring Hope Clinic to your community? Connect with the Mercy Works
            Department to explore partnership and establish a new clinic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.mercyworks.site" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4A017] text-[#1B3A6B] px-6 py-3 rounded-xl font-bold hover:bg-[#F5C842] transition-colors">
              Contact Mercy Works <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.ztffoundation.org" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              ZTF Foundation <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
