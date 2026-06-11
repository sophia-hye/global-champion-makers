import { setRequestLocale } from 'next-intl/server';
import { TracksHero } from '@/components/tracks/TracksHero';
import { TracksIntro } from '@/components/tracks/TracksIntro';
import { TrackDetail } from '@/components/tracks/TrackDetail';
import { TracksCta } from '@/components/tracks/TracksCta';

export default async function TracksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TracksHero />
      <TracksIntro />
      <TrackDetail
        trackKey="track1"
        tone="cream-dark"
        visualClass="bg-gradient-to-br from-brand-dark to-brand"
        image="/images/track1.jpg"
      />
      <TrackDetail
        trackKey="track2"
        reversed
        tone="light"
        visualClass="bg-gradient-to-br from-brand to-brand-mid"
        image="/images/track2.jpg"
      />
      <TrackDetail
        trackKey="track3"
        tone="cream-dark"
        visualClass="bg-gradient-to-br from-brand-mid via-brand to-[#7a6322]"
        image="/images/track3.jpg"
      />
      <TracksCta />
    </>
  );
}
