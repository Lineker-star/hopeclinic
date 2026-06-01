'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

const featured = [
  {
    id: 'dr-ginette-bekolo', name: 'Ginette Bekolo', title: 'Dr.',
    role: 'Director & General Practitioner',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop',
    experience: 10, dept: 'Administration',
    bio: 'Under Dr. Bekolo\'s leadership, Hope Clinic grew from a single building to a 4-pavilion facility serving 800+ patients monthly.',
    langs: ['French', 'English'],
  },
  {
    id: 'dr-laura-enoh', name: 'Laura Enoh', title: 'Dr.',
    role: 'Pediatrician & Neonatologist',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop',
    experience: 7, dept: 'Pediatrics & Neonatology',
    bio: 'Dr. Enoh oversees the Mother & Child Pavilion, managing neonatal intensive care and 1,576 deliveries over 10 years.',
    langs: ['French', 'English'],
  },
  {
    id: 'dr-coulibaly', name: 'Coulibaly', title: 'Dr.',
    role: 'Neurologist & Neurosurgeon',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop',
    experience: 8, dept: 'Neurology',
    bio: 'Dr. Coulibaly brings rare specialist expertise including the clinic\'s landmark spinal neurosurgery procedure.',
    langs: ['French'],
  },
];

export default function FeaturedDoctors() {
  return (
    <section className="py-20 bg-[#F0F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#1B3A6B] font-semibold text-sm uppercase tracking-widest">Meet Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mt-2 gold-underline gold-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Dedicated Doctors
          </h2>
          <p className="text-[#4A5568] mt-5 max-w-xl mx-auto">
            Expert medical professionals committed to your wellbeing and healing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((doctor) => (
            <div key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-b-4 border-[#1B3A6B]">
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-[#EBF0FB]">
                <Image src={doctor.img} alt={`${doctor.title} ${doctor.name}`}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/70 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {doctor.title} {doctor.name}
                  </h3>
                  <p className="text-[#D4A017] text-sm font-medium">{doctor.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 bg-[#EBF0FB] text-[#1B3A6B] rounded-full font-medium">
                    {doctor.dept}
                  </span>
                  <span className="text-[#8896B3] text-xs">{doctor.experience}+ yrs</span>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed mb-4 line-clamp-3">{doctor.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doctor.langs.map((l) => (
                    <span key={l} className="text-xs px-2 py-0.5 bg-[#F0F4FF] text-[#4A5568] rounded-full">{l}</span>
                  ))}
                </div>
                <Link href={`/doctors/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1B3A6B] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2952A3] transition-colors">
                  View Profile & Book <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] px-8 py-3 rounded-xl font-semibold hover:bg-[#1B3A6B] hover:text-white transition-all">
            View All Doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
