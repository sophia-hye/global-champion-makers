import { createClient } from '@/lib/supabase/server';
import { SETTINGS_TABLE, KEY_LANG_SWITCHER } from '@/lib/supabase/config';
import { SettingsManager } from '@/components/admin/SettingsManager';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from(SETTINGS_TABLE)
    .select('value')
    .eq('key', KEY_LANG_SWITCHER)
    .maybeSingle();

  // 기본값 true (행이 없으면 사용)
  const langEnabled = data?.value !== 'false';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand">사이트 설정</h1>
        <p className="mt-1 text-sm text-brand/60">공개 사이트의 동작을 설정합니다.</p>
      </div>
      <SettingsManager langEnabled={langEnabled} />
    </div>
  );
}
