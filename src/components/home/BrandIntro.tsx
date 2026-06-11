import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

export function BrandIntro() {
  const t = useTranslations('home.brandIntro');
  const c = useTranslations('common');

  return (
    <Section tone="light">
      <div className="flex max-w-3xl flex-col gap-6">
        <span className="eyebrow">About GCM</span>
        <h2 className="display-title text-3xl leading-tight md:text-4xl">
          {t('title')}
        </h2>
        <p className="text-lg leading-relaxed text-brand/75">{t('body')}</p>
        <ButtonLink href="/about" variant="ghost" className="text-gold">
          {c('viewStory')} &rarr;
        </ButtonLink>
      </div>
    </Section>
  );
}
