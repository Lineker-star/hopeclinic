'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop',
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === currentImage ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/45 to-[#8B0000]/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse inline-block" />
          CMFI Mercy Works — Hope Clinic Koumé
        </div>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight transition-all duration-700 delay-100"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          Quality Medical Care for{' '}
          <span className="text-[#D4A017] italic">Every Soul</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/85 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          Healthcare for Everyone — Healing Body, Mind & Spirit
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <Link
            href="/booking"
            className="bg-[#C8102E] text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-[#8B0000] transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/25 transition-all inline-flex items-center justify-center gap-2"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Image dots indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentImage ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 text-xs">
        <span>Scroll to discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="#F9F6F1" />
        </svg>
      </div>
    </section>
  );
}
