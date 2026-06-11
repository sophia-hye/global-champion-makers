import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // /admin 은 i18n 라우팅에서 제외 (locale 밖 관리자 전용 경로)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API, Next internals, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
