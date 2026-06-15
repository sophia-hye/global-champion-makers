import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import type { ComponentProps } from 'react';

type TrackDetailProps = {
  trackKey: 'track1' | 'track2' | 'track3';
  reversed?: boolean;
  tone?: 'light' | 'cream-dark';
  visualClass: string;
  image?: string;
  href?: ComponentProps<typeof ButtonLink>['href'];
};

export function TrackDetail({
  trackKey,
  reversed = false,
  tone = 'light',
  visualClass,
  image,
  href,
}: TrackDetailProps) {
  const t = useTranslations(`tracks.items.${trackKey}`);
  const c = useTranslations('common');
  const points = [t('point1'), t('point2'), t('point3')];

  return (
    <Section tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <div className={reversed ? 'lg:order-2' : ''}>
          <div
            className={`relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-cover bg-center p-8 ${visualClass}`}
            style={image ? { backgroundImage: `url('${image}')` } : undefined}
          >
            {image ? (
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
            ) : null}
            <span className="relative font-display text-[6rem] font-extrabold leading-none text-cream/15">
              {t('no')}
            </span>
            <span className="absolute right-8 top-8 font-display text-lg font-bold text-cream/90">
              {t('name')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col gap-5 ${reversed ? 'lg:order-1' : ''}`}>
          <span className="eyebrow">Track {t('no')}</span>
          <h3 className="display-title text-3xl text-brand md:text-4xl">
            {t('name')}
            <span className="ml-3 text-lg font-medium text-brand/45">{t('nameKo')}</span>
          </h3>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            {t('target')}
          </p>
          <p className="text-base leading-relaxed text-brand/75">{t('body')}</p>
          <ul className="mt-2 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-brand/80">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] text-cream">
                  &#10003;
                </span>
                {point}
              </li>
            ))}
          </ul>
          {href ? (
            <ButtonLink href={href} variant="ghost" className="mt-1 text-gold">
              {c('viewMore')} &rarr;
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
