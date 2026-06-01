'use client';
import { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function EmergencyFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <a href="https://wa.me/237650441422?text=Hello%2C%20I%20need%20medical%20assistance"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-sm hover:bg-[#128C7E] transition-all">
          <MessageCircle className="w-4 h-4" /> WhatsApp Us
        </a>
      )}
      {expanded && (
        <a href="tel:+237650441422"
          className="flex items-center gap-2 bg-[#C8102E] text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-sm hover:bg-[#8B0000] transition-all">
          <Phone className="w-4 h-4" /> +237 650 441 422
        </a>
      )}

      <div className="relative">
        <button onClick={() => setExpanded(!expanded)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 ${
            expanded ? 'bg-[#1B3A6B]' : 'bg-[#C8102E]'
          }`}
          aria-label="Emergency contact">
          {expanded ? <X className="w-6 h-6 text-white" /> : <Phone className="w-6 h-6 text-white" />}
        </button>
        {!expanded && (
          <span className="absolute inset-0 rounded-full bg-[#C8102E]/30 animate-ping" />
        )}
      </div>
    </div>
  );
}
