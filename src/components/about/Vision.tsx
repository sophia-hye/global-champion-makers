import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

export function Vision() {
  const t = useTranslations('about.vision');
  const c = useTranslations('common');

  return (
    <section className="relative overflow-hidden bg-brand-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(200,162,74,0.18),transparent_55%)]" />
      <div className="container-content relative flex flex-col items-center gap-8 py-24 text-center md:py-32">
        <span className="eyebrow">Vision &amp; Promise</span>
        <h2 className="display-title max-w-4xl text-3xl leading-tight md:text-5xl">
          {t('title')}
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-cream/75 md:text-lg">
          {t('body')}
        </p>
        <ButtonLink href="/contact" variant="primary" className="mt-2">
          {c('bookConsult')}
        </ButtonLink>
      </div>
    </section>
  );
}
