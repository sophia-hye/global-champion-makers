'use client';

import { motion } from 'framer-motion';

// 히어로 듀얼 패널: 흑백 코트 → 컬러로 전환되는 연출 + 슬라이드 인
export function HeroVisual() {
  return (
    <div className="relative grid grid-cols-2 gap-3">
      {/* 코트: 흑백으로 시작해 컬러로 전환 */}
      <motion.div
        className="relative aspect-[3/4] translate-y-6 overflow-hidden rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/images/court.jpg')" }}
        initial={{ opacity: 0, x: -16, filter: 'grayscale(100%)' }}
        animate={{ opacity: 1, x: 0, filter: 'grayscale(0%)' }}
        transition={{
          opacity: { duration: 0.8, ease: 'easeOut' },
          x: { duration: 0.8, ease: 'easeOut' },
          filter: { delay: 1, duration: 2.2, ease: 'easeInOut' },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
        <span className="absolute bottom-0 p-4 text-xs text-cream/80">On the court</span>
      </motion.div>

      {/* 캠퍼스: 컬러 */}
      <motion.div
        className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/images/campus.jpg')" }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
        <span className="absolute bottom-0 p-4 text-xs text-cream/90">Toward the world</span>
      </motion.div>
    </div>
  );
}
