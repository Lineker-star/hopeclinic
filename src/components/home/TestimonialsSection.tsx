'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import { testimonials as seedTestimonials } from '@/data/testimonials';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface TestimonialRow {
  id: string;
  patient_name?: string; name?: string;
  patient_location?: string; location?: string;
  content?: string; text?: string;
  rating: number;
  image_url?: string; imageUrl?: string;
}

const seedFallback: TestimonialRow[] = seedTestimonials.map(t => ({
  id: t.id, name: t.name, location: t.location,
  text: t.text, rating: t.rating, imageUrl: t.imageUrl,
}));

export default function TestimonialsSection() {
  const { data: rows } = useSupabaseData<TestimonialRow>('testimonials', {
    filter: { is_active: true },
    orderBy: 'order_index',
    fallback: seedFallback,
    realtimeTable: 'testimonials',
  });

  const [current, setCurrent] = useState(0);
  const safe = current >= rows.length ? 0 : current;
  const prev = () => setCurrent((c) => (c - 1 + rows.length) % rows.length);
  const next = () => setCurrent((c) => (c + 1) % rows.length);
  const row  = rows[safe];
  const t = {
    name:     row?.patient_name  ?? row?.name     ?? '',
    location: row?.patient_location ?? row?.location ?? '',
    text:     row?.content       ?? row?.text     ?? '',
    rating:   row?.rating        ?? 5,
    imageUrl: row?.image_url     ?? row?.imageUrl ?? '',
  };

  return (
    <section className="py-20 bg-[#F0F4FF] african-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} className="text-center mb-12">
          <span className="text-[#0F2340] font-semibold text-sm uppercase tracking-widest">Patient Stories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            What Our Patients Say
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 relative border-t-4 border-[#0F2340]">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#0F2340]/10" />
            <div className="flex gap-1 mb-4 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4A017] fill-[#D4A017]" />
              ))}
            </div>
            <p className="text-[#2D2D2D] text-lg leading-relaxed text-center mb-6 italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#0F2340]">
                <Image src={t.imageUrl} alt={t.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E]">{t.name}</p>
                <p className="text-[#8896B3] text-sm">{t.location}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-[#0F2340] flex items-center justify-center text-[#0F2340] hover:bg-[#0F2340] hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {rows.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === safe ? 'bg-[#0F2340] w-6' : 'bg-[#D1DCF5] w-2'}`} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-full border-2 border-[#0F2340] flex items-center justify-center text-[#0F2340] hover:bg-[#0F2340] hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
