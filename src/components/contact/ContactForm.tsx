'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured, CONSULTATIONS_TABLE } from '@/lib/supabase/config';

const inputClass =
  'w-full rounded-xl border border-soft-line bg-cream px-4 py-3 text-sm text-brand outline-none transition-colors placeholder:text-brand/35 focus:border-brand';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [submitted, setSubmitted] = useState(false);
  const [errorKey, setErrorKey] = useState<'' | 'required' | 'consent' | 'save'>('');
  const [agree, setAgree] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // 스팸 봇 차단용 (사람은 비워둠)
  const [form, setForm] = useState({
    name: '',
    child: '',
    phone: '',
    email: '',
    track: 'any',
    message: '',
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 스팸 봇 차단: honeypot 필드가 채워졌으면 조용히 성공 처리(저장 안 함)
    if (honeypot.trim()) {
      setSubmitted(true);
      return;
    }

    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setErrorKey('required');
      return;
    }
    if (!agree) {
      setErrorKey('consent');
      return;
    }
    setErrorKey('');

    // Supabase 미설정 시: 프론트엔드 접수 확인만 표시 (graceful fallback)
    if (!isSupabaseConfigured()) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from(CONSULTATIONS_TABLE).insert({
        name: form.name.trim(),
        child: form.child.trim() || null,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        track: form.track,
        message: form.message.trim() || null,
        status: '신규',
      });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) {
      console.error('상담 신청 저장 실패:', err);
      setErrorKey('save');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-soft-line bg-cream-dark p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-cream">
          &#10003;
        </span>
        <h3 className="font-display text-xl font-bold text-brand">{t('success')}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-brand/70">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className="display-title text-2xl text-brand md:text-3xl">{t('title')}</h2>
        <p className="text-sm leading-relaxed text-brand/65">{t('body')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
          {t('name')}
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder={t('namePlaceholder')}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
          {t('child')}
          <input
            type="text"
            value={form.child}
            onChange={update('child')}
            placeholder={t('childPlaceholder')}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
          {t('phone')}
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder={t('phonePlaceholder')}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
          {t('email')}
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder={t('emailPlaceholder')}
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
        {t('track')}
        <select value={form.track} onChange={update('track')} className={inputClass}>
          <option value="any">{t('trackAny')}</option>
          <option value="track1">{t('track1')}</option>
          <option value="track2">{t('track2')}</option>
          <option value="track3">{t('track3')}</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand">
        {t('message')}
        <textarea
          rows={4}
          value={form.message}
          onChange={update('message')}
          placeholder={t('messagePlaceholder')}
          className={`${inputClass} resize-none`}
        />
      </label>

      {/* Honeypot — 사람 눈에 안 보임, 봇만 채움 */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {/* 개인정보 수집·이용 동의 */}
      <label className="flex items-start gap-3 rounded-xl border border-soft-line bg-cream-dark/40 p-4">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
        />
        <span className="text-sm text-brand/80">
          <span className="font-medium text-brand">{t('consent')}</span>
          <span className="mt-1 block text-xs leading-relaxed text-brand/55">
            {t('consentDetail')}
          </span>
        </span>
      </label>

      {errorKey ? (
        <p role="alert" className="text-sm text-red-600">
          {errorKey === 'required'
            ? t('required')
            : errorKey === 'consent'
              ? t('consentRequired')
              : t('saveError')}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || !agree}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-mid disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand"
      >
        {t('submit')}
      </button>
    </form>
  );
}
