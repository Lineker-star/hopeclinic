export const dynamic = 'force-dynamic';
export const revalidate = 0;
import type { Metadata } from 'next';
import DoctorsClient from './DoctorsClient';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description: 'Meet the dedicated specialist doctors at Hope Clinic Koumé — expert medical professionals committed to your wellbeing.',
};

export default function DoctorsPage() {
  return <DoctorsClient />;
}
