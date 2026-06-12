export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Supabase 환경변수가 설정되어 있는지 (graceful fallback 판단용) */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** 상담 신청 테이블 (gcm_ prefix) */
export const CONSULTATIONS_TABLE = 'gcm_consultations';

/** 일정 테이블 (gcm_ prefix) */
export const SCHEDULES_TABLE = 'gcm_schedules';

export interface ScheduleEvent {
  id: string;
  title: string;
  event_date: string; // YYYY-MM-DD
  end_date: string | null;
  category: string | null;
  description: string | null;
  created_at?: string;
}

export type ConsultationStatus = '신규' | '연락완료' | '상담완료' | '등록';

export interface Consultation {
  id: string;
  name: string;
  child: string | null;
  phone: string | null;
  email: string | null;
  track: string;
  message: string | null;
  status: ConsultationStatus | string;
  created_at: string;
}
