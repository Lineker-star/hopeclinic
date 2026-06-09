'use client';
import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, Calendar, Globe, Award, GraduationCap,
  Phone, Mail, Trophy, BookOpen, ArrowRight,
  BadgeCheck, ArrowLeft, ExternalLink,
} from 'lucide-react';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface Education    { degree: string; institution: string; year: string; description?: string }
interface Certification { name: string; issuing_body: string; year: string }
interface Achievement  { title: string; description: string; year?: string }
interface Publication  { title: string; journal: string; year: string; url?: string }

interface DoctorProfile {
  id: string;
  name: string;
  title_prefix: string;
  role?: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  experience_years?: number;
  languages?: string[];
  available_days?: string[];
  is_featured?: boolean;
  email?: string;
  phone?: string;
  rating?: number;
  review_count?: number;
  consultation_fee?: number;
  education?: Education[];
  certifications?: Certification[];
  achievements?: Achievement[];
  publications?: Publication[];
}

function Skeleton() {
  return (
    <div className="animate-pulse min-h-screen bg-[#F8FAFF]">
      <div className="bg-[#0F2340] h-72" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="h-48 bg-[#D1DCF5] rounded-2xl" />
            <div className="h-5 bg-[#D1DCF5] rounded w-3/4" />
            <div className="h-4 bg-[#D1DCF5] rounded w-1/2" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 bg-[#D1DCF5] rounded-2xl" />
            <div className="h-48 bg-[#D1DCF5] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#F8FAFF]">
      <div className="w-16 h-16 rounded-full bg-[#EBF0FB] flex items-center justify-center mb-4">
        <Award className="w-8 h-8 text-[#D1DCF5]" />
      </div>
      <h1 className="text-2xl font-bold text-[#0F2340] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Doctor Not Found
      </h1>
      <p className="text-[#8896B3] mb-6">This profile doesn&apos;t exist or has been removed.</p>
      <Link href="/doctors"
        className="flex items-center gap-2 bg-[#0F2340] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1B3A6B] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Doctors
      </Link>
    </div>
  );
}

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();

  const fetchDoctor = useCallback(async (): Promise<DoctorProfile | null> => {
    try {
      const res = await fetch(`/api/admin/doctors/${id}`);
      if (res.ok) return res.json() as Promise<DoctorProfile>;
    } catch { /* fallthrough */ }
    return null;
  }, [id]);

  const { data: doctor, loading } = useSupabaseRealtime<DoctorProfile | null>(
    'doctors', fetchDoctor, null, `id=eq.${id}`,
  );

  if (loading) return <Skeleton />;
  if (!doctor) return <NotFound />;

  const prefix   = doctor.title_prefix ?? 'Dr.';
  const fullName = `${prefix} ${doctor.name}`;
  const rating   = doctor.rating ?? 5.0;
  const revCount = doctor.review_count ?? 0;
  const langs    = doctor.languages ?? [];
  const days     = doctor.available_days ?? [];
  const edu      = doctor.education ?? [];
  const certs    = doctor.certifications ?? [];
  const achvs    = doctor.achievements ?? [];
  const pubs     = doctor.publications ?? [];
  const fee      = doctor.consultation_fee ?? 0;

  return (
    <div className="bg-[#F8FAFF] min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8EEF8] py-2.5">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm text-[#8896B3]">
          <Link href="/" className="hover:text-[#0F2340]">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#0F2340]">Doctors</Link>
          <span>/</span>
          <span className="text-[#0F2340] font-medium">{fullName}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="bg-[#0F2340] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">

            {/* Photo */}
            <div className="w-44 h-52 sm:w-52 sm:h-60 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-[#1B3A6B]">
              {doctor.image_url ? (
                <Image src={doctor.image_url} alt={fullName} width={208} height={240}
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">👤</div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-white text-center sm:text-left">
              {doctor.is_featured && (
                <span className="inline-flex items-center gap-1 bg-[#D4A017] text-[#0F2340] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <Star className="w-3 h-3 fill-current" /> Featured Specialist
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {fullName}
              </h1>
              {doctor.specialization && (
                <p className="text-[#D4A017] font-semibold text-lg mb-0.5">{doctor.specialization}</p>
              )}
              {doctor.role && (
                <p className="text-white/60 text-sm mb-3">{doctor.role}</p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-[#D4A017] fill-[#D4A017]' : 'text-white/30'}`} />
                  ))}
                </div>
                <span className="text-white/80 text-sm font-semibold">{rating.toFixed(1)}</span>
                {revCount > 0 && <span className="text-white/50 text-sm">· {revCount} reviews</span>}
              </div>

              {/* Languages */}
              {langs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-3">
                  {langs.map(l => (
                    <span key={l} className="flex items-center gap-1 text-xs bg-white/10 border border-white/20 text-white/90 px-2.5 py-1 rounded-full">
                      <Globe className="w-3 h-3" /> {l}
                    </span>
                  ))}
                </div>
              )}

              {/* Available days */}
              {days.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-5">
                  {days.map(d => (
                    <span key={d} className="flex items-center gap-1 text-xs bg-green-500/20 border border-green-400/30 text-green-300 px-2.5 py-1 rounded-full">
                      <Calendar className="w-3 h-3" /> {d.slice(0, 3)}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <Link href="/contact"
                  className="flex items-center gap-2 bg-[#D4A017] text-[#0F2340] px-6 py-2.5 rounded-xl font-bold hover:bg-[#F5C842] transition-colors">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact"
                  className="flex items-center gap-2 border-2 border-white/40 text-white px-6 py-2.5 rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-colors">
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: bio */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EEF8]">
              <h2 className="text-2xl font-bold text-[#0F2340] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                About {fullName}
              </h2>
              {doctor.bio ? (
                <p className="text-[#4A5568] leading-relaxed">{doctor.bio}</p>
              ) : (
                <p className="text-[#8896B3] italic">Biography coming soon.</p>
              )}
              {fee > 0 && (
                <div className="mt-5 pt-5 border-t border-[#E8EEF8] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0F2340] font-bold text-xs">XAF</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#8896B3] font-medium">Consultation Fee</p>
                    <p className="text-[#0F2340] font-bold">{fee.toLocaleString()} XAF</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: quick info */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EEF8]">
              <h3 className="font-bold text-[#0F2340] mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Quick Info
              </h3>
              <div className="space-y-4">
                {doctor.specialization && (
                  <InfoRow icon={<span className="text-sm">🏥</span>} label="Specialty" value={doctor.specialization} />
                )}
                {doctor.experience_years != null && (
                  <InfoRow icon={<Award className="w-4 h-4 text-[#0F2340]" />} label="Experience" value={`${doctor.experience_years}+ years`} />
                )}
                {langs.length > 0 && (
                  <InfoRow icon={<Globe className="w-4 h-4 text-[#0F2340]" />} label="Languages" value={langs.join(', ')} />
                )}
                {doctor.email && (
                  <InfoRow icon={<Mail className="w-4 h-4 text-[#0F2340]" />} label="Email"
                    value={<a href={`mailto:${doctor.email}`} className="text-[#1B3A6B] hover:underline">{doctor.email}</a>} />
                )}
                {doctor.phone && (
                  <InfoRow icon={<Phone className="w-4 h-4 text-[#0F2340]" />} label="Phone"
                    value={<a href={`tel:${doctor.phone}`} className="text-[#1B3A6B] hover:underline">{doctor.phone}</a>} />
                )}
                {doctor.is_featured && (
                  <div className="flex items-center gap-2 pt-2 border-t border-[#E8EEF8]">
                    <BadgeCheck className="w-5 h-5 text-[#D4A017]" />
                    <span className="text-[#D4A017] font-semibold text-sm">Featured Specialist</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EEF8]">
          <h2 className="text-2xl font-bold text-[#0F2340] mb-6 flex items-center gap-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <GraduationCap className="w-6 h-6 text-[#D4A017]" /> Education &amp; Training
          </h2>
          {edu.length === 0 ? (
            <p className="text-[#8896B3] italic text-sm">Education details coming soon.</p>
          ) : (
            <div className="relative pl-6 border-l-2 border-[#D1DCF5] space-y-6">
              {edu.map((e, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[1.65rem] w-4 h-4 rounded-full bg-[#0F2340] border-2 border-white shadow" />
                  <p className="text-[#8896B3] text-xs font-semibold uppercase tracking-wide mb-0.5">{e.year}</p>
                  <p className="font-bold text-[#0F2340]">{e.degree}</p>
                  <p className="text-[#4A5568] text-sm">{e.institution}</p>
                  {e.description && <p className="text-[#8896B3] text-sm mt-1">{e.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      {certs.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EEF8]">
            <h2 className="text-2xl font-bold text-[#0F2340] mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <BadgeCheck className="w-6 h-6 text-[#D4A017]" /> Certifications
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certs.map((c, i) => (
                <div key={i} className="bg-[#F8FAFF] rounded-xl p-4 border border-[#E8EEF8]">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF0FB] flex items-center justify-center mb-3">
                    <BadgeCheck className="w-4 h-4 text-[#0F2340]" />
                  </div>
                  <p className="font-bold text-[#0F2340] text-sm mb-0.5">{c.name}</p>
                  <p className="text-[#4A5568] text-xs">{c.issuing_body}</p>
                  <p className="text-[#8896B3] text-xs mt-1">{c.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ACHIEVEMENTS ── */}
      {achvs.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EEF8]">
            <h2 className="text-2xl font-bold text-[#0F2340] mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <Trophy className="w-6 h-6 text-[#D4A017]" /> Achievements
            </h2>
            <div className="space-y-3">
              {achvs.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F8FAFF] rounded-xl border border-[#E8EEF8]">
                  <div className="w-8 h-8 rounded-full bg-[#D4A017]/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4 h-4 text-[#D4A017]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2340] text-sm">{a.title}</p>
                    {a.year && <p className="text-[#8896B3] text-xs">{a.year}</p>}
                    <p className="text-[#4A5568] text-sm mt-0.5">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PUBLICATIONS ── */}
      {pubs.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EEF8]">
            <h2 className="text-2xl font-bold text-[#0F2340] mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <BookOpen className="w-6 h-6 text-[#D4A017]" /> Publications
            </h2>
            <div className="space-y-3">
              {pubs.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F8FAFF] rounded-xl border border-[#E8EEF8]">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF0FB] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#0F2340]">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F2340] text-sm">{p.title}</p>
                    <p className="text-[#4A5568] text-xs mt-0.5">{p.journal} · {p.year}</p>
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-[#EBF0FB] text-[#1B3A6B]">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOK CTA ── */}
      <section className="bg-[#0F2340] py-14 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">Ready to Get Started?</p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Schedule a Consultation with {fullName}
          </h2>
          <p className="text-white/70 mb-7">
            Book an appointment today and take the first step toward better health.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#D4A017] text-[#0F2340] px-8 py-3.5 rounded-xl font-bold hover:bg-[#F5C842] transition-colors text-lg">
            Book Appointment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function InfoRow({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#8896B3]">{label}</p>
        <p className="text-[#0F2340] font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}
