// Pass-through root layout — all HTML structure is in src/app/[locale]/layout.tsx
// next-intl middleware routes all requests through [locale], so this is only
// reached by Next.js internals (e.g. static file resolution).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
