import {
  isSupabaseConfigured,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SETTINGS_TABLE,
  KEY_LANG_SWITCHER,
} from './supabase/config';

// 설정값을 짧게 메모리 캐시 (middleware/RSC 양쪽에서 동작, DB 과호출 방지)
let cache: { value: boolean; at: number } = { value: true, at: 0 };
const TTL = 60_000; // 60s

/**
 * 언어 전환(영/한) 기능 사용 여부.
 * - true: 언어 토글 노출, 한/영 모두 사용 (기본값)
 * - false: 토글 숨김, 영어만 노출
 * 미설정/오류 시 안전하게 true(기본 동작) 반환.
 */
export async function isLanguageSwitcherEnabled(): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  const now = Date.now();
  if (now - cache.at < TTL) return cache.value;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${SETTINGS_TABLE}?key=eq.${KEY_LANG_SWITCHER}&select=value`,
      {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        cache: 'no-store',
      },
    );
    let value = true;
    if (res.ok) {
      const rows = (await res.json()) as { value: string }[];
      if (rows.length > 0) value = rows[0].value !== 'false';
    }
    cache = { value, at: now };
    return value;
  } catch {
    return cache.value;
  }
}
