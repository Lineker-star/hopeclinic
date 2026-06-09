'use client';
import { MapPin, Calendar, CheckCircle, Clock, Navigation } from 'lucide-react';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import type { HopeClinicLocation } from '@/types';

const statusConfig = {
  ACTIVE:          { label: 'Active',         color: '#16A34A', bg: '#DCFCE7', icon: CheckCircle },
  PLANNED:         { label: 'Planned',         color: '#2563EB', bg: '#DBEAFE', icon: Navigation },
  IN_CONSTRUCTION: { label: 'In Construction', color: '#D97706', bg: '#FEF3C7', icon: Clock },
  HISTORICAL:      { label: 'Historical',      color: '#6B7280', bg: '#F3F4F6', icon: MapPin },
} as const;

type StatusKey = keyof typeof statusConfig;

const regions = [
  { key: 'East Cameroon' as const, label: 'East Region of Cameroon', emoji: '🇨🇲', desc: 'The birthplace and HQ of the Hope Clinic network' },
  { key: 'Cameroon'      as const, label: 'Rest of Cameroon',        emoji: '🇨🇲', desc: "Expanding healthcare across Cameroon's major cities" },
  { key: 'Africa'        as const, label: 'Africa',                  emoji: '🌍', desc: 'A continent-wide healing ministry' },
  { key: 'World'         as const, label: 'The World',               emoji: '🌏', desc: 'Reaching beyond Africa to the nations' },
] as const;

function mapClinic(r: Record<string, unknown>): HopeClinicLocation {
  return {
    id:          String(r['id'] ?? ''),
    name:        String(r['name'] ?? ''),
    city:        String(r['city'] ?? ''),
    country:     String(r['country'] ?? ''),
    region:      (r['region'] ?? 'Africa') as HopeClinicLocation['region'],
    latitude:    Number(r['latitude'] ?? 0),
    longitude:   Number(r['longitude'] ?? 0),
    status:      (r['status'] ?? 'ACTIVE') as HopeClinicLocation['status'],
    yearFounded: (r['year_founded'] ?? r['yearFounded']) as number | undefined,
    description: r['description'] as string | undefined,
    imageUrl:    (r['image_url'] ?? r['imageUrl']) as string | undefined,
  };
}

async function fetchClinics(): Promise<HopeClinicLocation[]> {
  try {
    const res = await fetch('/api/admin/network');
    if (res.ok) return (await res.json() as Record<string, unknown>[]).map(mapClinic);
  } catch (e) {
    console.error('[fetchClinics] API error:', e);
  }
  return [];
}

export default function HopeClinicsListClient() {
  const { data: clinics, loading } = useSupabaseRealtime<HopeClinicLocation[]>(
    'hope_clinic_locations',
    fetchClinics,
    [],
  );

  if (loading) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 animate-pulse border-l-4 border-[#D1DCF5]">
              <div className="h-4 bg-[#EBF0FB] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#EBF0FB] rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {regions.map(({ key, label, emoji, desc }) => {
        const regionClinics = clinics.filter(c => c.region === key);
        if (!regionClinics.length) return null;
        return (
          <section key={key} className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {label}
                </h2>
                <p className="text-[#8896B3] text-sm">{desc} — {regionClinics.length} location{regionClinics.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {regionClinics.map((clinic) => {
                const config = statusConfig[clinic.status as StatusKey] ?? statusConfig.PLANNED;
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
    </>
  );
}
