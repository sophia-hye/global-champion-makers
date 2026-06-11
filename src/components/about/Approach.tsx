import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const items = [
  { key: 'item1', icon: '🌱' },
  { key: 'item2', icon: '📊' },
  { key: 'item3', icon: '🤝' },
] as const;

export function Approach() {
  const t = useTranslations('about.approach');

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="The GCM Approach" title={t('title')} body={t('body')} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-col gap-4 rounded-2xl border border-soft-line bg-cream-dark p-8"
            >
              <span className="text-3xl" aria-hidden>
                {item.icon}
              </span>
              <h3 className="font-display text-lg font-bold text-brand">
                {t(`${item.key}.title`)}
              </h3>
              <span className="text-sm font-semibold text-gold">
                {t(`${item.key}.subtitle`)}
              </span>
              <p className="text-sm leading-relaxed text-brand/70">
                {t(`${item.key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
