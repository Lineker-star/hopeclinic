'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { featuredDoctors } from '@/data/doctors';

export default function FeaturedDoctors() {
  return (
    <section className="py-20 bg-[#F0F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="text-[#0F2340] font-semibold text-sm uppercase tracking-widest">Meet Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Dedicated Doctors
          </h2>
          <p className="text-[#4A5568] mt-5 max-w-xl mx-auto">
            Expert medical professionals committed to your wellbeing and healing
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="initial" whileInView="animate" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDoctors.map((doctor) => (
            <motion.div key={doctor.id} variants={fadeInUp}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-b-4 border-[#0F2340]">
              <div className="relative h-64 overflow-hidden bg-[#EBF0FB]">
                <Image src={doctor.imageUrl} alt={`${doctor.titlePrefix} ${doctor.name}`}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2340]/70 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {doctor.titlePrefix} {doctor.name}
                  </h3>
                  <p className="text-[#D4A017] text-sm font-medium">{doctor.specialization}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 bg-[#EBF0FB] text-[#0F2340] rounded-full font-medium">{doctor.department}</span>
                  <span className="text-[#8896B3] text-xs">{doctor.experience}+ yrs</span>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed mb-4 line-clamp-3">{doctor.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.languages.slice(0, 3).map((l) => (
                    <span key={l} className="text-xs px-2 py-0.5 bg-[#F0F4FF] text-[#4A5568] rounded-full">{l}</span>
                  ))}
                </div>
                <Link href={`/doctors/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
                  View Profile & Book <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce}
          transition={{ delay: 0.4 }} className="text-center mt-10">
          <Link href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#0F2340] text-[#0F2340] px-8 py-3 rounded-xl font-semibold hover:bg-[#0F2340] hover:text-white transition-all">
            View All Doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
