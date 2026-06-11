import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { TERMS_ARTICLES, TERMS_EFFECTIVE_DATE } from '@/content/terms';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: locale === 'ko' ? '이용약관' : 'Terms of Service' };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <>
      <section className="bg-brand-dark text-cream">
        <div className="container-content py-20 md:py-24">
          <span className="eyebrow">Legal</span>
          <h1 className="display-title mt-4 text-3xl md:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-sm text-cream/60">
            {t('effective')}: {TERMS_EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <Section tone="light">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {locale !== 'ko' ? (
            <p className="rounded-lg bg-cream-dark px-4 py-3 text-sm text-brand/60">
              {t('notice')}
            </p>
          ) : null}

          {TERMS_ARTICLES.map((article) => (
            <article key={article.title} className="flex flex-col gap-2.5">
              <h2 className="font-display text-lg font-bold text-brand">{article.title}</h2>
              {article.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-brand/75">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
