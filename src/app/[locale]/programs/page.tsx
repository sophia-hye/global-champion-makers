import { setRequestLocale } from 'next-intl/server';
import { ProgramsHero } from '@/components/programs/ProgramsHero';
import { Pillars } from '@/components/programs/Pillars';
import { ProcessTimeline } from '@/components/programs/ProcessTimeline';
import { ProgramsCta } from '@/components/programs/ProgramsCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '프로그램' : 'Programs',
    description:
      locale === 'ko'
        ? '멘탈 웰니스, 다각도 데이터 전략, 전인적 매니지먼트 — 180일 성장 프로세스.'
        : 'Mental wellness, multi-angle data strategy, total management — a 180-day process.',
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProgramsHero />
      <Pillars />
      <ProcessTimeline />
      <ProgramsCta />
    </>
  );
}
