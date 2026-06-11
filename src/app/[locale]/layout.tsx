import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';
  const title = isKo
    ? '미국 대학 테니스 진학 · 멘탈 웰니스 아카데미 | GCM'
    : 'US College Tennis & Mental Wellness Academy | GCM';
  const description = isKo
    ? '미국 대학 테니스 진학과 멘탈 웰니스를 결합한 프리미엄 스포츠 교육 아카데미. 데이터와 웰니스가 만나는 곳, GCM.'
    : 'A premium sports academy uniting US college tennis admissions with mental wellness. Where data meets wellness — GCM.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | GCM',
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: '/ko', en: '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Global Champions Makers',
      title,
      description,
      url: `/${locale}`,
      images: [{ url: '/images/campus.jpg', width: 1200, height: 630, alt: 'GCM' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
