import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/auth/signin',
  '/auth/signup',
  '/admin/login',
  '/api/auth',
  '/api/health',
  '/verify',
] as const;

export function matchesRoute(pathname: string, route: string): boolean {
  if (route === '/') return pathname === '/';
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isAdminRoute(pathname: string): boolean {
  if (matchesRoute(pathname, '/admin/login')) return false;
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

const RATE_LIMITED_ROUTES: Array<{
  path: string;
  config: typeof RATE_LIMITS.signup;
}> = [{ path: '/api/auth/signup', config: RATE_LIMITS.signup }];

const isProd = process.env.NODE_ENV === 'production';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=() ',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  ...(isProd
    ? { 'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload' }
    : {}),
};

function getCspDirectives(nonce?: string): string {
  const scriptSrc = isProd
    ? nonce
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
      : "script-src 'self'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}

function createNextResponse(request: NextRequest, nonce?: string): NextResponse {
  const requestHeaders = new Headers(request.headers);
  if (nonce) requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  applySecurityHeaders(response, nonce);
  return response;
}

function applySecurityHeaders(response: NextResponse, nonce?: string): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value.trim());
  }
  response.headers.set('Content-Security-Policy', getCspDirectives(nonce));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const route of RATE_LIMITED_ROUTES) {
    if (!matchesRoute(pathname, route.path)) continue;

    const ip = getClientIp(request);
    const result = checkRateLimit(`rl:${route.path}:${ip}`, route.config);
    if (!result.allowed) {
      const response = NextResponse.json(
        { error: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
          },
        }
      );
      applySecurityHeaders(response);
      return response;
    }
  }

  const nonce = isProd ? btoa(crypto.randomUUID()) : undefined;

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return createNextResponse(request, nonce);
  }

  if (PUBLIC_ROUTES.some((route) => matchesRoute(pathname, route))) {
    if (pathname === '/') {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (token) {
        const response = NextResponse.redirect(new URL('/dashboard', request.url));
        applySecurityHeaders(response, nonce);
        return response;
      }
    }

    return createNextResponse(request, nonce);
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', `${pathname}${request.nextUrl.search}`);
    const response = NextResponse.redirect(signInUrl);
    applySecurityHeaders(response, nonce);
    return response;
  }

  if (isAdminRoute(pathname) && token.role !== 'ADMIN') {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    applySecurityHeaders(response, nonce);
    return response;
  }

  return createNextResponse(request, nonce);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
