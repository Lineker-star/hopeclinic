export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

/**
 * Google OAuth for admin — redirects to Google's consent screen.
 * Requires GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI in .env.local.
 * For now, redirects back to login with a message if not configured.
 */
export async function GET() {
  const clientId    = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/auth/google/callback`;

  if (!clientId) {
    // Google OAuth not configured — redirect back to login
    return NextResponse.redirect(
      new URL('/admin-hck-2025?error=google_not_configured',
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
    );
  }

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: 'code',
    scope:         'openid email profile',
    access_type:   'offline',
    prompt:        'select_account',
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
