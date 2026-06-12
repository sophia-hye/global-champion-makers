'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SCHEDULES_TABLE, type ScheduleEvent } from '@/lib/supabase/config';

const empty = { title: '', event_date: '', end_date: '', category: '', description: '' };
const inputClass =
  'w-full rounded-lg border border-soft-line bg-cream px-3 py-2 text-sm text-brand outline-none focus:border-brand';

export function ScheduleManager({ items }: { items: ScheduleEvent[] }) {
  const [rows, setRows] = useState(items);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const reset = () => {
    setForm(empty);
    setEditingId(null);
  };

  const refresh = async () => {
    const { data } = await createClient()
      .from(SCHEDULES_TABLE)
      .select('*')
      .order('event_date', { ascending: true });
    setRows((data as ScheduleEvent[]) ?? []);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.event_date) return;
    setBusy(true);
    const payload = {
      title: form.title.trim(),
      event_date: form.event_date,
      end_date: form.end_date || null,
      category: form.category.trim() || null,
      description: form.description.trim() || null,
    };
    try {
      const supabase = createClient();
      if (editingId) {
        const { error } = await supabase.from(SCHEDULES_TABLE).update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(SCHEDULES_TABLE).insert(payload);
        if (error) throw error;
      }
      await refresh();
      reset();
    } catch (err) {
      console.error('일정 저장 실패:', err);
      alert('일정 저장에 실패했습니다.');
    } finally {
      setBusy(false);
    }
  };

  const edit = (ev: ScheduleEvent) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      event_date: ev.event_date,
      end_date: ev.end_date ?? '',
      category: ev.category ?? '',
      description: ev.description ?? '',
    });
  };

  const remove = async (id: string) => {
    if (!confirm('이 일정을 삭제할까요?')) return;
    const prev = rows;
    setRows((r) => r.filter((x) => x.id !== id));
    const { error } = await createClient().from(SCHEDULES_TABLE).delete().eq('id', id);
    if (error) {
      console.error(error);
      setRows(prev);
      alert('삭제에 실패했습니다.');
    }
    if (editingId === id) reset();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      {/* 입력 폼 */}
      <form onSubmit={submit} className="flex h-fit flex-col gap-3 rounded-xl border border-soft-line bg-cream p-5">
        <h2 className="font-display text-lg font-bold text-brand">
          {editingId ? '일정 수정' : '일정 등록'}
        </h2>
        <label className="text-sm font-medium text-brand">
          제목 *
          <input value={form.title} onChange={set('title')} className={inputClass} placeholder="예: 여름 주니어 캠프" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-brand">
            시작일 *
            <input type="date" value={form.event_date} onChange={set('event_date')} className={inputClass} />
          </label>
          <label className="text-sm font-medium text-brand">
            종료일
            <input type="date" value={form.end_date} onChange={set('end_date')} className={inputClass} />
          </label>
        </div>
        <label className="text-sm font-medium text-brand">
          분류
          <input value={form.category} onChange={set('category')} className={inputClass} placeholder="예: 캠프 / 대회 / 제휴" />
        </label>
        <label className="text-sm font-medium text-brand">
          설명
          <textarea rows={3} value={form.description} onChange={set('description')} className={`${inputClass} resize-none`} />
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={busy} className="flex-1 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-cream hover:bg-brand-mid disabled:opacity-60">
            {editingId ? '수정 저장' : '등록'}
          </button>
          {editingId ? (
            <button type="button" onClick={reset} className="rounded-full border border-soft-line px-4 py-2.5 text-sm text-brand/70 hover:border-brand">
              취소
            </button>
          ) : null}
        </div>
      </form>

      {/* 일정 목록 */}
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold text-brand">등록된 일정 ({rows.length})</h2>
        {rows.length === 0 ? (
          <div className="rounded-xl border border-soft-line bg-cream p-8 text-center text-sm text-brand/40">
            아직 등록된 일정이 없습니다.
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-soft-line rounded-xl border border-soft-line bg-cream">
            {rows.map((ev) => (
              <li key={ev.id} className="flex items-start justify-between gap-4 p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-brand/50">
                    {ev.event_date}{ev.end_date ? ` ~ ${ev.end_date}` : ''}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-brand">
                    {ev.category ? <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-gold">{ev.category}</span> : null}
                    {ev.title}
                  </span>
                  {ev.description ? <span className="text-sm text-brand/60">{ev.description}</span> : null}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => edit(ev)} className="rounded-lg border border-soft-line px-2.5 py-1 text-xs text-brand/70 hover:border-brand hover:text-brand">수정</button>
                  <button onClick={() => remove(ev.id)} className="rounded-lg border border-soft-line px-2.5 py-1 text-xs text-red-600 hover:border-red-400">삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
