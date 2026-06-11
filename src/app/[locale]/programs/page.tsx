import { setRequestLocale } from 'next-intl/server';
import { ProgramsHero } from '@/components/programs/ProgramsHero';
import { Pillars } from '@/components/programs/Pillars';
import { ProcessTimeline } from '@/components/programs/ProcessTimeline';
import { ProgramsCta } from '@/components/programs/ProgramsCta';

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
