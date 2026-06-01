'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, AlertTriangle, Activity, Scissors, Baby, Heart, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  AlertTriangle, Activity, Scissors, Baby, Heart, Users,
};

const featuredDepts = [
  { slug: 'emergency', name: 'Emergency Care', description: '24/7 staffed emergency unit with triage, resuscitation, and rapid response teams.', iconName: 'AlertTriangle', imageUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop', color: '#DC2626' },
  { slug: 'icu', name: 'Intensive Care Unit', description: 'Critical care facility with ventilator support and continuous specialist monitoring.', iconName: 'Activity', imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop', color: '#7C3AED' },
  { slug: 'surgery', name: 'Surgical Procedures', description: 'General surgery, caesarean sections, and minimally invasive surgical procedures.', iconName: 'Scissors', imageUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop', color: '#2563EB' },
  { slug: 'pediatrics', name: 'Pediatrics', description: 'Child health, vaccinations, neonatal care, and specialized pediatric consultations.', iconName: 'Baby', imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop', color: '#F59E0B' },
  { slug: 'cardiology', name: 'Cardiology', description: 'Heart diagnostics, ECG, cardiac monitoring, and cardiovascular health management.', iconName: 'Heart', imageUrl: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&auto=format&fit=crop', color: '#EF4444' },
  { slug: 'gynecology', name: 'Gynecology & Obstetrics', description: 'Prenatal care, safe delivery, postnatal care, and comprehensive women\'s health.', iconName: 'Users', imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop', color: '#EC4899' },
];

export default function DepartmentsGrid() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Our Departments
          </h2>
          <p className="text-[#5A5A5A] mt-3 max-w-xl mx-auto">
            Comprehensive healthcare services under one roof — delivered with excellence and compassion
          </p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepts.map((dept, i) => {
            const Icon = iconMap[dept.iconName] || AlertTriangle;
            return (
              <div
                key={dept.slug}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${i * 80}ms`,
                  transitionDuration: '600ms'
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dept.imageUrl}
                    alt={dept.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ backgroundColor: dept.color }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${dept.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: dept.color }} />
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] text-base group-hover:text-[#C8102E] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed mb-3">{dept.description}</p>
                  <Link
                    href={`/services#${dept.slug}`}
                    className="inline-flex items-center gap-1 text-[#C8102E] text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-[#C8102E] text-[#C8102E] px-8 py-3 rounded-xl font-semibold hover:bg-[#C8102E] hover:text-white transition-all"
          >
            View All 15 Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
