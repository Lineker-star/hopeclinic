'use client';
import { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function EmergencyFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp button */}
      {expanded && (
        <a
          href="https://wa.me/237650441422?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-sm hover:bg-[#128C7E] transition-all animate-fade-in"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      )}

      {/* Emergency call */}
      {expanded && (
        <a
          href="tel:+237650441422"
          className="flex items-center gap-2 bg-[#C8102E] text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-sm hover:bg-[#8B0000] transition-all animate-fade-in"
        >
          <Phone className="w-4 h-4" />
          Emergency: +237 650 441 422
        </a>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 ${
          expanded ? 'bg-[#2D2D2D] rotate-180' : 'bg-[#C8102E] animate-bounce-slow'
        }`}
        aria-label="Emergency contact"
      >
        {expanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Phone className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Pulse ring */}
      {!expanded && (
        <span className="absolute inset-0 rounded-full bg-[#C8102E]/30 animate-ping" />
      )}
    </div>
  );
}
