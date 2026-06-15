import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { PILLAR_ICONS } from '@/components/ui/icons';

export function ProgramsTeaser() {
  const t = useTranslations('home.programsTeaser');
  const c = useTranslations('common');

  const items = [t('item1'), t('item2'), t('item3')];

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="Programs" title={t('title')} body={t('body')} />
        <div className="flex flex-wrap gap-3">
          {items.map((label, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <span
                key={label}
                className="inline-flex items-center gap-2.5 rounded-full border border-soft-line bg-cream-dark px-5 py-2.5 text-sm font-semibold text-brand"
              >
                <Icon className="h-4 w-4 text-gold" aria-hidden />
                {label}
              </span>
            );
          })}
        </div>
        <ButtonLink href="/programs" variant="ghost" className="text-gold">
          {c('viewPrograms')} &rarr;
        </ButtonLink>
      </div>
    </Section>
  );
}
