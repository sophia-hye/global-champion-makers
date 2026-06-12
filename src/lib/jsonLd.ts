import { SITE_URL } from './seo';

// 조직 구조화 데이터 (사이트 전역)
export function organizationLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Global Champions Makers',
    alternateName: 'GCM',
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/campus.jpg`,
    description:
      locale === 'ko'
        ? '미국 대학 테니스 진학과 멘탈 웰니스를 결합한 프리미엄 스포츠 교육 아카데미.'
        : 'A premium sports academy uniting US college tennis admissions with mental wellness.',
  };
}

// 3-Track 프로그램 구조화 데이터 (Tracks 페이지)
export function tracksLd(
  locale: string,
  programs: { name: string; description: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: programs.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'EducationalOccupationalProgram',
        name: p.name,
        description: p.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Global Champions Makers',
          url: `${SITE_URL}/${locale}`,
        },
      },
    })),
  };
}
