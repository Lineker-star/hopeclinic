import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: '15 medical departments at Hope Clinic Koumé — 1,135 surgeries, 39,757 lab tests, 1,576 births. Emergency, Surgery, Maternity, Pediatrics, Cardiology and more.',
};

const services = [
  {
    id: 'emergency', icon: '🚨', color: '#C8102E', badge: '24/7',
    name: 'Emergency Care',
    desc: 'Staffed 24/7 by trained medical professionals. Triage, resuscitation, trauma care, and rapid stabilisation. Our emergency team is always ready — day or night.',
    features: ['24/7 availability', 'Trauma care', 'Resuscitation unit', 'Triage system'],
    img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop',
  },
  {
    id: 'icu', icon: '💉', color: '#1B3A6B', badge: null,
    name: 'Intensive Care Unit (ICU)',
    desc: 'Dedicated critical care for patients in serious condition. Round-the-clock monitoring and specialist management for life-threatening situations.',
    features: ['Critical monitoring', '24/7 physician coverage', 'Ventilator support', 'Post-surgical care'],
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop',
  },
  {
    id: 'surgery', icon: '⚕️', color: '#1B3A6B', badge: '1,135 surgeries',
    name: 'Surgical Procedures',
    desc: 'State-of-the-art surgical facilities. Over 1,135 surgeries performed in 10 years including general surgery, C-sections, spinal neurosurgery, and pacemaker implantations.',
    features: ['General surgery', 'Caesarean sections', 'Spinal neurosurgery', 'Pacemaker implantation', 'Minor procedures'],
    img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop',
  },
  {
    id: 'maternity', icon: '🤱', color: '#D4A017', badge: '1,576 births',
    name: 'Maternity & Neonatology',
    desc: 'Mother & Child Pavilion (Building B4, 2023). 1,576 deliveries in 10 years. Prenatal consultations, labour & delivery, postnatal care, and neonatal intensive care unit.',
    features: ['Prenatal consultations', 'Labour & delivery', 'Caesarean sections', 'Neonatal intensive care', 'Postnatal follow-up'],
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop',
  },
  {
    id: 'pediatrics', icon: '👶', color: '#2952A3', badge: null,
    name: 'Pediatrics',
    desc: 'Specialised care for children from birth through adolescence. Neonatal intensive care, child health consultations, vaccinations, and growth monitoring.',
    features: ['Neonatal ICU', 'Child consultations', 'Vaccinations', 'Growth monitoring', 'Paediatric emergencies'],
    img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop',
  },
  {
    id: 'cardiology', icon: '❤️', color: '#C8102E', badge: '2 pacemakers',
    name: 'Cardiology',
    desc: 'Full cardiac diagnostics and treatment. Our team has successfully implanted 2 pacemakers (2018 and 2020). ECG, cardiac monitoring, and cardiovascular care.',
    features: ['ECG', 'Pacemaker implantation', 'Cardiac monitoring', 'Heart failure management'],
    img: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&auto=format&fit=crop',
  },
  {
    id: 'gynecology', icon: '🌸', color: '#1B3A6B', badge: null,
    name: 'Gynecology & Obstetrics',
    desc: 'Complete women\'s healthcare. Gynecological consultations, prenatal care, family planning, and reproductive health services for women of all ages.',
    features: ['Gynecological exams', 'Prenatal care', 'Family planning', 'Reproductive health', 'Colposcopy'],
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop',
  },
  {
    id: 'laboratory', icon: '🔬', color: '#1B3A6B', badge: '39,757 tests',
    name: 'Laboratory & Diagnostics',
    desc: '39,757 tests performed in 10 years. Advanced equipment including biochemistry automat, 31-parameter blood count (URIT 5160), electrophoresis chain, hormone testing, and serological quantification.',
    features: ['Complete blood count (31 parameters)', 'Biochemistry automat', 'Hormone testing', 'Electrophoresis chain', 'Serological quantification', 'Microscopy & parasitology'],
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop',
  },
  {
    id: 'radiology', icon: '📡', color: '#2952A3', badge: null,
    name: 'Radiology & Medical Imaging',
    desc: 'X-ray and ultrasound imaging. Equipment upgraded via FESIDEV container donations including state-of-the-art ultrasound machines for accurate diagnosis.',
    features: ['Digital X-ray', 'Ultrasound / Echography', 'Diagnostic imaging', 'Antenatal scans'],
    img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop',
  },
  {
    id: 'internal-medicine', icon: '🩺', color: '#1B3A6B', badge: null,
    name: 'Internal Medicine',
    desc: 'Comprehensive adult medical consultations. Chronic disease management — diabetes, hypertension, malaria, typhoid, HIV/AIDS follow-up, and infectious diseases.',
    features: ['General consultations', 'Chronic disease management', 'Infectious disease', 'Diabetes & hypertension', 'HIV/AIDS follow-up'],
    img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&auto=format&fit=crop',
  },
  {
    id: 'neurology', icon: '🧠', color: '#1B3A6B', badge: null,
    name: 'Neurology & Neurosurgery',
    desc: 'Advanced neurological care. Hope Clinic Koumé has performed spinal neurosurgery — a rare and advanced capability for a regional clinic in the East Region of Cameroon.',
    features: ['Neurological consultations', 'Spinal surgery', 'Stroke management', 'Neurological diagnostics'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop',
  },
  {
    id: 'pharmacy', icon: '💊', color: '#2952A3', badge: null,
    name: 'Pharmacy',
    desc: 'On-site pharmacy dispensing prescribed medications with qualified pharmacists. Medications regularly supplied through FESIDEV and other partnerships.',
    features: ['Prescription dispensing', 'Medication counselling', 'Drug availability', 'FESIDEV-supplied stock'],
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop',
  },
  {
    id: 'spiritual', icon: '✝️', color: '#D4A017', badge: null,
    name: 'Hope Spiritual Clinic',
    desc: 'Prayer ministry, spiritual counselling, and faith-based healing ministry. Care for spiritual and emotional well-being alongside physical health — healing the whole person.',
    features: ['Prayer ministry', 'Spiritual counselling', 'Addiction healing', 'Inner healing', 'Pastoral care'],
    img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&auto=format&fit=crop',
  },
  {
    id: 'holistic', icon: '🌿', color: '#16A34A', badge: null,
    name: 'Hope Holistic Clinic',
    desc: 'Integral well-being care. Marital counselling, career guidance, business consultancy, and life coaching for complete wholistic health of individuals and families.',
    features: ['Marital counselling', 'Career guidance', 'Business consultancy', 'Life coaching', 'Family therapy'],
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop',
  },
  {
    id: 'mobile', icon: '🚐', color: '#D4A017', badge: '19 campaigns',
    name: 'Hope Mobile Clinic',
    desc: '19 health campaigns conducted. 15,726 patients reached in remote communities. Field trips bring care directly to villages across the East Region and beyond — 713 campaign surgeries, 248 campaign deliveries.',
    features: ['Community outreach', 'Remote village care', 'Free consultations', 'Campaign surgeries', 'Dental hygiene education'],
    img: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=600&auto=format&fit=crop',
  },
];

const schedule = [
  { days: 'Monday – Wednesday', hours: '08:00 AM – 04:00 PM' },
  { days: 'Thursday – Friday',  hours: '08:00 AM – 03:00 PM' },
  { days: 'Saturday',           hours: '08:00 AM – 01:00 PM' },
  { days: 'Sunday',             hours: 'Closed' },
  { days: 'Emergency (24/7)',   hours: '+237 650 441 422', emg: true },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFF]">

      {/* Hero */}
      <div className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-[#1B3A6B]/82" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Comprehensive Healthcare</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Medical Services
          </h1>
          <p className="text-white/80 text-lg">Comprehensive Healthcare for Body, Mind &amp; Spirit</p>
          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Link href="/" className="hover:text-[#D4A017]">Home</Link>
            <span>/</span>
            <span className="text-[#D4A017]">Services</span>
          </nav>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#1B3A6B] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-center">
          {[
            { n: '15',       label: 'Departments' },
            { n: '1,135',    label: 'Surgeries (10 yrs)' },
            { n: '39,757',   label: 'Lab Tests (10 yrs)' },
            { n: '1,576',    label: 'Births (10 yrs)' },
            { n: '24/7',     label: 'Emergency Care' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-[#D4A017]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {n}
              </div>
              <div className="text-white/65 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A2E] gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            All 15 Departments
          </h2>
          <p className="text-[#4A5568] mt-5">Every department staffed by dedicated specialists</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div key={svc.id} id={svc.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border-b-4"
              style={{ borderBottomColor: svc.color }}>
              <div className="relative h-44 overflow-hidden">
                <Image src={svc.img} alt={svc.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-2xl">{svc.icon}</span>
                  {svc.badge && (
                    <span className="bg-[#D4A017] text-[#1B3A6B] text-xs font-bold px-2 py-0.5 rounded-full">
                      {svc.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-2 group-hover:text-[#1B3A6B] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {svc.name}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed mb-4">{svc.desc}</p>
                <ul className="space-y-1 mb-4">
                  {svc.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#4A5568]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: svc.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/booking"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors text-white"
                  style={{ backgroundColor: svc.color }}>
                  Book This Service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special pillars */}
      <section className="py-14 bg-[#1B3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Beyond Medical Care — Hope Clinic's Unique Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '✝️', color: '#D4A017', title: 'Hope Spiritual Clinic', desc: 'Prayer, pastoral care, and spiritual healing alongside medical treatment. Healing the whole person — body, soul, and spirit.' },
              { icon: '🌿', color: '#D4A017', title: 'Hope Holistic Clinic',  desc: 'Marital counselling, career guidance, family therapy, and complete wholistic wellbeing — because health is more than the physical.' },
              { icon: '🚐', color: '#D4A017', title: 'Hope Mobile Clinic',    desc: '19 campaigns, 15,726 patients reached. Field outreach brings healthcare to the most remote villages and underserved communities.' },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#D4A017] text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h3>
                <p className="text-white/65 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Clock className="w-8 h-8 text-[#1B3A6B] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-[#1A1A2E]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Working Hours
            </h2>
          </div>
          <div className="space-y-2">
            {schedule.map(({ days, hours, emg }) => (
              <div key={days}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  emg
                    ? 'bg-[#C8102E]/5 border-[#C8102E]/30'
                    : 'bg-[#F8FAFF] border-[#D1DCF5] hover:border-[#1B3A6B]/30'
                }`}>
                <span className={`font-medium text-sm ${emg ? 'text-[#C8102E]' : 'text-[#1A1A2E]'}`}>{days}</span>
                <span className={`font-bold text-sm ${emg ? 'text-[#C8102E]' : 'text-[#D4A017]'}`}>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#D4A017] text-[#1B3A6B] text-center">
        <h2 className="text-3xl font-bold mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Need Medical Care?
        </h2>
        <p className="text-[#1B3A6B]/80 mb-6">Our dedicated team is ready to help you today.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/booking"
            className="bg-[#1B3A6B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0F2347] transition-colors">
            Book Appointment
          </Link>
          <a href="tel:+237650441422"
            className="border-2 border-[#1B3A6B] text-[#1B3A6B] px-8 py-3 rounded-xl font-bold hover:bg-[#1B3A6B]/10 transition-colors">
            Call +237 650 441 422
          </a>
        </div>
      </section>
    </div>
  );
}
