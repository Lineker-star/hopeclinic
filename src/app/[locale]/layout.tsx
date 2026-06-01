import type { Metadata } from 'next';
import { Cormorant_Garamond, Nunito } from 'next/font/google';
import '../globals.css';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
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
    'Hope Clinic Koumé is a Christian medical clinic in Bertoua, Cameroon providing quality healthcare through the Mercy Works Department of the ZTF Foundation. Emergency: +237 650 441 422',
  keywords: [
    'Hope Clinic', 'Bertoua', 'Cameroon', 'Healthcare', 'CMFI',
    'Mercy Works', 'ZTF Foundation', 'Koumé', 'Hospital Bertoua',
  ],
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

  return (
    <html lang={locale} className={`${cormorant.variable} ${nunito.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), Nunito, sans-serif' }} className="bg-[#F9F6F1] text-[#1A1A1A] antialiased">
        <TopBar />
        <Navbar />
        <main className="pt-[88px]">
          {children}
        </main>
        <Footer />
        <EmergencyFloat />
      </body>
    </html>
  );
}
