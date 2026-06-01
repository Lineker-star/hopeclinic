import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Heart } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Our Doctors' },
  { href: '/staff', label: 'Our Staff' },
  { href: '/hope-clinics-network', label: 'Our Network' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const servicesList = [
  'Emergency Care', 'Intensive Care Unit', 'Surgical Procedures',
  'Pediatrics', 'Cardiology', 'Gynecology & Obstetrics',
  'Laboratory & Diagnostics', 'Radiology & Imaging', 'Pharmacy',
  'Hope Spiritual Clinic', 'Hope Mobile Clinic',
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-1">
                <Image
                  src="/images/Hope_Clinic_logo.jpg"
                  alt="Hope Clinic Koumé"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-bold text-white text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  HOPE CLINIC KOUMÉ
                </div>
                <div className="text-[#D4A017] text-xs font-medium">CMFI MERCY WORKS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Healthcare for Everyone — Healing Body, Mind & Spirit. A Christian Healing Ministry in the Heart of Cameroon.
            </p>
            <div className="flex gap-3">
              <a href="https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2D2D2D] flex items-center justify-center hover:bg-[#C8102E] transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/hopeclinickoume" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2D2D2D] flex items-center justify-center hover:bg-[#C8102E] transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/237650441422" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2D2D2D] flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider border-b border-[#C8102E] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#C8102E] text-sm transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C8102E] inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider border-b border-[#C8102E] pb-2 inline-block">
              Our Services
            </h3>
            <ul className="space-y-2">
              {servicesList.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-gray-400 hover:text-[#C8102E] text-sm transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D4A017] inline-block" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider border-b border-[#C8102E] pb-2 inline-block">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8102E] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">Koumé-Bonis Quarter, Bertoua, East Region, Cameroon</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8102E] flex-shrink-0" />
                <a href="tel:+237650441422" className="text-gray-400 hover:text-[#C8102E] text-sm transition-colors">
                  +237 650 441 422
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8102E] flex-shrink-0" />
                <a href="mailto:info@hopeclinickoume.org" className="text-gray-400 hover:text-[#C8102E] text-sm transition-colors">
                  info@hopeclinickoume.org
                </a>
              </div>
              <div className="mt-4 p-3 bg-[#2D2D2D] rounded-lg">
                <p className="text-[#D4A017] text-xs font-semibold mb-1.5 uppercase tracking-wide">Working Hours</p>
                <p className="text-gray-400 text-xs">Mon–Wed: 8:00 AM – 4:00 PM</p>
                <p className="text-gray-400 text-xs">Thu–Fri: 8:00 AM – 3:00 PM</p>
                <p className="text-gray-400 text-xs">Saturday: 8:00 AM – 1:00 PM</p>
                <p className="text-[#C8102E] text-xs font-medium mt-1">Emergency: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Hope Clinic Koumé — CMFI Mercy Works. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              A Ministry of the{' '}
              <a href="https://www.ztffoundation.org" target="_blank" rel="noopener noreferrer"
                className="text-[#D4A017] hover:underline ml-1">ZTF Foundation</a>
            </span>
            <span>|</span>
            <a href="https://www.mercyworks.site" target="_blank" rel="noopener noreferrer"
              className="text-[#D4A017] hover:underline">Mercy Works</a>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-[#C8102E]" />
            <span>for Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
