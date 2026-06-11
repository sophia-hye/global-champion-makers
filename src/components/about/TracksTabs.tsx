'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const trackKeys = ['track1', 'track2', 'track3'] as const;

export function TracksTabs() {
  const t = useTranslations('about.tracks');
  const [active, setActive] = useState(0);

  const tracks = trackKeys.map((key) => ({
    tab: t(`${key}.tab`),
    name: t(`${key}.name`),
    nameKo: t(`${key}.nameKo`),
    target: t(`${key}.target`),
    body: t(`${key}.body`),
  }));

  const current = tracks[active];

  return (
    <div className="flex flex-col gap-8">
      {/* Junior start indicator */}
      <div className="flex items-center justify-center">
        <span className="rounded-full bg-brand px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-cream">
          {t('subtitle')}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid gap-2 sm:grid-cols-3">
        {tracks.map((track, i) => (
          <button
            key={track.tab}
            type="button"
            onClick={() => setActive(i)}
            className={`flex flex-col items-start gap-1 rounded-xl border px-5 py-4 text-left transition-colors ${
              i === active
                ? 'border-brand bg-brand text-cream'
                : 'border-soft-line bg-cream text-brand hover:border-brand/40'
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                i === active ? 'text-gold-soft' : 'text-gold'
              }`}
            >
              {track.tab}
            </span>
            <span className="font-display text-base font-bold">{track.name}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="rounded-2xl border border-soft-line bg-cream p-8 md:p-10">
        <h3 className="font-display text-2xl font-bold text-brand md:text-3xl">
          {current.name}
          <span className="ml-2 text-base font-medium text-brand/50">{current.nameKo}</span>
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-gold">
          {current.target}
        </p>
        <p className="mt-5 text-base leading-relaxed text-brand/75">{current.body}</p>
      </div>
    </div>
  );
}
