'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import {
  SCHEDULES_TABLE,
  isSupabaseConfigured,
  type ScheduleEvent,
} from '@/lib/supabase/config';

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

const LABELS = {
  ko: { prev: '이전', next: '다음', today: '오늘', empty: '이 달에 등록된 일정이 없습니다.', list: '이 달의 일정' },
  en: { prev: 'Prev', next: 'Next', today: 'Today', empty: 'No events this month.', list: "This month's events" },
};
const WEEKDAYS = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

export function MonthlyCalendar() {
  const locale = useLocale();
  const L = locale === 'ko' ? LABELS.ko : LABELS.en;
  const weekdays = locale === 'ko' ? WEEKDAYS.ko : WEEKDAYS.en;

  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [today, setToday] = useState('');
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const d = new Date();
    setView({ y: d.getFullYear(), m: d.getMonth() });
    setToday(ymd(d.getFullYear(), d.getMonth(), d.getDate()));
  }, []);

  useEffect(() => {
    if (!view || !isSupabaseConfigured()) return;
    const first = ymd(view.y, view.m, 1);
    const lastDate = new Date(view.y, view.m + 1, 0).getDate();
    const last = ymd(view.y, view.m, lastDate);
    setLoading(true);
    createClient()
      .from(SCHEDULES_TABLE)
      .select('*')
      .gte('event_date', first)
      .lte('event_date', last)
      .order('event_date', { ascending: true })
      .then(({ data }) => {
        setEvents((data as ScheduleEvent[]) ?? []);
        setLoading(false);
      });
  }, [view]);

  if (!view) {
    return <div className="h-96 animate-pulse rounded-2xl bg-cream-dark" />;
  }

  const monthTitle = new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(view.y, view.m, 1));

  const firstWeekday = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const byDay = new Map<string, ScheduleEvent[]>();
  for (const e of events) {
    const list = byDay.get(e.event_date) ?? [];
    list.push(e);
    byDay.set(e.event_date, list);
  }

  const move = (delta: number) => {
    const m = view.m + delta;
    setView({ y: view.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 });
  };
  const goToday = () => {
    const d = new Date();
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-brand">{monthTitle}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => move(-1)} className="rounded-lg border border-soft-line px-3 py-1.5 text-sm text-brand/70 hover:border-brand hover:text-brand">
            {L.prev}
          </button>
          <button onClick={goToday} className="rounded-lg border border-soft-line px-3 py-1.5 text-sm text-brand/70 hover:border-brand hover:text-brand">
            {L.today}
          </button>
          <button onClick={() => move(1)} className="rounded-lg border border-soft-line px-3 py-1.5 text-sm text-brand/70 hover:border-brand hover:text-brand">
            {L.next}
          </button>
        </div>
      </div>

      {/* 달력 그리드 */}
      <div className="overflow-hidden rounded-2xl border border-soft-line bg-cream">
        <div className="grid grid-cols-7 border-b border-soft-line bg-cream-dark/50 text-center text-xs font-semibold text-brand/50">
          {weekdays.map((w, i) => (
            <div key={w} className={`py-2.5 ${i === 0 ? 'text-red-500/70' : ''}`}>{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            if (day === null) return <div key={`b${idx}`} className="min-h-20 border-b border-r border-soft-line/60 bg-cream-dark/20" />;
            const date = ymd(view.y, view.m, day);
            const dayEvents = byDay.get(date) ?? [];
            const isToday = date === today;
            return (
              <div key={date} className="min-h-20 border-b border-r border-soft-line/60 p-1.5">
                <div className={`text-xs font-semibold ${isToday ? 'inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-cream' : 'text-brand/60'} ${idx % 7 === 0 && !isToday ? 'text-red-500/70' : ''}`}>
                  {day}
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  {dayEvents.map((e) => (
                    <span key={e.id} className="truncate rounded bg-brand/10 px-1 py-0.5 text-[10px] leading-tight text-brand" title={e.title}>
                      {e.title}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 이 달의 일정 리스트 */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gold">{L.list}</h3>
        {loading ? (
          <p className="text-sm text-brand/40">…</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-brand/40">{L.empty}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-soft-line rounded-xl border border-soft-line bg-cream">
            {events.map((e) => (
              <li key={e.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-start sm:gap-4">
                <span className="w-28 shrink-0 text-sm font-semibold text-brand">
                  {e.event_date}
                  {e.end_date ? ` ~ ${e.end_date}` : ''}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-sm font-medium text-brand">
                    {e.category ? (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-gold">{e.category}</span>
                    ) : null}
                    {e.title}
                  </span>
                  {e.description ? (
                    <span className="text-sm text-brand/60">{e.description}</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
