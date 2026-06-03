'use client';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function CTABooking() {
  return (
    <section
      className="relative py-24 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-[#0F2340]/88" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} transition={{ duration: 0.6 }}>
          <span className="inline-block bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-[#D4A017]/30">
            Healthcare for Everyone
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Book Your Appointment Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards better health. Our dedicated team is ready to care for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-[#D4A017] text-[#0F2340] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#F5C842] transition-all shadow-lg hover:scale-105">
              <Calendar className="w-5 h-5" /> Book Now Online
            </Link>
            <a href="tel:+237650441422"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all">
              <Phone className="w-5 h-5" /> Call +237 650 441 422
            </a>
          </div>
          <p className="text-white/50 text-sm">* Registration required to book appointments online</p>
        </motion.div>
      </div>
    </section>
  );
}
