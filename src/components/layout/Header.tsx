'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageToggle } from './LanguageToggle';

const navItems = [
  { key: 'about', href: '/about' },
  { key: 'tracks', href: '/tracks' },
  { key: 'programs', href: '/programs' },
  { key: 'players', href: '/players' },
  { key: 'schedule', href: '/schedule' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft-line/60 bg-cream/85 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-brand"
        >
          {t('brand')}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-brand/70 transition-colors hover:text-brand"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageToggle />
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-mid"
          >
            {t('cta')}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 bg-brand" />
            <span className="h-0.5 w-6 bg-brand" />
            <span className="h-0.5 w-6 bg-brand" />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-soft-line/60 bg-cream lg:hidden">
          <nav className="container-content flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="py-3 text-base font-medium text-brand/80"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-soft-line/60 pt-4">
              <LanguageToggle />
              <Link
                href="/contact"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream"
                onClick={() => setOpen(false)}
              >
                {t('cta')}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
