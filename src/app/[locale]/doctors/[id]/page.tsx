import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { doctors } from '@/data/doctors';
import { Star, Calendar, Globe, Award, ArrowRight, GraduationCap, Clock } from 'lucide-react';

type Props = { params: Promise<{ id: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) return { title: 'Doctor Not Found' };
  return {
    title: `${doctor.titlePrefix} ${doctor.name} — ${doctor.specialization}`,
    description: doctor.bio.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function DoctorProfilePage({ params }: Props) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) notFound();

  return (
    <div className="bg-[#F9F6F1]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E1DC] py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-[#9A9A9A]">
          <Link href="/" className="hover:text-[#C8102E]">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#C8102E]">Doctors</Link>
          <span>/</span>
          <span className="text-[#C8102E]">{doctor.titlePrefix} {doctor.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Profile card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg sticky top-28">
              <div className="relative h-72">
                <Image
                  src={doctor.imageUrl}
                  alt={`${doctor.titlePrefix} ${doctor.name}`}
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h1 className="font-bold text-2xl leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {doctor.titlePrefix} {doctor.name}
                  </h1>
                  <p className="text-[#D4A017] text-sm font-medium mt-0.5">{doctor.specialization}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />)}
                  <span className="text-[#5A5A5A] text-sm ml-1">(5.0)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F9F6F1] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-[#C8102E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {doctor.experience}+
                    </div>
                    <div className="text-[#9A9A9A] text-xs">Years Exp.</div>
                  </div>
                  <div className="bg-[#F9F6F1] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-[#C8102E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {doctor.availableDays.length}
                    </div>
                    <div className="text-[#9A9A9A] text-xs">Days/Week</div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-[#4A4A4A] font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#C8102E]" /> Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.languages.map((l) => (
                      <span key={l} className="text-xs px-2.5 py-0.5 bg-[#C8102E]/10 text-[#C8102E] rounded-full">{l}</span>
                    ))}
                  </div>
                </div>

                {/* Available days */}
                <div>
                  <p className="text-[#4A4A4A] font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#C8102E]" /> Available Days
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.availableDays.map((day) => (
                      <span key={day} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-full">{day}</span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="w-full block text-center bg-[#C8102E] text-white py-3 rounded-xl font-bold hover:bg-[#8B0000] transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                About {doctor.titlePrefix} {doctor.name}
              </h2>
              <p className="text-[#5A5A5A] leading-relaxed">{doctor.bio}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <GraduationCap className="w-6 h-6 text-[#C8102E]" /> Education & Qualifications
              </h2>
              <ul className="space-y-3">
                {doctor.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#C8102E] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[#5A5A5A]">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <Clock className="w-6 h-6 text-[#C8102E]" /> Consultation Hours
              </h2>
              <p className="text-[#5A5A5A] mb-4">
                {doctor.titlePrefix} {doctor.name} is available for consultations on the following days:
              </p>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                  const available = doctor.availableDays.includes(day);
                  return (
                    <div key={day} className="flex items-center justify-between p-3 bg-[#F9F6F1] rounded-lg">
                      <span className="font-medium text-[#2D2D2D]">{day}</span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {available ? '8:00 AM – 4:00 PM' : 'Not Available'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#C8102E] rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Book a Consultation
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Ready to see {doctor.titlePrefix} {doctor.name}? Book your appointment today.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-white text-[#C8102E] px-6 py-2.5 rounded-lg font-bold hover:bg-[#F9F6F1] transition-colors"
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
