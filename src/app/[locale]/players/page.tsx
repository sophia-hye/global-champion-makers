import { setRequestLocale } from 'next-intl/server';
import { PlayersHero } from '@/components/players/PlayersHero';
import { ResultsBand } from '@/components/players/ResultsBand';
import { PlayerRoster } from '@/components/players/PlayerRoster';
import { Testimonials } from '@/components/players/Testimonials';
import { PlayersCta } from '@/components/players/PlayersCta';

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
