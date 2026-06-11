import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const keys = ['stat1', 'stat2', 'stat3', 'stat4'] as const;

export function ResultsBand() {
  const t = useTranslations('players.results');

  return (
    <Section tone="cream-dark">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center gap-2 rounded-2xl border border-soft-line bg-cream p-8 text-center"
            >
              <span className="font-display text-3xl font-extrabold text-brand md:text-4xl">
                {t(`${key}.value`)}
              </span>
              <span className="text-sm text-brand/60">{t(`${key}.label`)}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
