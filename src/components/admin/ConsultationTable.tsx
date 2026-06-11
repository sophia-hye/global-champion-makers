'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CONSULTATIONS_TABLE, type Consultation } from '@/lib/supabase/config';

const STATUS_OPTIONS = ['신규', '연락완료', '상담완료', '등록'] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const headers = ['접수일', '보호자', '자녀', '연락처', '이메일', '관심 트랙', '상태'];

export function ConsultationTable({ items }: { items: Consultation[] }) {
  const [rows, setRows] = useState(items);
  const [updating, setUpdating] = useState<string | null>(null);

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
      setRows(prev); // rollback
      alert('상태 변경에 실패했습니다.');
    } finally {
      setUpdating(null);
    }
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-soft-line bg-cream p-10 text-center text-sm text-brand/50">
        아직 접수된 상담 신청이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-soft-line bg-cream">
      <table className="w-full text-sm">
        <thead className="border-b border-soft-line text-brand/50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-soft-line">
          {rows.map((item) => (
            <tr key={item.id} className="hover:bg-cream-dark/50">
              <td className="whitespace-nowrap px-4 py-3 text-brand/50">
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString('ko-KR')
                  : '—'}
              </td>
              <td className="px-4 py-3 font-medium text-brand">{item.name}</td>
              <td className="px-4 py-3 text-brand/70">{item.child || '—'}</td>
              <td className="whitespace-nowrap px-4 py-3 text-brand/70">{item.phone || '—'}</td>
              <td className="px-4 py-3 text-brand/70">{item.email || '—'}</td>
              <td className="px-4 py-3 text-brand/70">{item.track}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
