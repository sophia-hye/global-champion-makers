import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const explore = [
  { key: 'about', href: '/about' },
  { key: 'tracks', href: '/tracks' },
  { key: 'programs', href: '/programs' },
  { key: 'players', href: '/players' },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-brand-dark text-cream">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            {t('nav.brand')}
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-cream/70">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="eyebrow">{t('footer.explore')}</span>
          {explore.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-cream/70 transition-colors hover:text-cream"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="eyebrow">{t('footer.connect')}</span>
          <Link
            href="/contact"
            className="text-sm text-cream/70 transition-colors hover:text-cream"
          >
            {t('nav.contact')}
          </Link>
          <Link
            href="/schedule"
            className="text-sm text-cream/70 transition-colors hover:text-cream"
          >
            {t('nav.schedule')}
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/50">{t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-cream/50 transition-colors hover:text-cream"
            >
              {t('footer.terms')}
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-cream/50 transition-colors hover:text-cream"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
