import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { doctors } from '@/data/doctors';
import { Star, Calendar, Globe, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description: 'Meet the dedicated team of doctors at Hope Clinic Koumé — expert medical professionals committed to your wellbeing.',
};

export default function DoctorsPage() {
  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Expert Medical Team</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Dedicated Doctors
          </h1>
          <p className="text-white/80 text-lg">Expert medical professionals committed to healing every soul</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Doctors</span>
          </nav>
        </div>
      </div>

      {/* Doctors Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Meet Our Specialists
          </h2>
          <p className="text-[#5A5A5A] mt-2">Our team of {doctors.length} specialist physicians ready to serve you</p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={doctor.imageUrl}
                  alt={`${doctor.titlePrefix} ${doctor.name}`}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>
                <div className="absolute bottom-0 p-4 text-white w-full">
                  <h3 className="font-bold text-xl leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {doctor.titlePrefix} {doctor.name}
                  </h3>
                  <p className="text-[#D4A017] text-sm font-medium">{doctor.specialization}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-[#F9F6F1] rounded-lg p-2.5">
                    <Award className="w-4 h-4 text-[#C8102E] flex-shrink-0" />
                    <div>
                      <p className="text-[#1A1A1A] font-bold text-sm">{doctor.experience}+ yrs</p>
                      <p className="text-[#9A9A9A] text-xs">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F9F6F1] rounded-lg p-2.5">
                    <Globe className="w-4 h-4 text-[#C8102E] flex-shrink-0" />
                    <div>
                      <p className="text-[#1A1A1A] font-bold text-sm">{doctor.languages.length} langs</p>
                      <p className="text-[#9A9A9A] text-xs">Spoken</p>
                    </div>
                  </div>
                </div>

                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4 line-clamp-3">{doctor.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.availableDays.slice(0, 3).map((day) => (
                    <span key={day} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {day.slice(0, 3)}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="flex-1 text-center border-2 border-[#C8102E] text-[#C8102E] py-2.5 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/booking"
                    className="flex-1 text-center bg-[#C8102E] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#1A1A1A] text-white text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Ready to See a Doctor?</h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Book an appointment with any of our specialist doctors online, or call our emergency line 24/7.
        </p>
        <Link href="/booking" className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#8B0000] transition-colors">
          Book an Appointment <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
