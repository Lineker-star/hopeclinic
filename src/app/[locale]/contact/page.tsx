'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import ContactMapWrapper from '@/components/map/ContactMapWrapper';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Contact Us
          </h1>
          <p className="text-white/80">We&apos;re here to help — reach out anytime</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Contact</span>
          </nav>
        </div>
      </div>

      {/* Emergency strip */}
      <div className="bg-[#C8102E] py-3 text-white text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 animate-pulse" />
          <strong>Emergency Line (24/7):</strong>
          <a href="tel:+237650441422" className="font-bold hover:underline">+237 650 441 422</a>
        </div>
      </div>

      {/* Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Info */}
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6 gold-underline"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Find Us
            </h2>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
                <div className="w-11 h-11 rounded-xl bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#1B3A6B]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E] mb-0.5">Address</p>
                  <p className="text-[#4A5568] text-sm">
                    Hope Clinic Koumé<br />
                    Quartier Koumé-Bonis<br />
                    Bertoua, Région de l'Est<br />
                    Cameroun
                  </p>
                  <a href="https://maps.google.com/?q=4.5753,13.6856" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1B3A6B] text-xs font-semibold mt-2 hover:text-[#D4A017] transition-colors">
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
                <div className="w-11 h-11 rounded-xl bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#1B3A6B]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A2E] mb-1">Phone Numbers</p>
                  <div className="space-y-1">
                    {[
                      { n: '+237 650 441 422', label: 'Main / Emergency 24/7', emg: true },
                      { n: '+237 694 86 66 54', label: 'Alternate Line 1' },
                      { n: '+237 679 42 41 30', label: 'Alternate Line 2' },
                    ].map(({ n, label, emg }) => (
                      <div key={n}>
                        <a href={`tel:${n.replace(/\s/g, '')}`}
                          className={`font-bold text-base hover:underline transition-colors ${emg ? 'text-[#C8102E]' : 'text-[#1B3A6B]'}`}>
                          {n}
                        </a>
                        <span className="text-[#8896B3] text-xs ml-2">— {label}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://wa.me/237650441422?text=Bonjour%2C%20je%20voudrais%20plus%20d%27informations"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#128C7E] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
                <div className="w-11 h-11 rounded-xl bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#1B3A6B]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E] mb-0.5">Email</p>
                  <a href="mailto:info@hopeclinickoume.org" className="text-[#1B3A6B] hover:text-[#D4A017] text-sm transition-colors">
                    info@hopeclinickoume.org
                  </a>
                  <p className="text-[#8896B3] text-xs mt-0.5">We respond within 24 hours</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
                <div className="w-11 h-11 rounded-xl bg-[#EBF0FB] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#1B3A6B]" />
                </div>
                <div className="w-full">
                  <p className="font-semibold text-[#1A1A2E] mb-2">Working Hours</p>
                  {[
                    { days: 'Monday – Wednesday', hours: '08:00 – 16:00' },
                    { days: 'Thursday – Friday',  hours: '08:00 – 15:00' },
                    { days: 'Saturday',           hours: '08:00 – 13:00' },
                    { days: 'Sunday',             hours: 'Closed' },
                    { days: 'Emergency',          hours: '24/7', red: true },
                  ].map(({ days, hours, red }) => (
                    <div key={days} className="flex justify-between text-sm py-1.5 border-b border-[#F0F4FF] last:border-0">
                      <span className={`${red ? 'text-[#C8102E] font-semibold' : 'text-[#4A5568]'}`}>{days}</span>
                      <span className={`font-bold ${red ? 'text-[#C8102E]' : 'text-[#D4A017]'}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="p-4 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
                <p className="font-semibold text-[#1A1A2E] mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <FaFacebookF className="w-4 h-4" /> Facebook
                  </a>
                  <a href="https://www.instagram.com/hopeclinickoume"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    <FaInstagram className="w-4 h-4" /> Instagram
                  </a>
                </div>
              </div>

              {/* Legal */}
              <div className="p-4 bg-[#F0F4FF] rounded-xl border border-[#D1DCF5]">
                <p className="font-semibold text-[#1B3A6B] text-xs uppercase tracking-wide mb-2">Legal Registration</p>
                <div className="space-y-1 text-xs text-[#8896B3]">
                  <p>Arrêté de création: №3288/A/MINSANTE/SG/DOSTS/SDOS/SFSP du 28 Oct 2018</p>
                  <p>Arrêté d'ouverture: №3136/A/MINSANTE/SG/DOSTS/SDOS/SFSP du 17 Août 2020</p>
                  <p>Fondation ZTF: Déclaration n°452/ADR/JO6/APPA, Avril 21, 2010, Yaoundé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8 border border-[#D1DCF5]">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-1 gold-underline"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Send a Message
              </h2>
              <p className="text-[#8896B3] text-sm mt-4 mb-6">We typically respond within 24 hours</p>

              <ContactForm />
            </div>

            {/* Partner Links */}
            <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-[#D1DCF5]">
              <p className="font-semibold text-[#1A1A2E] mb-3 text-sm">Our Partners &amp; Affiliations</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '🌍 Mercy Works', href: 'https://www.mercyworks.site' },
                  { label: '📖 ZTF Foundation', href: 'https://www.ztffoundation.org' },
                  { label: '📘 Facebook', href: 'https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/' },
                  { label: '💬 WhatsApp', href: 'https://wa.me/237650441422' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#1B3A6B] text-sm font-medium border border-[#D1DCF5] rounded-lg px-3 py-2 hover:bg-[#EBF0FB] hover:border-[#1B3A6B] transition-all">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4 gold-underline"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Find Us on the Map
        </h2>
        <ContactMapWrapper />
        <p className="text-[#8896B3] text-xs mt-3 text-center">
          Quartier Koumé-Bonis, Bertoua, East Region, Cameroon
          {' '}·{' '}
          <a href="https://maps.google.com/?q=4.5753,13.6856" target="_blank" rel="noopener noreferrer"
            className="text-[#1B3A6B] hover:underline">
            Open in Google Maps ↗
          </a>
        </p>
      </section>
    </div>
  );
}
