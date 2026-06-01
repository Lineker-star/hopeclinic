'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/',                    label: 'Home' },
  { href: '/about',               label: 'About' },
  { href: '/services',            label: 'Services' },
  { href: '/doctors',             label: 'Doctors' },
  { href: '/staff',               label: 'Staff' },
  { href: '/blog',                label: 'Blog' },
  { href: '/hope-clinics-network',label: 'Network' },
  { href: '/gallery',             label: 'Gallery' },
  { href: '/contact',             label: 'Contact' },
];

const languages = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'zh', label: '中文',       flag: '🇨🇳' },
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'ko', label: '한국어',     flag: '🇰🇷' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
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
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1B3A6B] shadow-lg'
          : 'bg-[#1B3A6B]/95 backdrop-blur-sm'
      }`}
      style={{ top: '36px' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5">
              <Image
                src="/images/Hope_Clinic_logo.jpg"
                alt="Hope Clinic Koumé"
                fill className="object-contain" sizes="40px"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-white text-sm leading-tight tracking-wide"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                HOPE CLINIC
              </div>
              <div className="text-[#D4A017] text-[10px] leading-tight font-semibold tracking-widest">
                KOUMÉ — CMFI
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(href)
                    ? 'text-[#D4A017] bg-white/10'
                    : 'text-white/85 hover:text-[#D4A017] hover:bg-white/10'
                }`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-white/70 hover:text-[#D4A017] transition-colors px-2 py-1.5 rounded-md hover:bg-white/10"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#D1DCF5] rounded-lg shadow-xl py-1 w-44 z-50">
                  {languages.map((lang) => (
                    <button key={lang.code}
                      onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[#EBF0FB] transition-colors ${
                        currentLang.code === lang.code ? 'text-[#1B3A6B] font-bold' : 'text-[#2D2D2D]'
                      }`}>
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book CTA */}
            <Link href="/booking"
              className="hidden md:flex items-center gap-1 bg-[#D4A017] text-[#1B3A6B] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F5C842] transition-colors shadow-md">
              Book Appointment
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 bg-[#1B3A6B]">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(href) ? 'text-[#D4A017] bg-white/10' : 'text-white/85 hover:text-[#D4A017] hover:bg-white/10'
                }`}>
                {label}
              </Link>
            ))}
            <div className="px-4 pt-3 pb-1 border-t border-white/10 mt-2">
              <Link href="/booking" onClick={() => setMobileOpen(false)}
                className="w-full block text-center bg-[#D4A017] text-[#1B3A6B] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#F5C842] transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>

      {langOpen && <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />}
    </header>
  );
}
