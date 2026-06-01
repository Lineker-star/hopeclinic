'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-[#F9F6F1] african-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Patient Stories</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            What Our Patients Say
          </h2>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#C8102E]/10" />

            {/* Stars */}
            <div className="flex gap-1 mb-4 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4A017] fill-[#D4A017]" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#2D2D2D] text-lg leading-relaxed text-center mb-6 italic">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C8102E]">
                <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                <p className="text-[#9A9A9A] text-sm">{t.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-[#C8102E] flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-[#C8102E] w-6' : 'bg-[#E5E1DC]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-[#C8102E] flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
