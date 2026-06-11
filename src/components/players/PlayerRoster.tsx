import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const keys = ['player1', 'player2', 'player3', 'player4'] as const;

export function PlayerRoster() {
  const t = useTranslations('players.roster');

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} body={t('body')} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key) => (
            <div
              key={key}
              className="flex flex-col overflow-hidden rounded-2xl border border-soft-line bg-cream-dark"
            >
              <div className="relative flex aspect-[4/5] items-end bg-gradient-to-br from-brand-dark to-brand p-5">
                <span className="absolute right-5 top-5 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-cream/80">
                  {t(`${key}.year`)}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-2xl font-bold text-cream">
                    {t(`${key}.name`)}
                  </span>
                  <span className="text-sm font-semibold text-gold-soft">
                    {t(`${key}.utr`)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-brand/75">{t(`${key}.path`)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-brand/45">{t('note')}</p>
      </div>
    </Section>
  );
}
