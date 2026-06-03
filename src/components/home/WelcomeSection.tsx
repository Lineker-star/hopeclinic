'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Scissors, FlaskConical, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '@/lib/animations';

const highlights = [
  { icon: Phone,        label: '24/7 Emergency Care' },
  { icon: Scissors,     label: 'Surgical Procedures' },
  { icon: FlaskConical, label: 'Advanced Diagnostics' },
  { icon: Shield,       label: 'Compassionate Care' },
];

export default function WelcomeSection() {
  return (
    <section className="py-20 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <motion.div
            variants={fadeInLeft} initial="initial" whileInView="animate" viewport={viewportOnce}
            className="relative">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
                alt="Hope Clinic Koumé — Quality Healthcare"
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2340]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-4 border-l-4 border-[#0F2340]">
              <p className="text-[#0F2340] font-bold text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Est. 2015</p>
              <p className="text-[#4A5568] text-xs font-medium">Hope Clinic Koumé</p>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#D4A017]/20 border-2 border-[#D4A017]/30" />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeInRight} initial="initial" whileInView="animate" viewport={viewportOnce}>
            <span className="text-[#0F2340] font-semibold text-sm uppercase tracking-widest">Since 2015</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 mb-1 gold-underline"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Welcome to Hope Clinic Koumé
            </h2>
            <p className="text-[#D4A017] font-medium mt-4 mb-4 italic text-base">
              Quality Medical Care for Optimal Health
            </p>
            <p className="text-[#4A5568] leading-relaxed mb-4">
              At Hope Clinic, we are dedicated to providing quality medical care in a modern and innovative setting.
              From our modern facilities to our expert medical staff, we strive to offer our patients the highest
              quality of care and a comfortable healing environment.
            </p>
            <p className="text-[#4A5568] leading-relaxed mb-6">
              Under the Mercy Works Department of CMFI and the vision of the Zacharias Tanee Fomum Foundation,
              Hope Clinic Koumé has grown to serve 800+ patients monthly across 4 modern pavilions with 87
              dedicated staff.
            </p>

            <motion.div
              variants={staggerContainer} initial="initial" whileInView="animate" viewport={viewportOnce}
              className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map(({ icon: Icon, label }) => (
                <motion.div key={label} variants={fadeInLeft}
                  className="flex items-center gap-2.5 bg-white rounded-lg p-3 shadow-sm border border-[#D1DCF5]">
                  <div className="w-8 h-8 rounded-full bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#0F2340]" />
                  </div>
                  <span className="text-[#1A1A2E] text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/about"
                className="inline-flex items-center gap-2 bg-[#0F2340] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1B3A6B] transition-colors">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[#8896B3] text-sm italic">— Dr. Ginette Bekolo, Director</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
