'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Slideshow */}
      {heroImages.map((img, i) => (
        <div key={img} className="absolute inset-0 transition-opacity duration-1500"
          style={{ opacity: i === current ? 1 : 0 }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
        </div>
      ))}

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/80 via-[#1B3A6B]/60 to-[#0F2347]/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20
            rounded-full px-4 py-1.5 text-sm font-medium mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
          <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse inline-block" />
          CMFI Mercy Works — Hope Clinic Koumé
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight
            transition-all duration-700 delay-100"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)'
          }}>
          Quality Medical Care<br />
          <span className="text-[#D4A017] italic">at Our Modern Clinic</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto
            transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
          With our modern facilities and skilled medical staff, we aim to provide our patients
          with quality care in a comfortable and healing environment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
          <Link href="/booking"
            className="bg-[#D4A017] text-[#1B3A6B] px-8 py-3.5 rounded-xl font-bold text-base
              hover:bg-[#F5C842] transition-all shadow-lg hover:shadow-xl hover:scale-105
              inline-flex items-center justify-center gap-2">
            Book Appointment
          </Link>
          <Link href="/services"
            className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5
              rounded-xl font-semibold text-base hover:bg-white/25 transition-all
              inline-flex items-center justify-center gap-2">
            View Our Services
          </Link>
        </div>

        {/* Emergency callout */}
        <div className="mt-8 transition-all duration-700 delay-500"
          style={{ opacity: visible ? 1 : 0 }}>
          <a href="tel:+237650441422"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <span className="flex items-center gap-1.5 bg-[#C8102E]/20 border border-[#C8102E]/40 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
              <Phone className="w-3 h-3 text-[#C8102E]" />
              <span className="text-[#C8102E] font-semibold text-xs">Emergency 24/7: +237 650 441 422</span>
            </span>
          </a>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'bg-[#D4A017] w-6' : 'bg-white/50 w-2'}`} />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 text-xs">
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="#F8FAFF" />
        </svg>
      </div>
    </section>
  );
}
