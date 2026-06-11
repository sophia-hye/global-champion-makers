import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

export function TracksCta() {
  const t = useTranslations('tracks.cta');

  return (
    <section className="bg-gold">
      <div className="container-content flex flex-col items-center gap-6 py-20 text-center md:py-24">
        <h2 className="display-title max-w-2xl text-3xl leading-tight text-brand-dark md:text-4xl">
          {t('title')}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-brand-dark/80 md:text-lg">
          {t('body')}
        </p>
        <ButtonLink
          href="/contact"
          variant="primary"
          className="mt-2 bg-brand-dark text-cream hover:bg-brand"
        >
          {t('button')}
        </ButtonLink>
      </div>
    </section>
  );
}
