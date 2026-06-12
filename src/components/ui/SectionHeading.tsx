import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  invert = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="display-title text-3xl leading-tight md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {body ? (
        <p className={`text-base leading-relaxed md:text-lg ${invert ? 'text-cream/80' : 'text-brand/75'}`}>
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
