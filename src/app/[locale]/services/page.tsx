'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import { departments as SEED_DEPTS } from '@/data/departments';

interface DbDept {
  id: string; slug: string; name: string; description?: string;
  icon_name?: string; image_url?: string; features?: string[];
  is_active: boolean; order_index: number;
}

const ICON_MAP: Record<string, string> = {
  emergency: '🚨', icu: '💉', surgery: '⚕️', pediatrics: '👶',
  cardiology: '❤️', gynecology: '🌸', 'internal-medicine': '🩺',
  laboratory: '🔬', radiology: '📡', pharmacy: '💊',
  maternity: '🤱', dental: '🦷', spiritual: '✝️', holistic: '🌿', mobile: '🚐',
};

async function fetchDepartments(): Promise<DbDept[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('departments')
    .select('id,slug,name,description,icon_name,image_url,features,is_active,order_index')
    .eq('is_active', true)
    .order('order_index');
  if (error || !data || data.length === 0) {
    return SEED_DEPTS.map(d => ({
      id: d.id, slug: d.slug, name: d.name, description: d.description,
      icon_name: d.iconName, image_url: d.imageUrl, features: [],
      is_active: d.isActive, order_index: d.order,
    }));
  }
  return data as DbDept[];
}

const schedule = [
  { days: 'Monday – Wednesday', hours: '08:00 AM – 04:00 PM' },
  { days: 'Thursday – Friday',  hours: '08:00 AM – 03:00 PM' },
  { days: 'Saturday',           hours: '08:00 AM – 01:00 PM' },
  { days: 'Sunday',             hours: 'Closed' },
  { days: 'Emergency (24/7)',   hours: '+237 650 441 422', emg: true },
];

export default function ServicesPage() {
  const { data: depts, loading } = useSupabaseRealtime<DbDept[]>(
    'departments',
    fetchDepartments,
    [],
  );

  return (
    <div className="bg-[#F8FAFF]">

      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Comprehensive Healthcare</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Medical Services
          </h1>
          <p className="text-white/80 text-lg">Comprehensive Healthcare for Body, Mind &amp; Spirit</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Services</span>
          </nav>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#1B3A6B] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-center">
          {[
            { n: '15',       label: 'Departments' },
            { n: '1,135',    label: 'Surgeries (10 yrs)' },
            { n: '39,757',   label: 'Lab Tests (10 yrs)' },
            { n: '1,576',    label: 'Births (10 yrs)' },
            { n: '24/7',     label: 'Emergency Care' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-[#D4A017]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {n}
              </div>
              <div className="text-white/65 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A2E] gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            All {loading ? '…' : depts.length} Departments
          </h2>
          <p className="text-[#4A5568] mt-5">Every department staffed by dedicated specialists</p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-44 bg-[#EBF0FB]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-[#EBF0FB] rounded w-3/4" />
                  <div className="h-3 bg-[#EBF0FB] rounded" />
                  <div className="h-3 bg-[#EBF0FB] rounded w-5/6" />
                  <div className="h-9 bg-[#EBF0FB] rounded-lg mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && depts.length === 0 && (
          <div className="text-center py-20 text-[#8896B3]">
            <p className="text-lg font-medium">No departments available.</p>
            <p className="text-sm mt-1">Please check back later.</p>
          </div>
        )}

        {/* Departments grid */}
        {!loading && depts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {depts.map((dept) => {
              const icon = ICON_MAP[dept.slug] || '🏥';
              const img = dept.image_url || 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop';
              const features = dept.features && dept.features.length > 0 ? dept.features : [];
              return (
                <div key={dept.id} id={dept.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border-b-4 border-[#0F2340]">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={img} alt={dept.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-2xl">{icon}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-[#1A1A2E] text-lg mb-2 group-hover:text-[#1B3A6B] transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {dept.name}
                    </h3>
                    {dept.description && (
                      <p className="text-[#4A5568] text-sm leading-relaxed mb-4 line-clamp-3">{dept.description}</p>
                    )}
                    {features.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {features.slice(0, 4).map((f: string) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-[#4A5568]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/booking"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors text-white bg-[#0F2340] hover:bg-[#1B3A6B]">
                      Book This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Special pillars */}
      <section className="py-14 bg-[#1B3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Beyond Medical Care — Hope Clinic&apos;s Unique Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '✝️', title: 'Hope Spiritual Clinic', desc: 'Prayer, pastoral care, and spiritual healing alongside medical treatment. Healing the whole person — body, soul, and spirit.' },
              { icon: '🌿', title: 'Hope Holistic Clinic',  desc: 'Marital counselling, career guidance, family therapy, and complete wholistic wellbeing — because health is more than the physical.' },
              { icon: '🚐', title: 'Hope Mobile Clinic',    desc: '23 campaigns, 15,726 patients reached. Field outreach brings healthcare to the most remote villages and underserved communities.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#D4A017] text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h3>
                <p className="text-white/65 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Clock className="w-8 h-8 text-[#1B3A6B] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-[#1A1A2E]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Working Hours
            </h2>
          </div>
          <div className="space-y-2">
            {schedule.map(({ days, hours, emg }) => (
              <div key={days}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  emg
                    ? 'bg-[#C8102E]/5 border-[#C8102E]/30'
                    : 'bg-[#F8FAFF] border-[#D1DCF5] hover:border-[#1B3A6B]/30'
                }`}>
                <span className={`font-medium text-sm ${emg ? 'text-[#C8102E]' : 'text-[#1A1A2E]'}`}>{days}</span>
                <span className={`font-bold text-sm ${emg ? 'text-[#C8102E]' : 'text-[#D4A017]'}`}>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#D4A017] text-[#1B3A6B] text-center">
        <h2 className="text-3xl font-bold mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Need Medical Care?
        </h2>
        <p className="text-[#1B3A6B]/80 mb-6">Our dedicated team is ready to help you today.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/booking"
            className="bg-[#1B3A6B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0F2347] transition-colors">
            Book Appointment
          </Link>
          <a href="tel:+237650441422"
            className="border-2 border-[#1B3A6B] text-[#1B3A6B] px-8 py-3 rounded-xl font-bold hover:bg-[#1B3A6B]/10 transition-colors">
            Call +237 650 441 422
          </a>
        </div>
      </section>
    </div>
  );
}
