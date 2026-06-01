import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';

export default function CTABooking() {
  return (
    <section
      className="relative py-24 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-[#C8102E]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/30">
          Healthcare for Everyone
        </span>
        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Book Your Appointment Today
        </h2>
        <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
          Take the first step towards better health. Our team of dedicated professionals
          is ready to care for you with compassion and excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#C8102E] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#F9F6F1] transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Book Now Online
          </Link>
          <a
            href="tel:+237650441422"
            className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white border-2 border-white/40 px-8 py-4 rounded-xl font-bold text-base hover:bg-white/25 transition-all"
          >
            <Phone className="w-5 h-5" />
            Call +237 650 441 422
          </a>
        </div>

        <p className="text-white/60 text-sm">
          * Registration required to book appointments online
        </p>
      </div>
    </section>
  );
}
