import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Heart, ExternalLink } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const quickLinks = [
  { href: '/',                     label: 'Home' },
  { href: '/about',                label: 'About Us' },
  { href: '/services',             label: 'Services' },
  { href: '/doctors',              label: 'Our Doctors' },
  { href: '/staff',                label: 'Our Staff' },
  { href: '/hope-clinics-network', label: 'Our Network' },
  { href: '/gallery',              label: 'Gallery' },
  { href: '/blog',                 label: 'Blog' },
  { href: '/contact',              label: 'Contact' },
];

const servicesList = [
  'Emergency Care', 'Intensive Care Unit', 'Surgical Procedures',
  'Pediatrics', 'Maternity & Neonatology', 'Cardiology',
  'Gynecology & Obstetrics', 'Laboratory & Diagnostics',
  'Neurology', 'Hope Spiritual Clinic', 'Hope Mobile Clinic',
];

export default function Footer() {
  return (
    <footer className="bg-[#0F2347] text-white">
      {/* Partner strip */}
      <div className="border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <span>Part of the</span>
          <a href="https://www.mercyworks.site" target="_blank" rel="noopener noreferrer"
            className="text-[#D4A017] hover:text-[#F5C842] transition-colors flex items-center gap-1 font-semibold">
            Mercy Works Department <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a href="https://www.ztffoundation.org" target="_blank" rel="noopener noreferrer"
            className="text-[#D4A017] hover:text-[#F5C842] transition-colors flex items-center gap-1 font-semibold">
            ZTF Foundation <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <span className="text-white/50">CMFI — Christian Missionary Fellowship International</span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-1 flex-shrink-0">
                <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic Koumé"
                  fill className="object-contain" sizes="48px" />
              </div>
              <div>
                <div className="font-bold text-white text-base"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  HOPE CLINIC KOUMÉ
                </div>
                <div className="text-[#D4A017] text-xs font-semibold tracking-wider">CMFI MERCY WORKS</div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Healthcare for Everyone — Healing Body, Mind &amp; Spirit.
              A Christian Healing Ministry in the Heart of Cameroon.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/', icon: FaFacebookF, label: 'Facebook' },
                { href: 'https://www.instagram.com/hopeclinickoume', icon: FaInstagram, label: 'Instagram' },
                { href: 'https://wa.me/237650441422', icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A017] hover:text-[#1B3A6B] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-[#D4A017]/40">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-white/60 hover:text-[#D4A017] text-sm transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D4A017] inline-block flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-[#D4A017]/40">
              Our Services
            </h3>
            <ul className="space-y-2">
              {servicesList.map((s) => (
                <li key={s}>
                  <Link href="/services"
                    className="text-white/60 hover:text-[#D4A017] text-sm transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/30 inline-block flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-[#D4A017]/40">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A017] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm">Quartier Koumé-Bonis, Bertoua<br />East Region, Cameroon</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
                <div>
                  <a href="tel:+237650441422" className="text-white/60 hover:text-[#D4A017] text-sm transition-colors block">+237 650 441 422</a>
                  <a href="tel:+237694866654" className="text-white/60 hover:text-[#D4A017] text-sm transition-colors block">+237 694 86 66 54</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
                <a href="mailto:info@hopeclinickoume.org" className="text-white/60 hover:text-[#D4A017] text-sm transition-colors">
                  info@hopeclinickoume.org
                </a>
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[#D4A017] text-xs font-semibold mb-1.5 uppercase tracking-wide">Working Hours</p>
                <p className="text-white/50 text-xs">Mon–Wed: 8:00 AM – 4:00 PM</p>
                <p className="text-white/50 text-xs">Thu–Fri: 8:00 AM – 3:00 PM</p>
                <p className="text-white/50 text-xs">Saturday: 8:00 AM – 1:00 PM</p>
                <p className="text-[#C8102E] text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse inline-block" />
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Hope Clinic Koumé — CMFI Mercy Works. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-[#C8102E] mx-0.5" />
            <span>for Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
