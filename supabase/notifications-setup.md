# 신규 상담 신청 알림 설정 (이메일 / Resend)

새 상담 신청이 들어오면 담당자 이메일로 알림을 받습니다.

## 사전 준비 — 사용자 작업
1. **Resend 가입 & API Key 발급**: [resend.com](https://resend.com) → API Keys → Create
   - 보내는 주소는 도메인 인증 없이 `onboarding@resend.dev` 사용 가능
   - ⚠️ 단, 도메인 미인증 시 **받는 주소는 Resend 가입 이메일만** 가능 (운영 시 본인 도메인 인증 권장)
2. **Supabase CLI 설치 & 연결** (이미 있으면 생략)
   - `npm i -g supabase`
   - `supabase login`
   - `supabase link --project-ref gamuulkypcneezpzqqif`

## 배포 — 사용자 작업
```bash
# 1) Edge Function 배포
supabase functions deploy notify-consultation --no-verify-jwt

# 2) 시크릿 등록 (키는 직접 입력 — 채팅/코드에 남기지 말 것)
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
supabase secrets set NOTIFY_TO_EMAIL=받는주소@example.com   # Resend 가입 이메일
# (선택) 보내는 주소 변경 시
supabase secrets set NOTIFY_FROM_EMAIL=onboarding@resend.dev
```

## Database Webhook 연결 — Supabase 대시보드
**Database → Webhooks → Create a new hook**
- Name: `notify-consultation`
- Table: `gcm_consultations`
- Events: **Insert** 체크
- Type: **Supabase Edge Functions** → `notify-consultation` 선택
- Save

## 테스트
사이트 Contact 폼에서 상담 신청 → 담당자 메일함에 알림이 오면 성공.
(스팸함도 확인 — `onboarding@resend.dev` 발신은 스팸 분류될 수 있어, 운영 시 도메인 인증 권장)

---

## 보안 주의
- `RESEND_API_KEY`는 **서버 전용**입니다. `.env.local`이나 `NEXT_PUBLIC_*`에 넣지 마세요.
- 반드시 **Supabase secrets**로만 관리하세요 (Edge Function이 Deno.env로 읽음).
