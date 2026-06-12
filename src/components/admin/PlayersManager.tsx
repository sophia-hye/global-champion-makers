'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PLAYERS_TABLE, type Player } from '@/lib/supabase/config';

const empty = { name: '', tag: '', start_point: '', path: '', sort_order: '0' };
const inputClass =
  'w-full rounded-lg border border-soft-line bg-cream px-3 py-2 text-sm text-brand outline-none focus:border-brand';

export function PlayersManager({ items }: { items: Player[] }) {
  const [rows, setRows] = useState(items);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set =
    (k: keyof typeof empty) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const reset = () => {
    setForm(empty);
    setEditingId(null);
  };

  const refresh = async () => {
    const { data } = await createClient()
      .from(PLAYERS_TABLE)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setRows((data as Player[]) ?? []);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setBusy(true);
    const payload = {
      name: form.name.trim(),
      tag: form.tag.trim() || null,
      start_point: form.start_point.trim() || null,
      path: form.path.trim() || null,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      const supabase = createClient();
      if (editingId) {
        const { error } = await supabase.from(PLAYERS_TABLE).update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(PLAYERS_TABLE).insert(payload);
        if (error) throw error;
      }
      await refresh();
      reset();
    } catch (err) {
      console.error('선수 저장 실패:', err);
      alert('선수 사례 저장에 실패했습니다.');
    } finally {
      setBusy(false);
    }
  };

  const edit = (p: Player) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      tag: p.tag ?? '',
      start_point: p.start_point ?? '',
      path: p.path ?? '',
      sort_order: String(p.sort_order ?? 0),
    });
  };

  const remove = async (id: string) => {
    if (!confirm('이 선수 사례를 삭제할까요?')) return;
    const prev = rows;
    setRows((r) => r.filter((x) => x.id !== id));
    const { error } = await createClient().from(PLAYERS_TABLE).delete().eq('id', id);
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
      <form
        onSubmit={submit}
        className="flex h-fit flex-col gap-3 rounded-xl border border-soft-line bg-cream p-5"
      >
        <h2 className="font-display text-lg font-bold text-brand">
          {editingId ? '선수 사례 수정' : '선수 사례 등록'}
        </h2>
        <label className="text-sm font-medium text-brand">
          이름 *
          <input value={form.name} onChange={set('name')} className={inputClass} placeholder="예: 명세인" />
        </label>
        <label className="text-sm font-medium text-brand">
          태그
          <input
            value={form.tag}
            onChange={set('tag')}
            className={inputClass}
            placeholder="예: 성장형 케이스"
          />
        </label>
        <label className="text-sm font-medium text-brand">
          시작점
          <input
            value={form.start_point}
            onChange={set('start_point')}
            className={inputClass}
            placeholder="예: 시작 UTR 9.5"
          />
        </label>
        <label className="text-sm font-medium text-brand">
          성공 경로
          <textarea
            rows={3}
            value={form.path}
            onChange={set('path')}
            className={`${inputClass} resize-none`}
            placeholder="예: 전액 장학금 후 Stanford University 트랜스퍼"
          />
        </label>
        <label className="text-sm font-medium text-brand">
          정렬 순서
          <input
            type="number"
            value={form.sort_order}
            onChange={set('sort_order')}
            className={inputClass}
          />
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-cream hover:bg-brand-mid disabled:opacity-60"
          >
            {editingId ? '수정 저장' : '등록'}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-soft-line px-4 py-2.5 text-sm text-brand/70 hover:border-brand"
            >
              취소
            </button>
          ) : null}
        </div>
      </form>

      {/* 목록 */}
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold text-brand">등록된 선수 ({rows.length})</h2>
        {rows.length === 0 ? (
          <div className="rounded-xl border border-soft-line bg-cream p-8 text-center text-sm text-brand/40">
            아직 등록된 선수 사례가 없습니다.
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-soft-line rounded-xl border border-soft-line bg-cream">
            {rows.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-sm font-medium text-brand">
                    {p.tag ? (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-gold">
                        {p.tag}
                      </span>
                    ) : null}
                    {p.name}
                  </span>
                  {p.start_point ? (
                    <span className="text-xs text-brand/50">{p.start_point}</span>
                  ) : null}
                  {p.path ? <span className="text-sm text-brand/60">{p.path}</span> : null}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => edit(p)}
                    className="rounded-lg border border-soft-line px-2.5 py-1 text-xs text-brand/70 hover:border-brand hover:text-brand"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="rounded-lg border border-soft-line px-2.5 py-1 text-xs text-red-600 hover:border-red-400"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
