// Root layout — provides the required <html> and <body> wrapper for Next.js.
// Public pages get their lang/font/styling from [locale]/layout.tsx (nested).
// Admin pages get their styling from admin-hck-2025/layout.tsx (nested).
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
