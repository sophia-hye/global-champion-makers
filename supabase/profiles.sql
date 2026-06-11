-- GCM 관리자/사용자 프로필 테이블 (gcm_ prefix)
-- auth.users 는 직접 수정 불가(권한 거부)하므로, public 스키마에 프로필을 둔다.
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

-- 1) 프로필 테이블
create table if not exists public.gcm_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  updated_at  timestamptz not null default now()
);

-- 2) RLS
alter table public.gcm_profiles enable row level security;

-- 본인 프로필만 조회
drop policy if exists "gcm_profiles_select_self" on public.gcm_profiles;
create policy "gcm_profiles_select_self"
  on public.gcm_profiles for select to authenticated
  using (auth.uid() = id);

-- 본인 프로필만 수정/삽입
drop policy if exists "gcm_profiles_upsert_self" on public.gcm_profiles;
create policy "gcm_profiles_upsert_self"
  on public.gcm_profiles for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists "gcm_profiles_update_self" on public.gcm_profiles;
create policy "gcm_profiles_update_self"
  on public.gcm_profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

-- 3) 신규 가입 시 프로필 자동 생성 트리거
create or replace function public.handle_new_gcm_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.gcm_profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_gcm on auth.users;
create trigger on_auth_user_created_gcm
  after insert on auth.users
  for each row execute function public.handle_new_gcm_user();

-- 4) 이미 만들어둔 관리자 계정의 프로필 행 생성 (트리거는 신규 가입에만 적용되므로)
insert into public.gcm_profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- 이후 이름/폰번호는 Table Editor 의 gcm_profiles 에서 자유롭게 수정하거나, 아래처럼 SQL 로 수정:
-- update public.gcm_profiles set name = '홍길동', phone = '010-1234-5678'
-- where id = (select id from auth.users where email = 'admin@example.com');
