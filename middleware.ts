import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { verifyAdminToken } from './src/lib/admin/auth';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin route protection ──
  if (pathname.startsWith('/admin-hck-2025')) {
    // Login + OTP pages are public (no auth needed)
    const publicAdminPaths = ['/admin-hck-2025', '/admin-hck-2025/verify-otp'];
    if (publicAdminPaths.includes(pathname)) {
      return NextResponse.next();
    }

    // All /admin-hck-2025/dashboard/** requires valid session
    const token = req.cookies.get('admin_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin-hck-2025', req.url));
    }
    const session = await verifyAdminToken(token);
    if (!session) {
      const res = NextResponse.redirect(new URL('/admin-hck-2025', req.url));
      res.cookies.delete('admin_session');
      return res;
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
