import { setRequestLocale } from 'next-intl/server';
import { StubPage } from '@/components/ui/StubPage';

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StubPage namespace="schedule" eyebrow="Schedule" />;
}
