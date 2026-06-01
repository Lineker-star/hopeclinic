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
    <section className="py-20 bg-[#F0F4FF] african-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Patient Stories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            What Our Patients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative border-t-4 border-[#1B3A6B]">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#1B3A6B]/10" />

            <div className="flex gap-1 mb-4 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4A017] fill-[#D4A017]" />
              ))}
            </div>

            <p className="text-[#2D2D2D] text-lg leading-relaxed text-center mb-6 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#1B3A6B]">
                <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E]">{t.name}</p>
                <p className="text-[#8896B3] text-sm">{t.location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-[#1B3A6B] flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'bg-[#1B3A6B] w-6' : 'bg-[#D1DCF5] w-2'}`} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-full border-2 border-[#1B3A6B] flex items-center justify-center text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
