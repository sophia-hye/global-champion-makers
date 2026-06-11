import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/AboutHero';
import { Philosophy } from '@/components/about/Philosophy';
import { TracksSection } from '@/components/about/TracksSection';
import { Approach } from '@/components/about/Approach';
import { Vision } from '@/components/about/Vision';

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
