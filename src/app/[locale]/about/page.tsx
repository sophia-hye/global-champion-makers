import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/AboutHero';
import { Philosophy } from '@/components/about/Philosophy';
import { TracksSection } from '@/components/about/TracksSection';
import { Approach } from '@/components/about/Approach';
import { Vision } from '@/components/about/Vision';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '브랜드 스토리' : 'About',
    description:
      locale === 'ko'
        ? '코트의 압박을 넘어 인생의 챔피언으로. GCM의 브랜드 철학과 3-Track 로드맵.'
        : "Beyond the court's pressure to champions in life. GCM's philosophy and 3-track roadmap.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Philosophy />
      <TracksSection />
      <Approach />
      <Vision />
    </>
  );
}
