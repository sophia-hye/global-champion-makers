import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, PLAYERS_TABLE, type Player } from '@/lib/supabase/config';

type Card = { name: string; tag: string; start: string; path: string };

export async function PlayerRoster() {
  const t = await getTranslations('players.roster');

  let cards: Card[] = [];

  // 1) Supabase에서 선수 사례 조회
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from(PLAYERS_TABLE)
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });
      cards = ((data as Player[]) ?? []).map((p) => ({
        name: p.name,
        tag: p.tag ?? '',
        start: p.start_point ?? '',
        path: p.path ?? '',
      }));
    } catch {
      cards = [];
    }
  }

  // 2) 미설정/빈 경우 i18n 정적 사례로 폴백
  if (cards.length === 0) {
    cards = (['player1', 'player2', 'player3'] as const).map((key) => ({
      name: t(`${key}.name`),
      tag: t(`${key}.tag`),
      start: t(`${key}.start`),
      path: t(`${key}.path`),
    }));
  }

  return (
    <Section tone="light">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} body={t('body')} />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={`${card.name}-${i}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-soft-line bg-cream-dark"
            >
              <div className="relative flex aspect-[4/5] flex-col justify-end bg-gradient-to-br from-brand-dark to-brand p-6">
                {card.tag ? (
                  <span className="absolute right-5 top-5 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-cream/85">
                    {card.tag}
                  </span>
                ) : null}
                <span className="font-display text-2xl font-bold text-cream">{card.name}</span>
                {card.start ? (
                  <span className="mt-1 text-sm font-semibold text-gold-soft">{card.start}</span>
                ) : null}
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-brand/75">{card.path}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
