import { useTranslations } from 'next-intl';

export function ContactInfo() {
  const t = useTranslations('contact.info');

  const rows = [
    { label: t('hoursLabel'), value: t('hours') },
    { label: t('responseLabel'), value: t('response') },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className="display-title text-2xl text-brand md:text-3xl">{t('title')}</h2>
      </div>

      <dl className="flex flex-col gap-5">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 border-t border-soft-line pt-4">
            <dt className="text-sm font-semibold text-gold">{row.label}</dt>
            <dd className="text-base text-brand/80">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-2xl bg-brand p-6 text-cream">
        <span className="text-sm font-semibold text-gold-soft">{t('b2bLabel')}</span>
        <p className="mt-2 text-sm leading-relaxed text-cream/80">{t('b2bBody')}</p>
      </div>
    </div>
  );
}
