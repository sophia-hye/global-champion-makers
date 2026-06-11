import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const keys = ['item1', 'item2', 'item3'] as const;

const images: Partial<Record<(typeof keys)[number], string>> = {
  item1: '/images/program-wellness.jpg',
  item2: '/images/program-data.jpg',
  item3: '/images/program-management.jpg',
};

export function Pillars() {
  const t = useTranslations('programs');
  const p = useTranslations('programs.pillars');

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={t('intro.eyebrow')}
          title={t('intro.title')}
          body={t('intro.body')}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {keys.map((key) => {
            const image = images[key];
            return (
              <div
                key={key}
                className="flex flex-col overflow-hidden rounded-2xl border border-soft-line bg-cream-dark"
              >
                {/* Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {image ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-mid" />
                  )}
                  <span className="absolute bottom-4 left-5 text-3xl" aria-hidden>
                    {p(`${key}.icon`)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-5 p-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand">
                      {p(`${key}.title`)}
                    </h3>
                    <span className="text-sm font-semibold text-gold">
                      {p(`${key}.subtitle`)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-brand/70">{p(`${key}.body`)}</p>
                  <ul className="mt-auto flex flex-col gap-2.5 border-t border-soft-line pt-5">
                    {['feature1', 'feature2', 'feature3'].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-brand/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {p(`${key}.${f}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
