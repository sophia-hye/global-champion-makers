// Supabase Edge Function: 새 상담 신청이 들어오면 이메일(Resend)로 알림
// Database Webhook(gcm_consultations INSERT) → 이 함수 호출 → Resend 이메일 전송
//
// 배포:
//   supabase functions deploy notify-consultation --no-verify-jwt
//   supabase secrets set RESEND_API_KEY=re_xxxxxxxx
//   supabase secrets set NOTIFY_TO_EMAIL=받는주소@example.com   # Resend 가입 이메일
//   (선택) supabase secrets set NOTIFY_FROM_EMAIL=onboarding@resend.dev
//
// Database Webhook 설정 (Supabase 대시보드 → Database → Webhooks):
//   - Table: gcm_consultations, Events: INSERT
//   - Type: Supabase Edge Functions → notify-consultation

interface WebhookPayload {
  type: string;
  table: string;
  record: {
    name?: string;
    child?: string;
    phone?: string;
    email?: string;
    track?: string;
    message?: string;
    created_at?: string;
  };
}

const TRACK_LABEL: Record<string, string> = {
  any: '추천 요청',
  track1: 'The Pro Highway',
  track2: 'The Ivy Admission',
  track3: 'The Global Elite Hobby',
};

Deno.serve(async (req: Request) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const to = Deno.env.get('NOTIFY_TO_EMAIL');
    const from = Deno.env.get('NOTIFY_FROM_EMAIL') ?? 'onboarding@resend.dev';
    if (!apiKey || !to) {
      return new Response('RESEND_API_KEY / NOTIFY_TO_EMAIL not set', { status: 500 });
    }

    const { record } = (await req.json()) as WebhookPayload;
    const track = TRACK_LABEL[record.track ?? 'any'] ?? record.track ?? '-';

    const row = (label: string, value?: string) =>
      `<tr><td style="padding:6px 12px;color:#8A8F8C">${label}</td><td style="padding:6px 12px;color:#1A3C34;font-weight:600">${value || '-'}</td></tr>`;

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px">
        <h2 style="color:#1A3C34">🎾 새 상담 신청이 접수되었습니다</h2>
        <table style="border-collapse:collapse;width:100%;background:#FAF8F2;border-radius:8px">
          ${row('보호자', record.name)}
          ${row('자녀', record.child)}
          ${row('연락처', record.phone)}
          ${row('이메일', record.email)}
          ${row('관심 트랙', track)}
          ${row('문의', record.message)}
        </table>
        <p style="color:#8A8F8C;font-size:12px;margin-top:16px">GCM Admin에서 확인하세요.</p>
      </div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `GCM <${from}>`,
        to: [to],
        subject: `[GCM] 새 상담 신청 - ${record.name ?? '익명'}`,
        html,
      }),
    });

    if (!res.ok) {
      return new Response(`resend error: ${await res.text()}`, { status: 500 });
    }
    return new Response('ok', { status: 200 });
  } catch (e) {
    return new Response(`error: ${e instanceof Error ? e.message : 'unknown'}`, {
      status: 500,
    });
  }
});
