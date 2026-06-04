import type { Metadata } from 'next';
// globals.css is already loaded via [locale]/layout.tsx for public routes.
// For admin routes we import it here so Tailwind classes work.
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin — Hope Clinic',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F0F4FF]">{children}</body>
    </html>
  );
}
