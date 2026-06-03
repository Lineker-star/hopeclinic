'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// African healthcare images — Unsplash free license
const heroImages = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80', // African doctor consultation
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80',   // African maternity care
  'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&q=80',// African nurse with patient
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1920&q=80',// African pediatric care
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroImages.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      {heroImages.map((img, i) => (
        <div key={img} className="absolute inset-0 transition-opacity duration-1500"
          style={{ opacity: i === current ? 1 : 0 }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }} />
        </div>
      ))}

      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2340]/85 via-[#0F2340]/65 to-[#0F2340]/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse inline-block" />
          CMFI Mercy Works — Hope Clinic Koumé
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Quality Medical Care<br />
          <span className="text-[#D4A017] italic">at Our Modern Clinic</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
          With our modern facilities and skilled medical staff, we provide quality care
          in a comfortable and healing environment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking"
            className="bg-[#D4A017] text-[#0F2340] px-8 py-3.5 rounded-xl font-bold text-base hover:bg-[#F5C842] transition-all shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2">
            Book Appointment
          </Link>
          <Link href="/services"
            className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/25 transition-all inline-flex items-center justify-center gap-2">
            View Our Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8">
          <a href="https://wa.me/237650441422?text=Emergency%20-%20I%20need%20medical%20help"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <span className="flex items-center gap-1.5 bg-[#C8102E]/20 border border-[#C8102E]/40 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
              <Phone className="w-3 h-3 text-[#C8102E]" />
              <span className="text-[#C8102E] font-semibold text-xs">Emergency 24/7: +237 650 441 422</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'bg-[#D4A017] w-6' : 'bg-white/40 w-2'}`} />
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40">
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="#F8FAFF" />
        </svg>
      </div>
    </section>
  );
}
