import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { LogoutButton } from '@/components/admin/LogoutButton';

// 인증 게이트: Supabase 세션 없으면 로그인으로 리다이렉트
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect('/admin/login');
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <>
      <nav className="border-b border-soft-line bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg font-extrabold text-brand">GCM Admin</span>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-brand/70 hover:text-brand">상담 신청</Link>
              <Link href="/admin/players" className="text-brand/70 hover:text-brand">선수 관리</Link>
              <Link href="/admin/schedule" className="text-brand/70 hover:text-brand">일정 관리</Link>
              <Link href="/admin/settings" className="text-brand/70 hover:text-brand">사이트 설정</Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </>
  );
}
