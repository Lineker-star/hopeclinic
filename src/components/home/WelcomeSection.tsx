'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Phone, Scissors, FlaskConical, ArrowRight } from 'lucide-react';

const highlights = [
  { icon: Phone, label: '24/7 Emergency Care' },
  { icon: Scissors, label: 'Surgical Procedures' },
  { icon: FlaskConical, label: 'Advanced Diagnostics' },
];

export default function WelcomeSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div
            className="relative transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)' }}
          >
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
                alt="Hope Clinic Koumé — Quality Healthcare"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-4 border-l-4 border-[#C8102E]">
              <p className="text-[#C8102E] font-bold text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Est. 2015
              </p>
              <p className="text-[#5A5A5A] text-xs font-medium">Hope Clinic Koumé</p>
            </div>

            {/* African decorative element */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#D4A017]/20 border-2 border-[#D4A017]/30" />
          </div>

          {/* Text */}
          <div
            className="transition-all duration-700 delay-150"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-12 bg-[#C8102E] rounded-full" />
              <div>
                <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">
                  Since 2015
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Welcome to Hope Clinic Koumé
                </h2>
              </div>
            </div>

            <p className="text-[#D4A017] font-medium mb-4 italic">
              A Christian Healing Ministry in the Heart of Cameroon
            </p>

            <p className="text-[#5A5A5A] leading-relaxed mb-6">
              Hope Clinic Koumé is a compassionate medical facility founded on Christian values, delivering quality
              healthcare to all people regardless of their means. Located in Koumé-Bonis, Bertoua, East Region of
              Cameroon, we serve as a beacon of hope and healing for our community and the region.
            </p>

            <p className="text-[#5A5A5A] leading-relaxed mb-8">
              Under the Mercy Works Department of CMFI and the vision of the Zacharias Tanee Fomum Foundation,
              we manifest God's Kingdom through compassionate, quality healthcare for every soul.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 bg-white rounded-lg p-3 shadow-sm border border-[#E5E1DC]">
                  <div className="w-8 h-8 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#C8102E]" />
                  </div>
                  <span className="text-[#2D2D2D] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[#9A9A9A] text-sm italic">
                — Dr. Ginette Bekolo, Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
