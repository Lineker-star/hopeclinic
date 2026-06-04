import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
);

async function isValidJwt(token: string): Promise<boolean> {
  try { await jwtVerify(token, SECRET); return true; }
  catch { return false; }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin route protection ──
  if (pathname.startsWith('/admin-hck-2025')) {
    // Login and OTP pages are always public
    const publicPaths = ['/admin-hck-2025', '/admin-hck-2025/verify-otp', '/admin-hck-2025/setup-totp'];
    if (publicPaths.includes(pathname)) return NextResponse.next();

    // API auth routes are always public
    if (pathname.startsWith('/api/admin/auth')) return NextResponse.next();

    // Dashboard + all other admin pages require a valid session
    const sessionToken = req.cookies.get('admin_session')?.value;
    if (!sessionToken || !(await isValidJwt(sessionToken))) {
      return NextResponse.redirect(new URL('/admin-hck-2025', req.url));
    }
    return NextResponse.next();
  }

  // ── i18n middleware for all public routes ──
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/admin-hck-2025/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
