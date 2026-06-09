'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Quote, CheckCircle } from 'lucide-react';

/* ─── Data ─── */
const stats10yr = [
  { value: '68,791',  label: 'Total Patients (10 yrs)' },
  { value: '39,757',  label: 'Laboratory Tests' },
  { value: '1,135',   label: 'Surgeries Performed' },
  { value: '1,576',   label: 'Births / Deliveries' },
  { value: '87',      label: 'Current Staff' },
  { value: '15,726',  label: 'Campaign Patients' },
  { value: '713',     label: 'Campaign Surgeries' },
  { value: '248',     label: 'Campaign Deliveries' },
  { value: '23',      label: 'Health Campaigns' },
  { value: '~200',    label: 'Campaign Volunteers' },
];

const visionCards = [
  { icon: '✝️', title: 'Manifest the Kingdom of God',  desc: 'Show God\'s love and compassion to every person in need — healing as a Kingdom act.' },
  { icon: '❤️', title: 'Demonstrate God\'s Love',      desc: 'Benevolent, sacrificial love for everyone regardless of background or means.' },
  { icon: '🌍', title: 'Reach Every Person',           desc: 'See Jesus reaching out to every hungry, sick, and suffering person in our community.' },
  { icon: '🏥', title: 'Transform Communities',        desc: 'Bring healing and hope to communities across Africa through sustained medical presence.' },
];

const missionCards = [
  {
    icon: '📖',
    title: 'Disciple Growth',
    desc: 'Ensure that every believer in our ministry grows in compassion and mercy according to the second greatest commandment: "Love your neighbour as yourself."',
  },
  {
    icon: '🏛️',
    title: 'Church as Embassy',
    desc: 'Ensure each local church in our ministry acts as an embassy of the Kingdom of God in its locality, actively assisting those in need.',
  },
  {
    icon: '👑',
    title: 'Image of God',
    desc: 'Show loyalty to the image of God and deal with Jesus in the various needs of mankind — physical, spiritual, emotional, and social.',
  },
];

const subBranches = [
  { icon: '🏥', name: 'Hope Medical Clinic',   desc: 'Quality medical and social care for the physically and mentally afflicted.' },
  { icon: '✝️', name: 'Hope Spiritual Clinic', desc: 'Prayer, faith healing, deliverance from addictions, character transformation.' },
  { icon: '🌿', name: 'Hope Holistic Clinic',  desc: 'Marital counselling, career guidance, business consultancy, life coaching.' },
  { icon: '🚐', name: 'Hope Mobile Clinic',    desc: 'Field trips and outreach campaigns bringing care to remote communities.' },
];

const achievements = [
  { icon: '🫀', title: 'Pacemaker Implantations',    desc: '2 pacemakers successfully placed (2018 and 2020) — a remarkable regional achievement.' },
  { icon: '🧠', title: 'Spinal Neurosurgery',        desc: 'Spinal surgery successfully performed — one of the most advanced procedures in the East Region.' },
  { icon: '👶', title: 'Neonatal Intensive Care',    desc: 'Multiple premature births managed in the dedicated Mother & Child Pavilion (B4, 2023).' },
  { icon: '🔬', title: 'Advanced Laboratory',        desc: 'Biochemistry automat, 31-parameter blood count (URIT 5160), electrophoresis chain, hormone testing.' },
  { icon: '✈️', title: 'Bertoua Airport Convention', desc: 'Care agreement signed with Bertoua Airport administration for staff and emergencies.' },
  { icon: '🏥', title: 'Universal Health Coverage',  desc: 'Eligible for government Check Santé / CSU programme for affordable care for all Cameroonians.' },
  { icon: '💊', title: 'Free Care for Indigents',    desc: 'Regular free treatment administered to vulnerable populations and the poorest community members.' },
  { icon: '📦', title: 'FESIDEV Partnership',        desc: 'Multiple containers of state-of-the-art medical equipment donated — transforming the clinic\'s capabilities.' },
];

