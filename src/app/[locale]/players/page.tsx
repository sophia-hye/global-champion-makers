import { setRequestLocale } from 'next-intl/server';
import { PlayersHero } from '@/components/players/PlayersHero';
import { ResultsBand } from '@/components/players/ResultsBand';
import { PlayerRoster } from '@/components/players/PlayerRoster';
import { Testimonials } from '@/components/players/Testimonials';
import { PlayersCta } from '@/components/players/PlayersCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '선수·성과' : 'Players',
    description:
      locale === 'ko'
        ? '데이터가 증명하는 GCM 선수들의 성장 기록과 진학 사례.'
        : 'Growth records and admission cases of GCM athletes, proven by data.',
  };
}

export default async function PlayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PlayersHero />
      <ResultsBand />
      <PlayerRoster />
      <Testimonials />
      <PlayersCta />
    </>
  );
}
