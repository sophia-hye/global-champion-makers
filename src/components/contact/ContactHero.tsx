import { useTranslations } from 'next-intl';

export function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <section className="relative overflow-hidden bg-brand-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(70,119,106,0.3),transparent_55%)]" />
      <div className="container-content relative flex flex-col gap-6 py-24 md:py-28">
        <span className="eyebrow">Contact</span>
        <h1 className="display-title max-w-3xl text-4xl leading-[1.12] md:text-5xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
          {t('body')}
        </p>
      </div>
    </section>
  );
}
