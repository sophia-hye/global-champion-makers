import { createClient } from '@/lib/supabase/server';
import { SCHEDULES_TABLE, type ScheduleEvent } from '@/lib/supabase/config';
import { ScheduleManager } from '@/components/admin/ScheduleManager';

export default async function AdminSchedulePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(SCHEDULES_TABLE)
    .select('*')
    .order('event_date', { ascending: true });

  const items = (data ?? []) as ScheduleEvent[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand">일정 관리</h1>
        <p className="mt-1 text-sm text-brand/60">캠프·프로그램 일정을 등록·수정·삭제합니다.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-soft-line bg-cream p-6 text-sm text-brand/70">
          일정을 불러오지 못했습니다. 테이블(<code>{SCHEDULES_TABLE}</code>)과 RLS 정책을 확인해 주세요.
          <pre className="mt-2 overflow-x-auto text-xs text-brand/40">{error.message}</pre>
        </div>
      ) : (
        <ScheduleManager items={items} />
      )}
    </div>
  );
}
