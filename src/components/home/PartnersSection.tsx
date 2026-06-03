import Image from 'next/image';
import Link from 'next/link';

// A7: Use actual files from public/images/
const partners = [
  { name: 'ZTF Foundation',   logo: '/images/ZTF Foundation Logo 1.png', url: 'https://www.ztffoundation.org' },
  { name: 'ZTF University',   logo: '/images/ZTF University logo.png',    url: '#' },
  { name: 'IFP-ZTF',         logo: '/images/ZTF-IFP.png',               url: '#' },
  { name: 'CMFI / CMCI',     logo: '/images/CMCI logo.jpg',              url: '#' },
  { name: 'Love Homes',      logo: '/images/Love homes logo.jpg',        url: '#' },
  { name: 'Relief Services', logo: '/images/Relief Services Logo.png',   url: '#' },
  { name: 'FESIDEV',         logo: '/images/Fesidev logo.jpg',           url: '#' },
  { name: 'Mercy Works',     logo: '/images/Mercy Works logo.jpg',       url: 'https://www.mercyworks.site' },
];

export default function PartnersSection() {
  return (
    <section className="py-14 bg-white border-t border-[#D1DCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[#0F2340] font-semibold text-xs uppercase tracking-widest">
            Partners &amp; Affiliations
          </span>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mt-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Network of Partners
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {partners.map(({ name, logo, url }) => (
            <Link key={name} href={url}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-all hover:-translate-y-1">
              <div className="relative w-20 h-14 sm:w-24 sm:h-16 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                <Image
                  src={logo}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <span className="text-[#8896B3] text-xs group-hover:text-[#0F2340] transition-colors font-medium">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
