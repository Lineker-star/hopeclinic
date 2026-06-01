import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function MercyWorksSection() {
  return (
    <section className="py-16 bg-[#0F2347] text-white african-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Part of the Mercy Works Department
            </h2>
            <p className="text-[#D4A017] italic text-base mb-4">
              CMFI — Christian Missionary Fellowship International
            </p>

            <blockquote className="border-l-4 border-[#D4A017] pl-4 mb-4 italic text-white/80 text-sm leading-relaxed">
              "We thank the Lord for allowing us to show His compassion to many who come to Mercy Works
              to solve one problem or another during Phase 2 of our work. By His grace we have committed
              ourselves to do more in Phase 3 of our work. Help us Lord Jesus Christ, Amen."
            </blockquote>
            <p className="text-[#D4A017] text-xs mb-6">
              — Dr. Victor ANDOSEH, Head of Mercy Works Department, CMFI/CMCI
            </p>

            <p className="text-white/60 leading-relaxed mb-8 text-sm">
              Hope Clinic Koumé operates under the Mercy Works Department of CMFI alongside LOVE HOMES
              (orphan care) and MADES (prison ministry), fulfilling the vision of the Zacharias Tanee
              Fomum Foundation to manifest God's Kingdom through compassionate service.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="https://www.mercyworks.site" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A017] text-[#0F2347] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#F5C842] transition-colors">
                Learn About Mercy Works <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://www.ztffoundation.org" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white/80 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
                ZTF Foundation <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { src: '/images/Mercy Works logo.jpg', alt: 'Mercy Works', label: 'Mercy Works Dept.' },
              { src: '/images/CMCI logo.jpg',        alt: 'CMFI',         label: 'CMFI / CMCI' },
              { src: '/images/ZTF Image 02.png',     alt: 'ZTF',          label: 'ZTF Foundation' },
              { src: '/images/Hope_Clinic_logo.jpg', alt: 'Hope Clinic',  label: 'Hope Clinic Network' },
            ].map(({ src, alt, label }) => (
              <div key={alt}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
                <div className="relative w-16 h-16">
                  <Image src={src} alt={alt} fill className="object-contain rounded" sizes="64px" />
                </div>
                <span className="text-white/60 text-xs text-center font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
