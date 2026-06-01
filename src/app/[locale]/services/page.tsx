import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { departments } from '@/data/departments';
import { ArrowRight, AlertTriangle, Activity, Scissors, Baby, Heart, Users, Stethoscope, FlaskConical, Scan, Pill, HeartHandshake, Smile, BookOpen, Leaf, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore all 15 medical departments at Hope Clinic Koumé — from Emergency Care to Hope Spiritual Clinic.',
};

const iconComponents: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  AlertTriangle, Activity, Scissors, Baby, Heart, Users, Stethoscope,
  FlaskConical, Scan, Pill, HeartHandshake, Smile, BookOpen, Leaf, Truck,
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F9F6F1]">
      {/* Page Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Comprehensive Healthcare</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Services & Departments
          </h1>
          <p className="text-white/80 text-lg">15 specialized departments delivering quality care under one roof</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Services</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#C8102E] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-center">
          {[
            { n: '15', label: 'Departments' }, { n: '24/7', label: 'Emergency' },
            { n: '30,726+', label: 'Patients Served' }, { n: '6+', label: 'Specialist Doctors' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{n}</div>
              <div className="text-white/70 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = iconComponents[dept.iconName] || Heart;
            return (
              <div
                key={dept.slug}
                id={dept.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={dept.imageUrl}
                    alt={dept.name}
                    fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ backgroundColor: dept.color }} />
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow">
                      <Icon className="w-5 h-5" style={{ color: dept.color } as React.CSSProperties} />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: dept.color }} />
                    <h3 className="font-bold text-[#1A1A1A] text-lg group-hover:text-[#C8102E] transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4">{dept.description}</p>
                  <Link
                    href="/booking"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C8102E] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors"
                  >
                    Book Appointment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special departments highlight */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Beyond Medical Care
            </h2>
            <p className="text-[#5A5A5A] mt-2">Hope Clinic's unique spiritual and holistic healing pillars</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '✝️', title: 'Hope Spiritual Clinic', desc: 'Prayer ministry, pastoral care, and spiritual healing alongside medical treatment.', color: '#8B5CF6' },
              { icon: '🌿', title: 'Hope Holistic Clinic', desc: 'Marital counseling, career guidance, family therapy, and complete wellbeing support.', color: '#84CC16' },
              { icon: '🚐', title: 'Hope Mobile Clinic', desc: 'Field outreach campaigns bringing healthcare to remote villages and communities.', color: '#D97706' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-xl bg-[#F9F6F1] border-t-4" style={{ borderColor: color }}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h3>
                <p className="text-[#5A5A5A] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#C8102E] text-white text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Need Medical Care?</h2>
        <p className="text-white/80 mb-6">Our team is ready to help you. Book an appointment today.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/booking" className="bg-white text-[#C8102E] px-8 py-3 rounded-xl font-bold hover:bg-[#F9F6F1] transition-colors">
            Book Appointment
          </Link>
          <a href="tel:+237650441422" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
            Call +237 650 441 422
          </a>
        </div>
      </section>
    </div>
  );
}
