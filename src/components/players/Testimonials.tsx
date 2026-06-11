import { useTranslations } from 'next-intl';

const keys = ['t1', 't2', 't3'] as const;

export function Testimonials() {
  const t = useTranslations('players.testimonials');

  return (
    <section className="bg-brand-dark text-cream">
      <div className="container-content py-20 md:py-28">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="display-title text-3xl leading-tight md:text-4xl">{t('title')}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {keys.map((key) => (
            <blockquote
              key={key}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-cream/10 bg-cream/5 p-7"
            >
              <p className="text-base leading-relaxed text-cream/90">{t(`${key}.quote`)}</p>
              <footer className="text-sm text-cream/50">{t(`${key}.by`)}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
