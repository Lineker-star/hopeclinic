'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const featuredDepts = [
  { slug: 'emergency',  name: 'Emergency Care',        desc: '24/7 staffed emergency with triage, resuscitation, and rapid response teams.',         img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop',  badge: '24/7',          color: '#C8102E' },
  { slug: 'surgery',    name: 'Surgical Procedures',   desc: '1,135 surgeries over 10 years including spinal neurosurgery and pacemaker implantation.', img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop',  badge: '1,135 surgeries', color: '#1B3A6B' },
  { slug: 'maternity',  name: 'Maternity & Neonatology', desc: 'Mother & Child Pavilion. 1,576 deliveries. Prenatal care through neonatal intensive care.', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop',  badge: '1,576 births',  color: '#D4A017' },
  { slug: 'pediatrics', name: 'Pediatrics',            desc: 'Specialized child health, neonatal care, vaccinations, and pediatric consultations.',     img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop',  badge: null,            color: '#2952A3' },
  { slug: 'laboratory', name: 'Laboratory & Diagnostics', desc: '39,757 tests performed. Advanced biochemistry automat, electrophoresis, full blood count.', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop', badge: '39,757 tests',  color: '#1B3A6B' },
  { slug: 'mobile',     name: 'Hope Mobile Clinic',    desc: '19 health campaigns. 15,726 patients reached in remote communities across the East Region.', img: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=600&auto=format&fit=crop',  badge: '19 campaigns',  color: '#D4A017' },
];

export default function DepartmentsGrid() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Departments
          </h2>
          <p className="text-[#4A5568] mt-5 max-w-xl mx-auto">
            Comprehensive healthcare services — delivered with excellence and compassion for every soul
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepts.map((dept, i) => (
            <div key={dept.slug}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 80}ms`,
                transitionDuration: '600ms'
              }}>
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image src={dept.img} alt={dept.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-75 transition-opacity duration-300"
                  style={{ backgroundColor: dept.color }} />
                {dept.badge && (
                  <div className="absolute top-3 right-3 bg-[#D4A017] text-[#1B3A6B] text-xs font-bold px-2 py-0.5 rounded-full">
                    {dept.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 bg-white border-t-2" style={{ borderColor: dept.color }}>
                <h3 className="font-bold text-[#1A1A2E] text-base mb-2 group-hover:text-[#1B3A6B] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {dept.name}
                </h3>
                <p className="text-[#4A5568] text-sm leading-relaxed mb-3">{dept.desc}</p>
                <Link href={`/services#${dept.slug}`}
                  className="inline-flex items-center gap-1 text-[#1B3A6B] text-sm font-semibold hover:gap-2 transition-all hover:text-[#D4A017]">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services"
            className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] px-8 py-3 rounded-xl font-semibold hover:bg-[#1B3A6B] hover:text-white transition-all">
            View All 15 Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
