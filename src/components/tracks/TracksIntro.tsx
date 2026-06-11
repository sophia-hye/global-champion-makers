import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';

export function TracksIntro() {
  const t = useTranslations('tracks.intro');

  return (
    <Section tone="light">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className="display-title max-w-3xl text-3xl leading-tight md:text-4xl">
          {t('title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-brand/75 md:text-lg">
          {t('body')}
        </p>

        {/* Junior start → 3 branches */}
        <div className="mt-6 flex w-full max-w-3xl flex-col items-center">
          <span className="rounded-full bg-brand px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-cream">
            GCM Junior Start
          </span>
          <span className="h-8 w-px bg-soft-line" />
          <div className="grid w-full grid-cols-3 gap-3">
            {['01', '02', '03'].map((no) => (
              <div key={no} className="flex flex-col items-center">
                <span className="h-6 w-px bg-soft-line" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold font-display text-sm font-bold text-gold">
                  {no}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
