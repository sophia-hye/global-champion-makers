'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export function LanguageToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: string) => {
    if (next === locale) return;
    // @ts-expect-error -- pathname + params route compatibility
    router.replace({ pathname, params }, { locale: next });
  };

  const idle = tone === 'dark' ? 'text-cream/50' : 'text-brand/40';
  const active = tone === 'dark' ? 'text-cream' : 'text-brand';

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 ? <span className={idle}>/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            className={`uppercase transition-colors hover:opacity-80 ${
              loc === locale ? active : idle
            }`}
            aria-current={loc === locale}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
