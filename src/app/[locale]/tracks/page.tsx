import { setRequestLocale, getTranslations } from 'next-intl/server';
import { TracksHero } from '@/components/tracks/TracksHero';
import { TracksIntro } from '@/components/tracks/TracksIntro';
import { TrackDetail } from '@/components/tracks/TrackDetail';
import { TracksCta } from '@/components/tracks/TracksCta';
import { tracksLd } from '@/lib/jsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '3-Track 로드맵' : 'Tracks',
    description:
      locale === 'ko'
        ? '프로의 길, 미국·해외 명문대 입시, 프리미엄 취미 — 아이에게 맞는 세 갈래의 길.'
        : 'The Pro Highway, Ivy Admission, and Global Elite Hobby — three roads for your child.',
  };
}

export default async function TracksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('tracks.items');
  const ld = tracksLd(locale, [
    { name: t('track1.name'), description: t('track1.body') },
    { name: t('track2.name'), description: t('track2.body') },
    { name: t('track3.name'), description: t('track3.body') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
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
