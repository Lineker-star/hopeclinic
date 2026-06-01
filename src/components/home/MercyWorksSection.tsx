import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function MercyWorksSection() {
  return (
    <section className="py-16 bg-[#1A1A1A] text-white african-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <span className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Part of the Mercy Works Department
            </h2>
            <p className="text-[#D4A017] italic text-base mb-4">
              CMFI — Christian Missionary Fellowship International
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Hope Clinic Koumé operates under the Mercy Works Department of CMFI, fulfilling the
              vision of the Zacharias Tanee Fomum Foundation to manifest God's Kingdom through
              compassionate healthcare. We believe healing the body is inseparable from healing the spirit.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              The Mercy Works Department oversees multiple humanitarian initiatives including
              LOVE HOMES (orphan care), MADES (academic support), and HOPE CLINIC (healthcare) —
              serving thousands across Cameroon and beyond.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.mercyworks.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#8B0000] transition-colors"
              >
                Learn About Mercy Works
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.ztffoundation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#D4A017] text-[#D4A017] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#D4A017]/10 transition-colors"
              >
                ZTF Foundation
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Logos grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: '/images/Mercy Works logo.jpg', alt: 'Mercy Works', label: 'Mercy Works Dept.' },
              { src: '/images/CMCI logo.jpg', alt: 'CMFI', label: 'CMFI' },
              { src: '/images/ZTF Image 02.png', alt: 'ZTF Foundation', label: 'ZTF Foundation' },
              { src: '/images/Hope_Clinic_logo.jpg', alt: 'Hope Clinic', label: 'Hope Clinic Network' },
            ].map(({ src, alt, label }) => (
              <div key={alt} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
                <div className="relative w-16 h-16">
                  <Image src={src} alt={alt} fill className="object-contain rounded" sizes="64px" />
                </div>
                <span className="text-white/70 text-xs text-center font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
