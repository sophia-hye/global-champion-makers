import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLAR_ICONS } from '@/components/ui/icons';

const items = ['item1', 'item2', 'item3'] as const;

export function Approach() {
  const t = useTranslations('about.approach');

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="The GCM Approach" title={t('title')} body={t('body')} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((key, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div
                key={key}
                className="flex flex-col gap-4 rounded-2xl border border-soft-line bg-cream-dark p-8"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10"
                  aria-hidden
                >
                  <Icon className="h-6 w-6 text-brand" />
                </span>
                <h3 className="font-display text-lg font-bold text-brand">
                  {t(`${key}.title`)}
                </h3>
                <span className="text-sm font-semibold text-gold">
                  {t(`${key}.subtitle`)}
                </span>
                <p className="text-sm leading-relaxed text-brand/70">{t(`${key}.body`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
