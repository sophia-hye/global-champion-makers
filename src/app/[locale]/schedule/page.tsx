import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { MonthlyCalendar } from '@/components/schedule/MonthlyCalendar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: locale === 'ko' ? '일정' : 'Schedule' };
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('schedule.hero');

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(70,119,106,0.3),transparent_55%)]" />
        <div className="container-content relative flex flex-col gap-6 py-20 md:py-24">
          <span className="eyebrow">Schedule</span>
          <h1 className="display-title max-w-3xl text-4xl leading-[1.12] md:text-5xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
            {t('body')}
          </p>
        </div>
      </section>

      <Section tone="light">
        <MonthlyCalendar />
      </Section>
    </>
  );
}
