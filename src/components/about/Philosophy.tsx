import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function Philosophy() {
  const t = useTranslations('about.philosophy');

  return (
    <Section tone="light">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Why Tennis</span>
          <h2 className="display-title text-3xl leading-tight md:text-4xl">{t('title')}</h2>
        </div>
        <p className="text-base leading-relaxed text-brand/75 md:text-lg">{t('body')}</p>
      </div>
    </Section>
  );
}