const timeline = [
  {
    year: 1999, title: 'The First Hope Clinic',
    desc: 'Hope Clinic Abong-Mbang is founded by Brother Isaac & Bola NGWAN — the very first seed of the global Hope Clinic vision.',
    isKey: false,
  },
  {
    year: 2015, title: 'Hope Clinic Koumé Launches ★',
    desc: '7-day inaugural health campaign in July. Medical staff from 5 nations participate. ~100 patients treated. First building (B1) begins construction. The first medical equipment container arrives — a miraculous gift from FESIDEV.',
    isKey: true,
  },
  {
    year: 2016, title: 'Growth & First Building Complete',
    desc: 'Building 1 (B1) completed and operational. Staff grows to 15 people. Second building (B2) begins construction. The clinic begins serving the Koumé-Bonis community in earnest.',
    isKey: false,
  },
  {
    year: 2017, title: 'Major Equipment Upgrade',
    desc: 'Two containers arrive simultaneously with electric beds, orthopaedic mattresses, ultrasound and radiology machines, and cutting-edge laboratory equipment. Laboratory technical capacity greatly enhanced.',
    isKey: false,
  },
  {
    year: 2018, title: 'Medical Milestones — First Pacemaker',
    desc: 'First pacemaker successfully implanted — a landmark achievement for a regional clinic. Building 3 (B3) begins construction. Two buildings now operational with ~40 staff.',
    isKey: true,
  },
  {
    year: 2019, title: 'Network Expands',
    desc: 'Hope Clinic Uganda and Hope Clinic Douala open. The Hope Clinic network grows beyond Cameroon. B3 continues construction.',
    isKey: false,
  },
  {
    year: 2020, title: 'Second Pacemaker & Neurosurgery',
    desc: 'Second pacemaker successfully implanted. Spinal neurosurgery (first of its kind in the East Region) performed successfully. B3 completed and operational.',
    isKey: true,
  },
  {
    year: 2022, title: 'Building 4 — Mother & Child Pavilion',
    desc: 'Building 4 (B4) acquired from the Ministry of Health. Houses the dedicated Mother & Child Pavilion with neonatal intensive care unit. Average reaches 800 patients/month. Staff grows to 87.',
    isKey: false,
  },
  {
    year: 2023, title: 'Recognition & Global Expansion',
    desc: 'Eligible for government Check Santé / CSU programme. Care convention with Bertoua Airport. Six new Hope Clinics open globally (Mali, Nigeria, Mauritanie, Zimbabwe, Edea, Romania campaign). 15 functional Hope Clinics worldwide.',
    isKey: false,
  },
  {
    year: 2024, title: '10 Years of Excellence',
    desc: '68,791 patients treated over 10 years. 1,135 surgeries. 1,576 births. 23 health campaigns reaching 15,726 patients. 30,726+ patients in the most recent year across 12 Hope Clinics. A decade of compassionate, quality healthcare.',
    isKey: true,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFF]">

      {/* ── Hero ── */}
      <div className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">CMFI Mercy Works</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            About Hope Clinic Koumé
          </h1>
          <p className="text-white/80 text-lg">10 Years of Healing, Hope &amp; Excellence in the Heart of Cameroon</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">About</span>
          </nav>
        </div>
      </div>

      {/* ── Section 1: Welcome ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 mb-1 gold-underline"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Welcome to Hope Clinic Koumé
            </h2>
            <p className="text-[#D4A017] italic text-base mt-4 mb-4">Quality Medical Care for Optimal Health</p>
            <p className="text-[#4A5568] leading-relaxed mb-4">
              At Hope Clinic, we are dedicated to providing quality medical care in a modern and innovative setting.
              From our modern facilities to our expert medical staff, we strive to offer our patients the highest
              quality of care and a comfortable healing environment.
            </p>
            <p className="text-[#4A5568] leading-relaxed mb-4">
              Hope Clinic Koumé was established in 2015 in Koumé-Bonis, Bertoua, under the Mercy Works Department
              of CMFI (Christian Missionary Fellowship International / CMCI — Communauté Missionnaire Chrétienne
              Internationale) and the vision of the Zacharias Tanee Fomum Foundation.
            </p>
            <p className="text-[#4A5568] leading-relaxed">
              Over 10 years, Hope Clinic has grown from a 7-day campaign with ~100 patients into a 4-pavilion
              modern medical facility staffed by 87 dedicated healthcare professionals, serving 800+ patients monthly.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Emergency Care', 'Surgeries', 'Diagnostics & Therapies'].map((s) => (
                <span key={s} className="flex items-center gap-1.5 bg-[#EBF0FB] text-[#1B3A6B] text-sm font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />{s}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop"
              alt="Hope Clinic Koumé" fill className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border-l-4 border-[#1B3A6B]">
              <p className="text-[#1B3A6B] font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Est. 2015</p>
              <p className="text-[#4A5568] text-xs">Koumé-Bonis, Bertoua</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Leadership Quote ── */}
      <section className="py-14 bg-[#1B3A6B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-[#D4A017]/30 mx-auto mb-6" />
          <blockquote className="text-xl sm:text-2xl italic text-white/90 leading-relaxed mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "We thank the Lord for allowing us to show His compassion to many who come to Mercy Works
            to solve one problem or another during Phase 2 of our work. By His grace we have committed
            ourselves to do more in Phase 3 of our work. Help us Lord Jesus Christ, Amen."
          </blockquote>
          <div className="w-16 h-0.5 bg-[#D4A017] mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4A017]">
              <Image src="/images/Dr. Victor Andoseh.jpeg" alt="Dr. Victor ANDOSEH"
                fill className="object-cover" sizes="64px" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#D4A017] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Dr. Victor ANDOSEH
              </p>
              <p className="text-white/65 text-sm">Head of Department, Mercy Works — CMFI/CMCI</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: 10-Year Statistics ── */}
      <section className="py-16 bg-[#0F2347] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Impact</span>
            <h2 className="text-3xl font-bold text-white mt-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              10 Years in Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 text-center">
            {stats10yr.map(({ value, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4A017] mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {value}
                </div>
                <p className="text-white/60 text-xs leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Vision ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Scripture: Matthew 25:31-36</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Our Vision
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {visionCards.map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#F0F4FF] rounded-xl p-6 text-center hover:shadow-md transition-all border-t-4 border-[#1B3A6B]">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-[#EBF0FB] rounded-2xl p-8 border border-[#D1DCF5]">
            <p className="text-[#2952A3] leading-relaxed italic">
              "Over the years, Hope Clinic has touched the lives of countless individuals and families,
              providing life-saving medical care, innovative treatments, and compassionate support. From
              remote villages to bustling cities, our reach extends far and wide, bringing hope and healing
              to communities across Africa."
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Mission ── */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Our Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {missionCards.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-7 shadow-sm hover:shadow-md transition-all border-b-4 border-[#D4A017]">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-bold text-[#1A1A2E] text-xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h3>
                <p className="text-[#4A5568] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#4A5568] italic leading-relaxed">
              "At Hope Clinic, our commitment to excellence is at the heart of everything we do.
              We believe every life is precious and deserving of the highest quality of care,
              regardless of background or circumstance."
            </p>
            <p className="text-[#1B3A6B] font-semibold text-sm mt-3">— Dr. Ginette Bekolo, Director</p>
          </div>
        </div>
      </section>

      {/* ── Section 6: Organisation Structure ── */}
      <section className="py-20 bg-[#1B3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Structure</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Organisational Structure
            </h2>
          </div>

          {/* Org Chart */}
          <div className="max-w-4xl mx-auto">
            {/* Root */}
            <div className="bg-[#D4A017] text-[#0F2347] rounded-xl p-5 text-center font-bold text-lg mb-6 shadow-lg">
              CMFI / CMCI<br />
              <span className="font-medium text-sm text-[#0F2347]/80">
                Christian Missionary Fellowship International / Communauté Missionnaire Chrétienne Internationale
              </span>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-0.5 h-6 bg-white/30" />
            </div>

            {/* Mercy Works */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center mb-6">
              <p className="font-bold text-lg text-[#D4A017]">MERCY WORKS DEPARTMENT</p>
              <p className="text-white/65 text-sm mt-1">Manifesting the Kingdom of God through compassionate service</p>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-0.5 h-4 bg-white/30" />
            </div>

            {/* Three branches */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { name: 'LOVE HOMES', desc: 'Helping orphans and vulnerable people manifest the Kingdom of God', highlight: false },
                { name: 'HOPE CLINIC ★', desc: 'Manifesting God\'s Kingdom to the sick — physical, mental and spiritual', highlight: true },
                { name: 'MADES', desc: 'House of Hope — Prison ministry, manifesting God\'s Kingdom to prisoners', highlight: false },
              ].map(({ name, desc, highlight }) => (
                <div key={name}
                  className={`rounded-xl p-5 text-center border-2 transition-all ${
                    highlight
                      ? 'bg-[#D4A017]/20 border-[#D4A017] ring-2 ring-[#D4A017]/30'
                      : 'bg-white/5 border-white/20'
                  }`}>
                  <p className={`font-bold text-base mb-2 ${highlight ? 'text-[#D4A017]' : 'text-white'}`}>{name}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Hope Clinic sub-branches */}
            <div className="bg-white/5 border border-[#D4A017]/30 rounded-xl p-6">
              <p className="text-[#D4A017] font-semibold text-center mb-4 text-sm uppercase tracking-wider">
                Sub-branches of Hope Clinic
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {subBranches.map(({ icon, name, desc }) => (
                  <div key={name} className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="font-semibold text-sm text-white mb-1">{name}</p>
                    <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Timeline ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Since 1999</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Our History
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#D1DCF5]" />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc, isKey }) => (
                <div key={year} className="relative pl-16">
                  <div className={`absolute left-3.5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isKey
                      ? 'bg-[#1B3A6B] border-[#1B3A6B] shadow-lg shadow-[#1B3A6B]/30'
                      : 'bg-white border-[#D1DCF5]'
                  }`}>
                    {isKey && <div className="w-2 h-2 rounded-full bg-[#D4A017]" />}
                  </div>
                  <div className={`p-5 rounded-xl ${
                    isKey
                      ? 'bg-[#EBF0FB] border border-[#1B3A6B]/20'
                      : 'bg-[#F8FAFF] border border-[#D1DCF5]'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-bold text-xl ${isKey ? 'text-[#1B3A6B]' : 'text-[#D4A017]'}`}
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {year}
                      </span>
                      <h3 className="font-bold text-[#1A1A2E] text-sm">{title}</h3>
                    </div>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Notable Achievements ── */}
      <section className="py-20 bg-[#F0F4FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Milestones</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Notable Achievements
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#1B3A6B] mb-2 text-sm group-hover:text-[#D4A017] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {title}
                </h3>
                <p className="text-[#4A5568] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: Partners ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Partners &amp; Affiliations
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {[
              { src: '/images/Mercy Works logo.jpg',     alt: 'Mercy Works',       href: 'https://www.mercyworks.site',    label: 'Mercy Works' },
              { src: '/images/ZTF Image 02.png',         alt: 'ZTF Foundation',    href: 'https://www.ztffoundation.org',  label: 'ZTF Foundation' },
              { src: '/images/CMCI logo.jpg',            alt: 'CMFI/CMCI',         href: '#',                             label: 'CMFI / CMCI' },
              { src: '/images/Fesidev logo.jpg',         alt: 'FESIDEV',           href: '#',                             label: 'FESIDEV' },
              { src: '/images/Hope_Clinic_logo.jpg',     alt: 'Hope Clinic',       href: '/',                             label: 'Hope Clinic' },
            ].map(({ src, alt, href, label }) => (
              <a key={alt} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-5 rounded-xl border border-[#D1DCF5] hover:border-[#1B3A6B] hover:shadow-md transition-all group">
                <div className="relative w-16 h-16">
                  <Image src={src} alt={alt} fill className="object-contain" sizes="64px" />
                </div>
                <span className="text-[#4A5568] text-xs text-center font-medium group-hover:text-[#1B3A6B] transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 10: ZTF Foundation ── */}
      <section className="py-14 bg-[#F8FAFF] african-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/images/ZTF Image 02.png" alt="ZTF Foundation" fill className="object-contain" sizes="80px" />
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            The Zacharias Tanee Fomum Foundation
          </h3>
          <p className="text-[#4A5568] mb-2 leading-relaxed text-sm">
            Hope Clinic Koumé is a fruit of the vision of Late Rev. Prof. Zacharias Tanee Fomum —
            a man of God who committed his life to the transformation of societies through the power
            of the Gospel, resulting in ministries touching millions across Africa and the world.
          </p>
          <p className="text-[#8896B3] text-xs mb-6">
            Fondation ZTF — Déclaration n°: 452/ADR/JO6/APPA, Avril 21, 2010, Yaoundé
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://www.ztffoundation.org" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B3A6B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2952A3] transition-colors text-sm">
              ZTF Foundation <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://www.mercyworks.site" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] px-6 py-3 rounded-lg font-semibold hover:bg-[#EBF0FB] transition-colors text-sm">
              Mercy Works <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
