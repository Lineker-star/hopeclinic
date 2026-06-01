'use client';
import { Phone, MessageCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1B3A6B] text-white text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse inline-block" />
          <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
          <span className="font-semibold text-white/80 hidden sm:inline">Emergency:</span>
          <a href="tel:+237650441422" className="hover:text-[#D4A017] font-bold transition-colors">
            +237 650 441 422
          </a>
          <span className="hidden md:inline text-white/50 ml-1">— Healthcare for Everyone</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-[#D4A017] transition-colors" aria-label="Facebook">
            <FaFacebookF className="w-3.5 h-3.5" />
          </a>
          <a href="https://www.instagram.com/hopeclinickoume"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-[#D4A017] transition-colors" aria-label="Instagram">
            <FaInstagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://wa.me/237650441422"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-[#D4A017] transition-colors" aria-label="WhatsApp">
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
