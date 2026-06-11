import { Link } from '@/i18n/navigation';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-brand-dark hover:bg-gold-soft',
  secondary:
    'border border-cream/40 text-cream hover:bg-cream/10 focus-visible:ring-offset-brand-dark',
  ghost: 'text-brand underline-offset-4 hover:underline px-0 py-0',
};

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  className = '',
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
