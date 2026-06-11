// 사이트 절대 URL (SEO·OG·sitemap용). Vercel 배포 도메인으로 맞추세요.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://global-champion-makers.vercel.app';

/** 로케일에 맞는 문자열 선택 */
export function localized(locale: string, ko: string, en: string): string {
  return locale === 'ko' ? ko : en;
}
