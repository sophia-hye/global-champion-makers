import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TracksTabs } from './TracksTabs';

export function TracksSection() {
  const t = useTranslations('about.tracks');

  return (
    <Section tone="cream-dark">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Core Valuable Tracks"
          title={t('title')}
          body={t('body')}
          align="center"
        />
        <TracksTabs />
      </div>
    </Section>
  );
}
