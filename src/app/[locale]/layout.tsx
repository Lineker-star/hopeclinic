import type { Metadata } from 'next';
import { Cormorant_Garamond, Nunito } from 'next/font/google';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import NewsBar from '@/components/layout/NewsBar';
import Footer from '@/components/layout/Footer';
import EmergencyFloat from '@/components/ui/EmergencyFloat';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Hope Clinic Koumé — CMFI Healthcare',
    default: 'Hope Clinic Koumé — Healthcare for Everyone | CMFI Mercy Works',
  },
  description:
    'Hope Clinic Koumé — 68,791 patients treated over 10 years. Quality healthcare in Bertoua, Cameroon. Emergency 24/7: +237 650 441 422.',
  keywords: ['Hope Clinic', 'Bertoua', 'Cameroon', 'Healthcare', 'CMFI', 'Mercy Works', 'ZTF Foundation'],
  openGraph: {
    type: 'website',
    siteName: 'Hope Clinic Koumé',
    images: [{ url: '/images/Hope_Clinic_logo.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Set lang + font variables on a wrapper div (html/body provided by root layout)
  return (
    <div
      lang={locale}
      className={`${cormorant.variable} ${nunito.variable} bg-[#F8FAFF] text-[#1A1A2E] antialiased`}
      style={{ fontFamily: 'var(--font-body), Nunito, sans-serif', minHeight: '100vh' }}
    >
      <TopBar />
      <Navbar />
      <div className="fixed left-0 right-0 z-30" style={{ top: '100px' }}>
        <NewsBar />
      </div>
      <main className="pt-[136px]">
        {children}
      </main>
      <Footer />
      <EmergencyFloat />
    </div>
  );
}
