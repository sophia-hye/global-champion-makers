import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand: deep green (신뢰·성장·안정)
        brand: {
          DEFAULT: '#1A3C34',
          dark: '#0E1A16',
          mid: '#2E5A4E',
          light: '#46776A',
        },
        // Base: off-white (따뜻한 여백)
        cream: {
          DEFAULT: '#FAF8F2',
          dark: '#F1EDE3',
        },
        // Neutral: soft grey
        soft: {
          DEFAULT: '#8A8F8C',
          line: '#E4E2DA',
        },
        // Accent: gold (프리미엄 포인트)
        gold: {
          DEFAULT: '#C8A24A',
          soft: '#E0C885',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Pretendard', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
