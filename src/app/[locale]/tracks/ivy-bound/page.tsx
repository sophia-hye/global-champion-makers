import { setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { IVY_BOUND as D } from '@/content/ivyBound';

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Prof\.)\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: 'Ivy Bound — College Admission Consulting',
    description:
      locale === 'ko'
        ? 'GCM Ivy Bound — Admissions Factory를 넘어, 진짜 잠재력을 키우는 미국 명문대 입시 컨설팅.'
        : 'GCM Ivy Bound — US college admission consulting that builds real potential, beyond the "Admissions Factory".',
  };
}

export default async function IvyBoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(70,119,106,0.32),transparent_55%)]" />
        <div className="container-content relative flex flex-col gap-6 py-24 md:py-32">
          <span className="eyebrow">Ivy Bound</span>
          <h1 className="display-title text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="text-gold">{D.hero.brandLead}</span>
            {D.hero.brandRest}
          </h1>
          <p className="font-display text-2xl font-bold leading-tight text-cream md:text-3xl">
            {D.hero.title}
          </p>
          <p className="text-lg font-medium text-gold-soft">{D.hero.tagline}</p>
          <p className="mt-2 text-sm text-cream/55">{D.hero.org}</p>
        </div>
      </section>

      {/* Who We Are */}
      <Section tone="light">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{D.whoWeAre.eyebrow}</span>
            <h2 className="display-title text-3xl leading-tight text-brand md:text-4xl">
              {D.whoWeAre.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-brand/75 md:text-lg">
            {D.whoWeAre.body}
          </p>
        </div>
      </Section>

      {/* The GCM Difference */}
      <Section tone="cream-dark">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 text-center">
          <span className="eyebrow mx-auto">{D.difference.eyebrow}</span>
          <h2 className="display-title text-3xl leading-tight text-brand md:text-4xl">
            {D.difference.title}
          </h2>
          <p className="text-base leading-relaxed text-brand/75 md:text-lg">
            {D.difference.body}
          </p>
        </div>
      </Section>

      {/* Our Approach */}
      <Section tone="light">
        <div className="flex flex-col gap-12">
          <SectionHeading eyebrow={D.approachEyebrow} title={D.approachTitle} />
          <div className="grid gap-6 md:grid-cols-2">
            {D.approach.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-soft-line bg-cream-dark p-7"
              >
                <h3 className="font-display text-lg font-bold leading-snug text-brand">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Data-driven stat */}
      <section className="bg-brand-dark text-cream">
        <div className="container-content flex flex-col items-center gap-4 py-20 text-center md:py-24">
          <span className="eyebrow">Data-Driven Results</span>
          <div className="font-display text-6xl font-extrabold text-gold-soft md:text-7xl">
            {D.stat.value}
          </div>
          <div className="text-lg font-semibold">{D.stat.label}</div>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-cream/75">
            {D.stat.detail}
          </p>
        </div>
      </section>

      {/* Students We Help */}
      <Section tone="cream-dark">
        <div className="flex flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="eyebrow">{D.studentsWeHelp.eyebrow}</span>
            <h2 className="display-title text-3xl leading-tight text-brand md:text-4xl">
              <span className="text-gold">{D.studentsWeHelp.headline}</span>
            </h2>
            <p className="text-base leading-relaxed text-brand/75 md:text-lg">
              {D.studentsWeHelp.intro}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {D.studentsWeHelp.types.map((ty) => (
              <div
                key={ty.label}
                className="flex flex-col gap-2 rounded-2xl border border-soft-line bg-cream p-7"
              >
                <h3 className="font-display text-lg font-bold text-brand">{ty.label}</h3>
                <span className="text-sm font-semibold text-gold">{ty.sub}</span>
                <p className="mt-1 text-sm leading-relaxed text-brand/70">{ty.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How We Achieve — 360 ecosystem + process */}
      <Section tone="light">
        <div className="flex flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="eyebrow">{D.howWeAchieve.eyebrow}</span>
            <h2 className="display-title text-3xl leading-tight text-brand md:text-4xl">
              {D.howWeAchieve.title}
            </h2>
            <p className="text-base leading-relaxed text-brand/75 md:text-lg">
              {D.howWeAchieve.body}
            </p>
          </div>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {D.howWeAchieve.steps.map((step, i) => (
              <li
                key={step.label}
                className="flex flex-col gap-2 rounded-2xl border border-soft-line bg-cream-dark p-6"
              >
                <span className="font-display text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-bold text-brand">{step.label}</h3>
                <p className="text-sm leading-relaxed text-brand/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section tone="cream-dark">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={D.leadership.eyebrow} title="Our Leadership Team" />
          <div className="grid gap-6 md:grid-cols-2">
            {D.leadership.members.map((m) => (
              <div
                key={m.name}
                className="flex gap-5 rounded-2xl border border-soft-line bg-cream p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-cream">
                  {initials(m.name)}
                </span>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand">{m.name}</h3>
                    <p className="text-sm font-semibold text-brand/70">{m.title}</p>
                    <p className="text-xs text-brand/50">{m.org}</p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {m.role}
                  </p>
                  <p className="text-sm leading-relaxed text-brand/70">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* College Consulting Team */}
      <Section tone="light">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={D.consultingTeam.eyebrow}
            title="Our College Consulting Team"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {D.consultingTeam.members.map((m) => (
              <div
                key={m.name}
                className="flex gap-5 rounded-2xl border border-soft-line bg-cream-dark p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-mid font-display text-base font-bold text-cream">
                  {initials(m.name)}
                </span>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand">{m.name}</h3>
                    <p className="text-sm font-semibold text-brand/70">{m.title}</p>
                    <p className="text-xs text-brand/50">{m.org}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-brand/70">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Road to an Ivy League Transfer */}
      <Section tone="cream-dark">
        <div className="flex flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="eyebrow">{D.roadmap.eyebrow}</span>
            <h2 className="display-title text-3xl leading-tight text-brand md:text-4xl">
              {D.roadmap.title}
            </h2>
            <p className="text-base leading-relaxed text-brand/75 md:text-lg">
              {D.roadmap.intro}
            </p>
            <p className="font-semibold text-brand">{D.roadmap.goal}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {D.roadmap.years.map((y) => (
              <div
                key={y.title}
                className="flex flex-col gap-4 rounded-2xl border border-soft-line bg-cream p-7"
              >
                <h3 className="font-display text-lg font-bold text-brand">{y.title}</h3>
                <ul className="flex flex-col gap-2">
                  {y.subGoals.map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-sm text-brand/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-soft-line pt-4 text-sm leading-relaxed text-brand/65">
                  <span className="font-semibold text-brand">Main services — </span>
                  {y.services}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {D.roadmap.timeline.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    i === D.roadmap.timeline.length - 1
                      ? 'bg-gold text-brand-dark'
                      : 'bg-brand text-cream'
                  }`}
                >
                  {step}
                </span>
                {i < D.roadmap.timeline.length - 1 ? (
                  <span className="text-brand/30">&rarr;</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Onboarding Process */}
      <Section tone="light">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={D.onboarding.eyebrow} title={D.onboarding.title} />
          <div className="flex flex-col gap-4">
            {D.onboarding.steps.map((step) => (
              <div
                key={step.no}
                className="flex gap-5 rounded-2xl border border-soft-line bg-cream-dark p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold font-display text-lg font-extrabold text-brand-dark">
                  {step.no}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base font-bold text-brand">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand/70">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA + Contact */}
      <section className="bg-gold">
        <div className="container-content flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <h2 className="display-title max-w-2xl text-3xl leading-tight text-brand-dark md:text-4xl">
            Launch your journey with GCM.
          </h2>
          <ButtonLink
            href="/contact"
            variant="primary"
            className="bg-brand-dark text-cream hover:bg-brand"
          >
            Book a consultation
          </ButtonLink>
          <div className="mt-2 flex flex-col gap-1 text-sm text-brand-dark/80">
            <span>{D.contact.email}</span>
            <span>{D.contact.web}</span>
          </div>
        </div>
      </section>
    </>
  );
}
