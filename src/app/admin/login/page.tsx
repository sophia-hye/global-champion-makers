'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl border border-soft-line bg-cream p-8 shadow-sm"
      >
        <h1 className="font-display text-xl font-extrabold text-brand">GCM Admin</h1>
        <p className="mt-1 text-sm text-brand/60">상담 신청 관리</p>

        {!configured ? (
          <p className="mt-6 rounded-lg bg-cream-dark p-4 text-sm leading-relaxed text-brand/70">
            Supabase가 아직 설정되지 않았습니다. 환경변수
            (<code>NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>)를 설정하면 로그인할 수 있습니다.
          </p>
        ) : (
          <>
            {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
            <label className="mt-6 flex flex-col gap-1.5 text-sm font-medium text-brand">
              이메일
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-soft-line bg-cream px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-brand">
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border border-soft-line bg-cream px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-cream hover:bg-brand-mid disabled:opacity-60"
            >
              로그인
            </button>
          </>
        )}
      </form>
    </main>
  );
}
