'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/staff', label: 'Staff' },
  { href: '/blog', label: 'Blog' },
  { href: '/hope-clinics-network', label: 'Network' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' || pathname === '/en' : pathname.includes(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      style={{ top: '36px' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/images/Hope_Clinic_logo.jpg"
                alt="Hope Clinic Koumé"
                fill
                className="object-contain rounded"
                sizes="40px"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[#C8102E] text-sm leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                HOPE CLINIC
              </div>
              <div className="text-[#2D2D2D] text-[10px] leading-tight font-semibold tracking-wide">
                KOUMÉ — CMFI
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(href)
                    ? 'text-[#C8102E] bg-red-50'
                    : 'text-[#2D2D2D] hover:text-[#C8102E] hover:bg-red-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors px-2 py-1.5 rounded-md hover:bg-red-50"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1 w-44 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-red-50 transition-colors ${
                        currentLang.code === lang.code ? 'text-[#C8102E] font-semibold' : 'text-[#2D2D2D]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book CTA */}
            <Link
              href="/booking"
              className="hidden md:flex items-center gap-1 bg-[#C8102E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors shadow-md"
            >
              Book Appointment
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-[#2D2D2D] hover:bg-red-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 bg-white">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-[#C8102E] bg-red-50'
                    : 'text-[#2D2D2D] hover:text-[#C8102E] hover:bg-red-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-4 pt-3 pb-1 border-t border-gray-100 mt-2">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="w-full block text-center bg-[#C8102E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#8B0000] transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close lang dropdown */}
      {langOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangOpen(false)}
        />
      )}
    </header>
  );
}
