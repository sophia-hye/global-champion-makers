import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

export function ProgramsTeaser() {
  const t = useTranslations('home.programsTeaser');
  const c = useTranslations('common');

  const items = [
    { label: t('item1'), icon: '🌱' },
    { label: t('item2'), icon: '📊' },
    { label: t('item3'), icon: '🤝' },
  ];

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="Programs" title={t('title')} body={t('body')} />
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-soft-line bg-cream-dark px-5 py-2.5 text-sm font-semibold text-brand"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
        <ButtonLink href="/programs" variant="ghost" className="text-gold">
          {c('viewPrograms')} &rarr;
        </ButtonLink>
      </div>
    </Section>
  );
}
