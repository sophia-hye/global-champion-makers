import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

export function TracksTeaser() {
  const t = useTranslations('home.tracksTeaser');
  const c = useTranslations('common');

  const cards = [
    { no: '01', name: 'The Pro Highway', desc: t('track1') },
    { no: '02', name: 'The Ivy Admission', desc: t('track2') },
    { no: '03', name: 'The Global Elite Hobby', desc: t('track3') },
  ];

  return (
    <Section tone="cream-dark">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="3-Track Roadmap" title={t('title')} body={t('body')} />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.no}
              className="flex flex-col gap-4 rounded-2xl border border-soft-line bg-cream p-7 transition-shadow hover:shadow-lg"
            >
              <span className="font-display text-sm font-bold text-gold">{card.no}</span>
              <h3 className="font-display text-xl font-bold text-brand">{card.name}</h3>
              <p className="text-sm leading-relaxed text-brand/70">{card.desc}</p>
            </div>
          ))}
        </div>
        <ButtonLink href="/tracks" variant="ghost" className="text-gold">
          {c('viewTracks')} &rarr;
        </ButtonLink>
      </div>
    </Section>
  );
}
