import { Phone, AlertCircle } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <section className="bg-[#C8102E] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Emergency? We're Here for You
              </h2>
              <p className="text-white/80 text-sm mt-0.5">
                24/7 Emergency Care — Always available for urgent medical needs
              </p>
            </div>
          </div>

          <a
            href="tel:+237650441422"
            className="flex items-center gap-3 bg-white text-[#C8102E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F9F6F1] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex-shrink-0"
          >
            <Phone className="w-5 h-5" />
            +237 650 441 422
          </a>
        </div>
      </div>
    </section>
  );
}
