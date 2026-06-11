import { createClient } from '@/lib/supabase/server';
import { CONSULTATIONS_TABLE, type Consultation } from '@/lib/supabase/config';
import { ConsultationTable } from '@/components/admin/ConsultationTable';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(CONSULTATIONS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  const items = (data ?? []) as Consultation[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand">상담 신청 목록</h1>
        <p className="mt-1 text-sm text-brand/60">전체 {items.length}건</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-soft-line bg-cream p-6 text-sm text-brand/70">
          목록을 불러오지 못했습니다. 테이블(<code>{CONSULTATIONS_TABLE}</code>)과 RLS 정책을
          확인해 주세요.
          <pre className="mt-2 overflow-x-auto text-xs text-brand/40">{error.message}</pre>
        </div>
      ) : (
        <ConsultationTable items={items} />
      )}
    </div>
  );
}
