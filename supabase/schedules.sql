-- GCM 일정(캠프·프로그램) 테이블 (gcm_ prefix)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

create table if not exists public.gcm_schedules (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  event_date  date not null,
  end_date    date,
  category    text,
  description text,
  created_at  timestamptz not null default now()
);

create index if not exists gcm_schedules_event_date_idx
  on public.gcm_schedules (event_date);

alter table public.gcm_schedules enable row level security;

-- (a) 누구나 일정 조회 가능 (공개 달력)
drop policy if exists "gcm_schedules_select_all" on public.gcm_schedules;
create policy "gcm_schedules_select_all"
  on public.gcm_schedules for select
  to anon, authenticated
  using (true);

-- (b) 로그인한 관리자만 등록/수정/삭제
drop policy if exists "gcm_schedules_insert_auth" on public.gcm_schedules;
create policy "gcm_schedules_insert_auth"
  on public.gcm_schedules for insert to authenticated with check (true);

drop policy if exists "gcm_schedules_update_auth" on public.gcm_schedules;
create policy "gcm_schedules_update_auth"
  on public.gcm_schedules for update to authenticated using (true) with check (true);

drop policy if exists "gcm_schedules_delete_auth" on public.gcm_schedules;
create policy "gcm_schedules_delete_auth"
  on public.gcm_schedules for delete to authenticated using (true);
