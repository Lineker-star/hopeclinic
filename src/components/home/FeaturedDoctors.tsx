'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { featuredDoctors } from '@/data/doctors';

export default function FeaturedDoctors() {
  return (
    <section className="py-20 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Meet Our Team</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Our Dedicated Doctors
          </h2>
          <p className="text-[#5A5A5A] mt-3 max-w-xl mx-auto">
            Expert medical professionals committed to your wellbeing and healing
          </p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={doctor.imageUrl}
                  alt={`${doctor.titlePrefix} ${doctor.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />

                {/* Stars */}
                <div className="absolute top-3 right-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {doctor.titlePrefix} {doctor.name}
                  </h3>
                  <p className="text-[#D4A017] text-sm font-medium">{doctor.specialization}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-600 text-xs font-medium">Available</span>
                  </div>
                  <span className="text-[#9A9A9A] text-xs">{doctor.experience}+ yrs experience</span>
                </div>

                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4 line-clamp-3">
                  {doctor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.languages.slice(0, 3).map((lang) => (
                    <span key={lang} className="text-xs px-2 py-0.5 bg-[#F2F0ED] text-[#4A4A4A] rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/doctors/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C8102E] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors"
                >
                  View Profile & Book
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#C8102E] text-[#C8102E] px-8 py-3 rounded-xl font-semibold hover:bg-[#C8102E] hover:text-white transition-all"
          >
            View All Doctors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
