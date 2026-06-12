import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { isLanguageSwitcherEnabled } from './lib/settings';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 은 i18n 라우팅에서 제외 (locale 밖 관리자 전용 경로)
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 언어 설정 미사용 시: 영어만 노출 (/ko → /en, / → /en)
  const langEnabled = await isLanguageSwitcherEnabled();
  if (!langEnabled) {
    if (pathname === '/' || pathname === '') {
      const url = request.nextUrl.clone();
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }
    if (pathname === '/ko' || pathname.startsWith('/ko/')) {
      const url = request.nextUrl.clone();
      url.pathname = '/en' + pathname.slice(3);
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API, Next internals, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
