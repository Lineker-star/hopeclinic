import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import ContactMapWrapper from '@/components/map/ContactMapWrapper';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Hope Clinic Koumé — address, phone +237 650 441 422, working hours, and directions in Bertoua, Cameroon.',
};

const subjects = [
  'General Enquiry', 'Appointment Request', 'Medical Information',
  'Billing & Payments', 'Feedback & Suggestions', 'Partnership',
  'Media & Press', 'Other',
];

export default function ContactPage() {
  return (
    <div className="bg-[#F9F6F1]">
      {/* Hero */}
      <div
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Contact Us
          </h1>
          <p className="text-white/80 text-lg">We're here to help — reach out anytime</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Contact</span>
          </nav>
        </div>
      </div>

      {/* Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Find Us
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Address</p>
                  <p className="text-[#5A5A5A] text-sm mt-0.5">Koumé-Bonis Quarter, Bertoua<br />East Region, Cameroon</p>
                  <a
                    href={`https://maps.google.com?q=4.5753,13.6856`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C8102E] text-xs font-medium mt-2 hover:underline"
                  >
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Phone</p>
                  <a href="tel:+237650441422" className="text-[#C8102E] font-bold text-lg hover:underline">
                    +237 650 441 422
                  </a>
                  <p className="text-[#9A9A9A] text-xs mt-0.5">Emergency available 24/7</p>
                  <a
                    href="https://wa.me/237650441422?text=Hello%2C%20I%20would%20like%20more%20information"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#128C7E] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Email</p>
                  <a href="mailto:info@hopeclinickoume.org" className="text-[#C8102E] hover:underline text-sm">
                    info@hopeclinickoume.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div className="w-full">
                  <p className="font-semibold text-[#1A1A1A] mb-2">Working Hours</p>
                  {[
                    { days: 'Monday – Wednesday', hours: '8:00 AM – 4:00 PM' },
                    { days: 'Thursday – Friday', hours: '8:00 AM – 3:00 PM' },
                    { days: 'Saturday', hours: '8:00 AM – 1:00 PM' },
                    { days: 'Sunday', hours: 'Closed' },
                    { days: 'Emergency', hours: '24/7', red: true },
                  ].map(({ days, hours, red }) => (
                    <div key={days} className="flex justify-between text-sm py-1 border-b border-[#F2F0ED] last:border-0">
                      <span className="text-[#5A5A5A]">{days}</span>
                      <span className={`font-semibold ${red ? 'text-[#C8102E]' : 'text-[#D4A017]'}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
              <p className="font-semibold text-[#1A1A1A] mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="https://web.facebook.com/people/Hope-Clinic-koume/61562753151873/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <FaFacebookF className="w-4 h-4" /> Facebook
                </a>
                <a href="https://www.instagram.com/hopeclinickoume" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <FaInstagram className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Send a Message
              </h2>
              <p className="text-[#9A9A9A] text-sm mb-6">We typically respond within 24 hours</p>

              <form className="space-y-4" action="#" method="POST">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Full Name *</label>
                    <input
                      type="text" name="name" required
                      className="w-full border border-[#E5E1DC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email *</label>
                    <input
                      type="email" name="email" required
                      className="w-full border border-[#E5E1DC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Phone</label>
                    <input
                      type="tel" name="phone"
                      className="w-full border border-[#E5E1DC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                      placeholder="+237 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Subject</label>
                    <select
                      name="subject"
                      className="w-full border border-[#E5E1DC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] bg-white transition-all"
                    >
                      {subjects.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Message *</label>
                  <textarea
                    name="message" required rows={5}
                    className="w-full border border-[#E5E1DC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] resize-none transition-all"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-semibold hover:bg-[#8B0000] transition-colors text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Find Us on the Map
        </h2>
        <ContactMapWrapper />
      </section>
    </div>
  );
}
