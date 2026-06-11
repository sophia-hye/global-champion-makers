-- GCM 상담 신청 테이블 (gcm_ prefix)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

-- 1) 테이블 생성
create table if not exists public.gcm_consultations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  child       text,
  phone       text,
  email       text,
  track       text not null default 'any',
  message     text,
  status      text not null default '신규',
  created_at  timestamptz not null default now()
);

-- 2) RLS 활성화
alter table public.gcm_consultations enable row level security;

-- 3) 정책
-- (a) 누구나(비로그인 방문자 포함) 상담 신청 작성 가능
drop policy if exists "gcm_consultations_insert_anon" on public.gcm_consultations;
create policy "gcm_consultations_insert_anon"
  on public.gcm_consultations
  for insert
  to anon, authenticated
  with check (true);

-- (b) 로그인한 관리자만 목록 조회 가능
drop policy if exists "gcm_consultations_select_auth" on public.gcm_consultations;
create policy "gcm_consultations_select_auth"
  on public.gcm_consultations
  for select
  to authenticated
  using (true);

-- (c) 로그인한 관리자만 상태 수정 가능
drop policy if exists "gcm_consultations_update_auth" on public.gcm_consultations;
create policy "gcm_consultations_update_auth"
  on public.gcm_consultations
  for update
  to authenticated
  using (true)
  with check (true);

-- 4) 관리자 계정 생성
-- Supabase 대시보드 → Authentication → Users → "Add user" 로 관리자 1명 생성
-- (이메일/비밀번호). 공개 회원가입은 사용하지 않으므로 별도 signup 불필요.
