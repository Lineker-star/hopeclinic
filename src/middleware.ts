import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths EXCEPT: admin panel, API routes, Next.js internals, static files
    '/((?!admin-hck-2025|api|_next|_vercel|.*\\..*).*)',
  ],
};
