import { useTranslations } from 'next-intl';
import { ButtonLink } from './Button';

type StubPageProps = {
  namespace: 'tracks' | 'programs' | 'players' | 'schedule' | 'contact';
  eyebrow: string;
};

export function StubPage({ namespace, eyebrow }: StubPageProps) {
  const t = useTranslations(`${namespace}.hero`);
  const c = useTranslations('common');

  return (
    <section className="bg-brand-dark text-cream">
      <div className="container-content flex min-h-[70vh] flex-col justify-center gap-6 py-24">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-title max-w-3xl text-4xl leading-tight md:text-5xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
          {t('body')}
        </p>
        <p className="text-sm text-cream/40">{c('comingSoon')}</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary">
            {c('bookConsult')}
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            {c('backHome')}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
