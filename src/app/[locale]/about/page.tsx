import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Hope Clinic Koumé — our mission, vision, history, and the Mercy Works Department of CMFI.',
};

const timeline = [
  { year: 1999, title: 'First Hope Clinic — Abong-Mbang', description: 'Brother Isaac GWAN founds the very first Hope Clinic in Abong-Mbang, East Region of Cameroon. The seed of a global healthcare ministry is planted.', isMain: false },
  { year: 2008, title: 'Hope Clinic Abidjan', description: "The Hope Clinic network expands to Côte d'Ivoire, bringing healing to West Africa.", isMain: false },
  { year: 2013, title: 'Hope Clinics Nomedjoh & Yei', description: 'Two new clinics open — one in Nomedjoh, Cameroon and one in Yei, South Sudan. The mission reaches Central and East Africa.', isMain: false },
  { year: 2015, title: 'Hope Clinic Koumé — Bertoua ★', description: 'Hope Clinic Koumé is established in Koumé-Bonis, Bertoua under Dr. Ginette Bekolo. This becomes the flagship clinic of the network.', isMain: true },
  { year: 2016, title: 'Hope Clinic Bambouti', description: 'Another clinic opens in Bambouti, extending care to remote forest communities of the East Region.', isMain: false },
  { year: 2018, title: 'Hope Clinic Gabon', description: 'The healing ministry crosses borders into Gabon, reaching Central African communities.', isMain: false },
  { year: 2019, title: 'Hope Clinics Uganda & Douala', description: 'Dual expansion — Hope Clinic opens in Uganda (East Africa) and in Douala, Cameroon\'s economic capital.', isMain: false },
  { year: 2023, title: 'Global Expansion — 6 New Clinics', description: 'Historic year: New clinics open in Edea (Cameroon), Mali, Nigeria, Mauritania, Zimbabwe, and a special health campaign in Romania reaching 40+ persons.', isMain: false },
];

const subBranches = [
  { name: 'Hope Medical Clinic', description: 'Physical healthcare services including general medicine, surgery, maternal care, pediatrics, and emergency care.', icon: '🏥' },
  { name: 'Hope Spiritual Clinic', description: 'Prayer, pastoral care, spiritual counseling, and deliverance ministry for patients and their families.', icon: '✝️' },
  { name: 'Hope Holistic Clinic', description: 'Marital counseling, career guidance, family therapy, and wholistic wellbeing support beyond physical health.', icon: '🌿' },
  { name: 'Hope Mobile Clinic', description: 'Field trips and outreach campaigns bringing healthcare to remote villages and underserved communities.', icon: '🚐' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F9F6F1]">
      {/* Page Hero */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">CMFI Mercy Works</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            About Hope Clinic Koumé
          </h1>
          <p className="text-white/80 text-lg">A Story of Faith, Healing & African Excellence</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">About</span>
          </div>
        </div>
      </div>

      {/* Welcome & Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Welcome to Hope Clinic Koumé
            </h2>
            <p className="text-[#5A5A5A] leading-relaxed mb-4">
              Hope Clinic Koumé is a compassionate Christian medical facility located in Koumé-Bonis,
              Bertoua, East Region of Cameroon. Established in 2015 under the Mercy Works Department
              of CMFI (Christian Missionary Fellowship International) and the vision of the
              Zacharias Tanee Fomum Foundation.
            </p>
            <p className="text-[#5A5A5A] leading-relaxed mb-4">
              We believe in the inseparable connection between physical healing and spiritual wholeness.
              Our motto: <em className="text-[#C8102E] font-medium">"Healthcare for Everyone — Healing Body, Mind & Spirit."</em>
            </p>
            <p className="text-[#5A5A5A] leading-relaxed">
              Under the direction of Dr. Ginette Bekolo, Hope Clinic Koumé has served thousands of
              patients from across the East Region, building a reputation for quality, compassion, and
              Christian excellence in healthcare delivery.
            </p>
          </div>
          <div className="relative h-80 lg:h-full min-h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop"
              alt="Hope Clinic Koumé"
              fill className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Word from Head of Mercy Works */}
      <section className="py-14 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-[#C8102E]/40 mx-auto mb-6" />
          <blockquote className="text-xl sm:text-2xl italic text-white/90 leading-relaxed mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "The Hope Clinic exists to manifest the Kingdom of God in the domain of healing.
            We serve because Christ served — with love, without distinction, bringing healing
            to all who come to us as a witness of God's compassion for humanity."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4A017]">
              <Image src="/images/Dr. Victor Andoseh.jpeg" alt="Dr. Victor ANDOSEH" fill className="object-cover" sizes="64px" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#D4A017]">Dr. Victor ANDOSEH</p>
              <p className="text-white/60 text-sm">Head of Mercy Works Department, CMFI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#F9F6F1] rounded-2xl border-l-4 border-[#C8102E]">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Vision</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                To be a true African and Cameroonian modern health facility for the world —
                a beacon of hope where every person, regardless of background or means, receives
                world-class medical care rooted in Christian compassion.
              </p>
              <p className="text-[#9A9A9A] text-sm italic border-t border-[#E5E1DC] pt-3 mt-4">
                "...I was sick and you visited me..." — Matthew 25:36
              </p>
            </div>
            <div className="p-8 bg-[#F9F6F1] rounded-2xl border-l-4 border-[#D4A017]">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Mission</h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-4">
                Manifesting God's Kingdom through compassionate, quality healthcare that heals
                the body, mind, and spirit. We serve as an extension of Christ's healing ministry
                to the communities of Bertoua and the East Region of Cameroon.
              </p>
              <ul className="space-y-2 text-sm text-[#5A5A5A]">
                {['Provide accessible quality healthcare to all', 'Integrate spiritual care with medical treatment', 'Train and develop healthcare professionals', 'Expand the Hope Clinic network globally'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-branches */}
      <section className="py-20 bg-[#F9F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Our Four Pillars
            </h2>
            <p className="text-[#5A5A5A] mt-3">The four branches of Hope Clinic's healing ministry</p>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subBranches.map(({ name, description, icon }) => (
              <div key={name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{name}</h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Since 1999</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Our History
            </h2>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E5E1DC]" />

            <div className="space-y-8">
              {timeline.map(({ year, title, description, isMain }) => (
                <div key={year} className="relative pl-16">
                  {/* Dot */}
                  <div className={`absolute left-3.5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isMain ? 'bg-[#C8102E] border-[#C8102E]' : 'bg-white border-[#C8102E]'
                  }`}>
                    {isMain && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Content */}
                  <div className={`p-5 rounded-xl ${isMain ? 'bg-[#C8102E]/5 border border-[#C8102E]/20' : 'bg-[#F9F6F1]'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-bold text-xl ${isMain ? 'text-[#C8102E]' : 'text-[#D4A017]'}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {year}
                      </span>
                      <h3 className="font-bold text-[#1A1A1A]">{title}</h3>
                    </div>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ZTF Foundation */}
      <section className="py-14 bg-[#F9F6F1] african-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/images/ZTF Image 02.png" alt="ZTF Foundation" fill className="object-contain" sizes="80px" />
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            The Zacharias Tanee Fomum Foundation
          </h3>
          <p className="text-[#5A5A5A] mb-6 leading-relaxed">
            Hope Clinic Koumé is a fruit of the vision of Late Rev. Prof. Zacharias Tanee Fomum —
            a renowned man of God who committed his life to the transformation of societies through
            the power of the Gospel, resulting in ministries that touch millions across Africa and the world.
          </p>
          <a
            href="https://www.ztffoundation.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors"
          >
            Learn About ZTF Foundation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
