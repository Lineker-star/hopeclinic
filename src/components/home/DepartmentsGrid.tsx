'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface DeptRow {
  id?: string; slug: string; name: string;
  description?: string;
  image_url?: string;
  color?: string;
  is_active?: boolean;
  order_index?: number;
}

const SEED_DEPTS: DeptRow[] = [
  { slug: 'emergency', name: 'Emergency Care',          description: '24/7 staffed emergency with triage, resuscitation, and rapid response teams.',                  image_url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop', color: '#C8102E' },
  { slug: 'surgery',   name: 'Surgical Procedures',     description: '1,135 surgeries over 10 years including spinal neurosurgery and pacemaker implantation.',        image_url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop', color: '#0F2340' },
  { slug: 'maternity', name: 'Maternity & Neonatology',  description: 'Mother & Child Pavilion (B4). 1,576 deliveries. Prenatal care through neonatal intensive care.', image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop', color: '#D4A017' },
  { slug: 'pediatrics',name: 'Pediatrics',              description: 'Child health, neonatal care, vaccinations, and specialized pediatric consultations.',            image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop', color: '#2952A3' },
  { slug: 'laboratory',name: 'Laboratory & Diagnostics', description: '39,757 tests performed. Advanced biochemistry automat, electrophoresis, full blood count.',     image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop', color: '#0F2340' },
  { slug: 'mobile',    name: 'Hope Mobile Clinic',      description: '23 health campaigns. 15,726+ patients reached in remote communities across the East Region.',    image_url: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=600&auto=format&fit=crop', color: '#D4A017' },
];

export default function DepartmentsGrid() {
  const { data: rawDepts } = useSupabaseData<DeptRow>('departments', {
    filter: { is_active: true },
    orderBy: 'order_index',
    fallback: SEED_DEPTS,
    realtimeTable: 'departments',
  });

  const depts = rawDepts.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="text-[#0F2340] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Departments
          </h2>
          <p className="text-[#4A5568] mt-5 max-w-xl mx-auto">
            Comprehensive healthcare services — delivered with excellence and compassion for every soul
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="initial" whileInView="animate" viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {depts.map((dept) => {
            const borderColor = dept.color ?? '#0F2340';
            return (
              <motion.div key={dept.slug} variants={fadeInUp}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-52 overflow-hidden">
                  {dept.image_url && (
                    <Image src={dept.image_url} alt={dept.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ backgroundColor: borderColor }} />
                </div>
                <div className="p-5 bg-white border-t-2" style={{ borderColor }}>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2 group-hover:text-[#0F2340] transition-colors"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {dept.name}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-3">{dept.description}</p>
                  <Link href={`/services#${dept.slug}`}
                    className="inline-flex items-center gap-1 text-[#0F2340] text-sm font-semibold hover:gap-2 transition-all hover:text-[#D4A017]">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce} transition={{ delay: 0.3 }}
          className="text-center mt-10">
          <Link href="/services"
            className="inline-flex items-center gap-2 border-2 border-[#0F2340] text-[#0F2340] px-8 py-3 rounded-xl font-semibold hover:bg-[#0F2340] hover:text-white transition-all">
            View All 15 Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
