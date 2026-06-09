'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Globe, Award, ArrowRight } from 'lucide-react';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { createClient } from '@/lib/supabase/client';
import { doctors as SEED_DOCTORS } from '@/data/doctors';
import type { Doctor } from '@/types';

type DoctorRow = Record<string, unknown>;

async function fetchDoctors(): Promise<DoctorRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('doctors')
    .select('*')
    .eq('is_active', true)
    .order('order_index');
  if (data && data.length > 0) return data as DoctorRow[];
  return SEED_DOCTORS.filter(d => d.isActive).map(d => ({
    id:                d.id,
    name:              d.name,
    title_prefix:      d.titlePrefix,
    specialization:    d.specialization,
    image_url:         d.imageUrl,
    experience_years:  d.experience,
    languages:         d.languages,
    available_days:    d.availableDays,
  }));
}

const SEED_ROWS: DoctorRow[] = SEED_DOCTORS.filter(d => d.isActive).map(d => ({
  id:               d.id,
  name:             d.name,
  title_prefix:     d.titlePrefix,
  specialization:   d.specialization,
  image_url:        d.imageUrl,
  experience_years: d.experience,
  languages:        d.languages,
  available_days:   d.availableDays,
}));

export default function DoctorsClient() {
  const { data: doctors, loading } = useSupabaseRealtime<DoctorRow[]>(
    'doctors',
    fetchDoctors,
    SEED_ROWS,
  );

  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#0F2340]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Expert Medical Team</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Dedicated Doctors
          </h1>
          <p className="text-white/80 text-lg">Expert physicians committed to healing every soul</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Doctors</span>
          </nav>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A2E] gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Meet Our Specialists
          </h2>
          <p className="text-[#4A5568] mt-5">
            Our team of {doctors.length} specialist physician{doctors.length !== 1 ? 's' : ''} — dedicated to your health
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-72 bg-[#EBF0FB]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#D1DCF5] rounded w-3/4" />
                  <div className="h-3 bg-[#D1DCF5] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => {
              const id          = doctor.id as string;
              const name        = (doctor.name ?? '') as string;
              const titlePrefix = (doctor.title_prefix ?? doctor.titlePrefix ?? 'Dr.') as string;
              const spec        = (doctor.specialization ?? '') as string;
              const imgUrl      = (doctor.image_url ?? doctor.imageUrl ?? '') as string;
              const exp         = (doctor.experience_years ?? doctor.experience ?? 0) as number;
              const langs       = (doctor.languages ?? []) as string[];
              const days        = (doctor.available_days ?? doctor.availableDays ?? []) as string[];

              return (
                <div key={id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-b-4 border-[#0F2340]">
                  <div className="relative h-72 overflow-hidden bg-[#EBF0FB]">
                    {imgUrl && (
                      <Image src={imgUrl} alt={`${titlePrefix} ${name}`} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2340]/70 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {titlePrefix} {name}
                      </h3>
                      <p className="text-[#D4A017] text-sm font-medium">{spec}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-[#F0F4FF] rounded-lg p-2.5">
                        <Award className="w-4 h-4 text-[#0F2340] flex-shrink-0" />
                        <div>
                          <p className="text-[#1A1A2E] font-bold text-sm">{exp}+ yrs</p>
                          <p className="text-[#8896B3] text-xs">Experience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#F0F4FF] rounded-lg p-2.5">
                        <Globe className="w-4 h-4 text-[#0F2340] flex-shrink-0" />
                        <div>
                          <p className="text-[#1A1A2E] font-bold text-sm">{langs.length} lang{langs.length !== 1 ? 's' : ''}</p>
                          <p className="text-[#8896B3] text-xs">Spoken</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {days.slice(0, 3).map((day: string) => (
                        <span key={day} className="text-xs px-2 py-0.5 bg-[#EBF0FB] text-[#0F2340] rounded-full border border-[#D1DCF5] flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />{day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/doctors/${id}`}
                        className="flex-1 text-center border-2 border-[#0F2340] text-[#0F2340] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#EBF0FB] transition-colors">
                        View Profile
                      </Link>
                      <Link href="/booking"
                        className="flex-1 text-center bg-[#0F2340] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="py-14 bg-[#0F2340] text-white text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Ready to See a Specialist?
        </h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">Book online or call our emergency line 24/7.</p>
        <Link href="/booking"
          className="inline-flex items-center gap-2 bg-[#D4A017] text-[#0F2340] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5C842] transition-colors">
          Book an Appointment <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
