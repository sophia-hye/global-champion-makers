import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVisual } from './HeroVisual';

export function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-brand-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(70,119,106,0.35),transparent_55%)]" />
      <div className="container-content relative grid gap-12 py-24 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6 animate-fade-up">
          <span className="eyebrow">Global Champions Makers</span>
          <h1 className="display-title text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="text-lg font-medium text-gold-soft">{t('slogan')}</p>
          <p className="max-w-xl text-base leading-relaxed text-cream/75">
            {t('body')}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" variant="primary">
              {t('ctaPrimary')}
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </div>

        {/* Visual concept: 흑백 코트 → 컬러 캠퍼스 전환 (Framer Motion) */}
        <HeroVisual />
      </div>
    </section>
  );
}
