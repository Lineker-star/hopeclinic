export const dynamic = 'force-dynamic';
export const revalidate = 0;
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import WelcomeSection from '@/components/home/WelcomeSection';
import DepartmentsGrid from '@/components/home/DepartmentsGrid';
import WorkingHours from '@/components/home/WorkingHours';
import FeaturedDoctors from '@/components/home/FeaturedDoctors';
import EmergencyBanner from '@/components/home/EmergencyBanner';
import BlogPreview from '@/components/home/BlogPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MercyWorksSection from '@/components/home/MercyWorksSection';
import CTABooking from '@/components/home/CTABooking';
import PartnersSection from '@/components/home/PartnersSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hope Clinic Koumé — Healthcare for Everyone | CMFI Mercy Works',
  description: 'Quality medical care in Bertoua, Cameroon. Emergency: +237 650 441 422. Hope Clinic Koumé — Healing Body, Mind & Spirit.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WelcomeSection />
      <DepartmentsGrid />
      <WorkingHours />
      <FeaturedDoctors />
      <EmergencyBanner />
      <BlogPreview />
      <TestimonialsSection />
      <MercyWorksSection />
      <PartnersSection />
      <CTABooking />
    </>
  );
}
