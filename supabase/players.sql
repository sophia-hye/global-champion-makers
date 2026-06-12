-- GCM 선수 사례 테이블 (gcm_ prefix)
-- Supabase 대시보드 → SQL Editor (역할 postgres) 에 붙여넣고 실행하세요.

create table if not exists public.gcm_players (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  tag          text,
  start_point  text,
  path         text,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.gcm_players enable row level security;

-- (a) 누구나 조회 (공개 Players 페이지)
drop policy if exists "gcm_players_select_all" on public.gcm_players;
create policy "gcm_players_select_all"
  on public.gcm_players for select to anon, authenticated using (true);

-- (b) 로그인한 관리자만 등록/수정/삭제
drop policy if exists "gcm_players_insert_auth" on public.gcm_players;
create policy "gcm_players_insert_auth"
  on public.gcm_players for insert to authenticated with check (true);

drop policy if exists "gcm_players_update_auth" on public.gcm_players;
create policy "gcm_players_update_auth"
  on public.gcm_players for update to authenticated using (true) with check (true);

drop policy if exists "gcm_players_delete_auth" on public.gcm_players;
create policy "gcm_players_delete_auth"
  on public.gcm_players for delete to authenticated using (true);

-- 초기 데이터(실제 사례 3건)
insert into public.gcm_players (name, tag, start_point, path, sort_order) values
  ('명세인', '성장형 케이스', '시작 UTR 9.5 (애매한 위치)', '미국 대학 전액 장학금 획득 후 Stanford University 트랜스퍼', 1),
  ('배주완', '현실적 출발 → 결과', '국제 랭킹 1000위권 시작', 'Cowley College (NJCAA) → Alabama A&M University (D1) 트랜스퍼', 2),
  ('황동현', '상위권 선수', '상위권 선수로 시작', 'Vanderbilt University (D1) 진학 · 전액 장학금 + 월 $200 용돈', 3)
on conflict do nothing;
