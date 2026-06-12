-- GCM 사이트 설정 테이블 (key-value, gcm_ prefix)
-- Supabase 대시보드 → SQL Editor (역할 postgres) 에 붙여넣고 실행하세요.

create table if not exists public.gcm_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

alter table public.gcm_settings enable row level security;

-- (a) 누구나 조회 (공개 사이트가 설정값을 읽어야 함)
drop policy if exists "gcm_settings_select_all" on public.gcm_settings;
create policy "gcm_settings_select_all"
  on public.gcm_settings for select to anon, authenticated using (true);

-- (b) 로그인한 관리자만 등록/수정
drop policy if exists "gcm_settings_insert_auth" on public.gcm_settings;
create policy "gcm_settings_insert_auth"
  on public.gcm_settings for insert to authenticated with check (true);

drop policy if exists "gcm_settings_update_auth" on public.gcm_settings;
create policy "gcm_settings_update_auth"
  on public.gcm_settings for update to authenticated using (true) with check (true);

-- 기본값: 언어 설정 사용(true) → 영/한 토글 노출
insert into public.gcm_settings (key, value) values
  ('language_switcher_enabled', 'true')
on conflict (key) do nothing;
