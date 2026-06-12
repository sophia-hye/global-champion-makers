import { createClient } from '@/lib/supabase/server';
import { PLAYERS_TABLE, type Player } from '@/lib/supabase/config';
import { PlayersManager } from '@/components/admin/PlayersManager';

export default async function AdminPlayersPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(PLAYERS_TABLE)
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  const items = (data ?? []) as Player[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand">선수 관리</h1>
        <p className="mt-1 text-sm text-brand/60">
          Players 페이지의 선수 사례를 등록·수정·삭제합니다.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-soft-line bg-cream p-6 text-sm text-brand/70">
          선수 사례를 불러오지 못했습니다. 테이블(<code>{PLAYERS_TABLE}</code>)과 RLS 정책을
          확인해 주세요.
          <pre className="mt-2 overflow-x-auto text-xs text-brand/40">{error.message}</pre>
        </div>
      ) : (
        <PlayersManager items={items} />
      )}
    </div>
  );
}
