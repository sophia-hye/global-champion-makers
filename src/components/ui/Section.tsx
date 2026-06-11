type Tone = 'light' | 'dark' | 'cream-dark';

const tones: Record<Tone, string> = {
  light: 'bg-cream text-brand',
  'cream-dark': 'bg-cream-dark text-brand',
  dark: 'bg-brand-dark text-cream',
};

type SectionProps = {
  tone?: Tone;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

export function Section({
  tone = 'light',
  className = '',
  id,
  children,
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  );
}
