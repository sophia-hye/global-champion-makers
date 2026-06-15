import type { SVGProps } from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// 심리적 웰니스 — 방패 + 펄스(심리적 안전망·멘탈 헬스)
export function IconWellness(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5.2c0 4.3-2.9 7.7-7 8.8-4.1-1.1-7-4.5-7-8.8V6l7-3Z" />
      <path d="M7.8 11.6h1.9l1.1-2.4 1.7 4.2 1-1.8h1.7" />
    </svg>
  );
}

// 다각도 데이터 분석 — 막대 + 추세선
export function IconData(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5v13a1 1 0 0 0 1 1h13" />
      <path d="M9 19v-4" />
      <path d="M13 19v-7" />
      <path d="M17 19v-3" />
      <path d="M8 11l3-2.5 3 1.8 5-4" />
      <path d="M17 6.3h2.3v2.3" />
    </svg>
  );
}

// 전인적 매니지먼트 — 게이지(페이스 조절)
export function IconManagement(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 18a7.5 7.5 0 0 1 15 0" />
      <path d="M12 18l4-3.4" />
      <circle cx="12" cy="18" r="1.15" />
      <path d="M4.6 16.2l1.6.5M19.4 16.2l-1.6.5M12 10.5v1.7" />
    </svg>
  );
}

// 순서: item1=웰니스, item2=데이터, item3=매니지먼트
export const PILLAR_ICONS = [IconWellness, IconData, IconManagement];
