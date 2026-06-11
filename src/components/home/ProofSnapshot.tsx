import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

export function ProofSnapshot() {
  const t = useTranslations('home.proof');
  const c = useTranslations('common');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-dark text-cream">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/proof.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark" />
      <div className="container-content relative py-20 md:py-28">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow">Proof</span>
          <h2 className="display-title text-3xl leading-tight md:text-4xl">{t('title')}</h2>
          <p className="text-lg text-cream/75">{t('body')}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-cream/10 bg-cream/5 p-7"
            >
              <div className="font-display text-3xl font-extrabold text-gold-soft md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-cream/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="mt-14 max-w-2xl text-xl font-medium leading-relaxed text-cream/90 md:text-2xl">
          {t('quote')}
          <footer className="mt-3 text-sm font-normal text-cream/50">{t('quoteBy')}</footer>
        </blockquote>

        <div className="mt-10">
          <ButtonLink href="/players" variant="secondary">
            {c('viewPlayers')} &rarr;
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
