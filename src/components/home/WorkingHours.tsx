import Link from 'next/link';
import { Clock, AlertTriangle } from 'lucide-react';

// A6: Mon–Sat 8am–5pm | Emergency 24/7
const schedule = [
  { days: 'Monday – Friday',    hours: '08:00 AM – 05:00 PM', emergency: false },
  { days: 'Saturday',           hours: '08:00 AM – 05:00 PM', emergency: false },
  { days: 'Sunday',             hours: 'Closed',              emergency: false },
  { days: 'Emergency (All Days)', hours: '24/7 Available',    emergency: true  },
];

export default function WorkingHours() {
  return (
    <section className="relative py-20 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-[#081525]/90" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Opening Times</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Working Hours
            </h2>
            <p className="text-white/70 mb-4">
              Onsite consultations: <strong className="text-white">Monday – Saturday, 8:00 AM – 5:00 PM</strong>
            </p>
            <div className="flex items-center gap-3 p-4 bg-[#C8102E]/15 border border-[#C8102E]/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[#C8102E] flex-shrink-0" />
              <p className="text-sm text-white/90">
                <strong className="text-white">Emergency services available 24/7</strong>
                {' '}— Call +237 650 441 422
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {schedule.map(({ days, hours, emergency }) => (
              <div key={days}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  emergency
                    ? 'bg-[#C8102E]/15 border border-[#C8102E]/40'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${emergency ? 'bg-[#C8102E] animate-pulse' : 'bg-[#D4A017]'}`} />
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className="text-white/85 font-medium text-sm">{days}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold text-sm ${emergency ? 'text-[#C8102E]' : 'text-[#D4A017]'}`}>{hours}</span>
                  <Link href="/booking"
                    className="hidden sm:inline-flex text-xs bg-[#0F2340] text-white px-3 py-1.5 rounded-lg hover:bg-[#1B3A6B] transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
