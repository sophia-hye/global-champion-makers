import { useTranslations } from 'next-intl';

export function PlayersHero() {
  const t = useTranslations('players.hero');

  return (
    <section className="relative overflow-hidden bg-brand-dark text-cream">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/trophy.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
      <div className="container-content relative flex flex-col gap-6 py-24 md:py-32">
        <span className="eyebrow">Players</span>
        <h1 className="display-title max-w-4xl text-4xl leading-[1.12] md:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
          {t('body')}
        </p>
      </div>
    </section>
  );
}
