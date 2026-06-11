import { useTranslations } from 'next-intl';

const steps = ['step1', 'step2', 'step3', 'step4'] as const;

export function ProcessTimeline() {
  const t = useTranslations('programs.process');

  return (
    <section className="bg-brand-dark text-cream">
      <div className="container-content py-20 md:py-28">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="display-title text-3xl leading-tight md:text-4xl">{t('title')}</h2>
          <p className="text-base text-cream/75 md:text-lg">{t('body')}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <div key={step} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-extrabold text-gold-soft">
                  {t(`${step}.no`)}
                </span>
                <span className="h-px flex-1 bg-cream/15" />
              </div>
              <h3 className="font-display text-lg font-bold">{t(`${step}.title`)}</h3>
              <span className="text-sm font-semibold text-gold-soft">
                {t(`${step}.subtitle`)}
              </span>
              <p className="text-sm leading-relaxed text-cream/70">{t(`${step}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
