import type { Metadata } from 'next';
import '../../app/globals.css';

export const metadata: Metadata = {
  title: { template: '%s — Hope Clinic Admin', default: 'Hope Clinic Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
