import { setRequestLocale } from 'next-intl/server';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { Section } from '@/components/ui/Section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '상담 신청' : 'Contact',
    description:
      locale === 'ko'
        ? '30분 무료 디스커버리 상담으로 우리 아이만의 2-Track 로드맵을 시작하세요.'
        : "Start your child's own 2-track roadmap with a 30-minute free discovery call.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </Section>
    </>
  );
}
