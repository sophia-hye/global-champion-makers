'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SETTINGS_TABLE, KEY_LANG_SWITCHER } from '@/lib/supabase/config';

export function SettingsManager({ langEnabled }: { langEnabled: boolean }) {
  const [enabled, setEnabled] = useState(langEnabled);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = async () => {
    const next = !enabled;
    setBusy(true);
    setSaved(false);
    setEnabled(next);
    try {
      const { error } = await createClient()
        .from(SETTINGS_TABLE)
        .upsert(
          { key: KEY_LANG_SWITCHER, value: next ? 'true' : 'false' },
          { onConflict: 'key' },
        );
      if (error) throw error;
      setSaved(true);
    } catch (err) {
      console.error('설정 저장 실패:', err);
      setEnabled(!next); // rollback
      alert('설정 저장에 실패했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-xl rounded-xl border border-soft-line bg-cream p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-display text-base font-bold text-brand">언어 설정 사용</span>
          <span className="text-sm leading-relaxed text-brand/60">
            사용 시 한국어/영어 전환 토글이 노출됩니다. 사용 안 함으로 두면 토글이 숨겨지고
            <strong className="text-brand/80"> 영어만</strong> 표시됩니다.
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={busy}
          onClick={toggle}
          className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
            enabled ? 'bg-brand' : 'bg-soft-line'
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-cream transition-all ${
              enabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>

      <div className="mt-4 border-t border-soft-line pt-4 text-sm">
        <span className="text-brand/60">현재 상태: </span>
        <span className="font-semibold text-brand">
          {enabled ? '사용 (한/영 토글 노출)' : '사용 안 함 (영어만)'}
        </span>
        {saved ? <span className="ml-2 text-xs text-gold">저장됨</span> : null}
      </div>
    </div>
  );
}
