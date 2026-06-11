'use client';

import { Fragment, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CONSULTATIONS_TABLE, type Consultation } from '@/lib/supabase/config';

const STATUS_OPTIONS = ['신규', '연락완료', '상담완료', '등록'] as const;
type Status = (typeof STATUS_OPTIONS)[number];
type Filter = 'all' | Status;

const headers = ['접수일', '보호자', '자녀', '연락처', '이메일', '관심 트랙', '문의', '상태'];

function toCsv(rows: Consultation[]): string {
  const head = ['접수일', '보호자', '자녀', '연락처', '이메일', '관심트랙', '상태', '문의내용'];
  const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.created_at ? new Date(r.created_at).toLocaleString('ko-KR') : '',
      r.name ?? '',
      r.child ?? '',
      r.phone ?? '',
      r.email ?? '',
      r.track ?? '',
      r.status ?? '',
      r.message ?? '',
    ]
      .map((c) => esc(String(c)))
      .join(','),
  );
  return [head.map(esc).join(','), ...lines].join('\r\n');
}

export function ConsultationTable({ items }: { items: Consultation[] }) {
  const [rows, setRows] = useState(items);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const s of STATUS_OPTIONS) c[s] = rows.filter((r) => r.status === s).length;
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = filter === 'all' ? rows : rows.filter((r) => r.status === filter);
    if (q) {
      list = list.filter((r) =>
        [r.name, r.phone, r.email, r.child]
          .filter(Boolean)
          .some((v) => (v as string).toLowerCase().includes(q)),
      );
    }
    return [...list].sort((a, b) => {
      const t1 = new Date(a.created_at).getTime();
      const t2 = new Date(b.created_at).getTime();
      return sortDir === 'desc' ? t2 - t1 : t1 - t2;
    });
  }, [rows, filter, search, sortDir]);

  const updateStatus = async (id: string, status: Status) => {
    setUpdating(id);
    const prev = rows;
    setRows((r) => r.map((item) => (item.id === id ? { ...item, status } : item)));
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from(CONSULTATIONS_TABLE)
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('상태 변경 실패:', err);
      setRows(prev);
      alert('상태 변경에 실패했습니다.');
    } finally {
      setUpdating(null);
    }
  };

  const exportCsv = () => {
    const csv = '﻿' + toCsv(visible); // BOM for Excel(한글)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gcm-consultations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-soft-line bg-cream p-10 text-center text-sm text-brand/50">
        아직 접수된 상담 신청이 없습니다.
      </div>
    );
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: '전체' },
    ...STATUS_OPTIONS.map((s) => ({ key: s as Filter, label: s })),
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 툴바: 검색 + CSV */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름 · 연락처 · 이메일 검색"
          className="w-full max-w-xs rounded-lg border border-soft-line bg-cream px-3 py-2 text-sm text-brand outline-none placeholder:text-brand/35 focus:border-brand"
        />
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg border border-brand px-3.5 py-2 text-xs font-semibold text-brand hover:bg-brand hover:text-cream"
        >
          CSV 내보내기
        </button>
      </div>

      {/* 상태 필터 */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'border-brand bg-brand text-cream'
                  : 'border-soft-line bg-cream text-brand/70 hover:border-brand/40'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${active ? 'text-cream/70' : 'text-brand/40'}`}>
                {counts[f.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-xl border border-soft-line bg-cream">
        <table className="w-full text-sm">
          <thead className="border-b border-soft-line text-brand/50">
            <tr>
              {headers.map((h) =>
                h === '접수일' ? (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                      className="inline-flex items-center gap-1 hover:text-brand"
                    >
                      {h}
                      <span className="text-[10px]">{sortDir === 'desc' ? '▼' : '▲'}</span>
                    </button>
                  </th>
                ) : (
                  <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-soft-line">
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-10 text-center text-sm text-brand/40"
                >
                  조건에 맞는 신청이 없습니다.
                </td>
              </tr>
            ) : (
              visible.map((item) => {
                const isOpen = expanded === item.id;
                return (
                  <Fragment key={item.id}>
                    <tr className="hover:bg-cream-dark/50">
                      <td className="whitespace-nowrap px-4 py-3 text-brand/50">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString('ko-KR')
                          : '—'}
                      </td>
                      <td className="px-4 py-3 font-medium text-brand">{item.name}</td>
                      <td className="px-4 py-3 text-brand/70">{item.child || '—'}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-brand/70">
                        {item.phone || '—'}
                      </td>
                      <td className="px-4 py-3 text-brand/70">{item.email || '—'}</td>
                      <td className="px-4 py-3 text-brand/70">{item.track}</td>
                      <td className="px-4 py-3">
                        {item.message ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpen ? null : item.id)}
                            className="rounded-lg border border-soft-line px-2.5 py-1 text-xs text-brand/70 hover:border-brand hover:text-brand"
                          >
                            {isOpen ? '닫기' : '보기'}
                          </button>
                        ) : (
                          <span className="text-xs text-brand/30">없음</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          disabled={updating === item.id}
                          onChange={(e) => updateStatus(item.id, e.target.value as Status)}
                          className="rounded-lg border border-soft-line bg-cream px-2 py-1 text-xs outline-none focus:border-brand disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {isOpen && item.message ? (
                      <tr className="bg-cream-dark/40">
                        <td colSpan={headers.length} className="px-4 py-4">
                          <div className="text-xs font-semibold text-gold">문의 내용</div>
                          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-brand/80">
                            {item.message}
                          </p>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
