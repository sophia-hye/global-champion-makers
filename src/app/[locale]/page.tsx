import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { BrandIntro } from '@/components/home/BrandIntro';
import { TracksTeaser } from '@/components/home/TracksTeaser';
import { ProgramsTeaser } from '@/components/home/ProgramsTeaser';
import { ProofSnapshot } from '@/components/home/ProofSnapshot';
import { FinalCta } from '@/components/home/FinalCta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <BrandIntro />
      <TracksTeaser />
      <ProgramsTeaser />
      <ProofSnapshot />
      <FinalCta />
    </>
  );
}
