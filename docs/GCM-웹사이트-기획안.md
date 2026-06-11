# GCM (Global Champions Makers) 웹사이트 통합 리뉴얼 기획안

> **작성일**: 2026-06-11
> **프로젝트**: equre → GCM 브랜드 통합 및 웹사이트 리뉴얼
> **저장소**: `global-chanpion-makers` (branch: dev) / 배포: Vercel

---

## 1. 프로젝트 개요

### 1.1 배경
| 구분 | 기존 GCM (`gcm-five.vercel.app`) | 기존 equre (`equre.vercel.app`) |
|------|------|------|
| 정체성 | 미국 대학 테니스 진학 & 프리미엄 매니지먼트 | 엘리트 청소년 멘탈 웰니스 / Plan B |
| 강점 | UTR 데이터, 입시 로드맵, ROI, 권위감 | 심리 치유, 안전망, 감성적 브랜딩, 공간 |
| 약점 | 강한 압박감, 데이터 과밀(12섹션), 차가움 | 테니스/입시의 구체적 실행력 부족 |
| 톤 | 다크 · 스포티 · 신뢰 · 데이터 | 모던 · 감성 · 따뜻함 · 웰니스 |

### 1.2 통합 목표
- `equre` 이름을 **완전히 삭제**하고 **GCM 단일 브랜드**로 흡수 통합
- **데이터(입시 성과) + 웰니스(심리적 안정감) = 완벽한 요람** 컨셉 확립
- 기존 GCM의 '엘리트 강인함·기록 중심'을 **'학부모 불안을 달래는 따뜻한 웰니스'를 전면 배치**하는 프리미엄 브랜드로 전환

### 1.3 타겟 & 톤앤매너
- **타겟**: 글로벌 무대를 지향하는 주니어(키즈) 및 엘리트 스포츠 학부모 (조기교육 관심층)
- **톤앤매너**: 프리미엄 · 신뢰감 · 따뜻한 웰니스 · 정교한 데이터

---

## 2. 핵심 브랜드 전략

### 2.1 브랜드 메시지 위계
1. **위로(Wellness)를 앞단에** → 학부모의 불안을 먼저 달램
2. **확신(Data)으로 뒷받침** → 냉철한 입시 전략으로 신뢰 확보
3. **GCM = 따뜻한 멘토 + 냉철한 전략가**의 이중 정체성

### 2.2 GCM 약자 정의
| 약자 | 영문 타이틀 | 의미 |
|------|------|------|
| **G**lobal | "A broader stage beyond the court." | 확장성 / NCAA D1 글로벌 안전망 |
| **C**hampions | "Turning setbacks into comebacks." | 멘탈 웰니스 / 회복탄력성 |
| **M**akers | "Data-driven destiny." | 전략적 데이터 / UTR·북미 컨설팅 |

### 2.3 카피 언어 전략 (중요)
- **타이틀(H1·H2) = 영문** (굵고 직관적, 글로벌 전문성)
- **본문(Body) = 국문** (한국 학부모 가독성)

---

## 3. 디자인 시스템 (방향)

### 3.1 컬러 팔레트
기존 GCM의 강렬한 스포티함 + equre의 차분한 신뢰감을 믹스한 **'프리미엄 교육 + 웰니스 아카데미'** 톤.

| 역할 | 색상 | 용도 |
|------|------|------|
| Primary | **Deep Green** (딥그린) | 브랜드 메인, 신뢰·성장·안정 |
| Base (Light) | **Off-White** (오프화이트) | 본문 배경, 여백, 따뜻함 |
| Neutral | **Soft Grey** (소프트 그레이) | 보조 텍스트, 구분선, 카드 |
| Accent | Gold / Deep Navy (선택) | CTA, 강조, 프리미엄 포인트 |
| Contrast | Charcoal / Near-Black | 히어로·다이어그램 등 임팩트 영역 |

> 다크(스포티 임팩트)와 라이트(웰니스 안정감)를 **섹션별로 교차**하여 리듬감 부여.

### 3.2 타이포그래피 (방향)
- 영문 타이틀: 모던 산세리프 (예: Inter, Pretendard 영문, Satoshi 등 검토)
- 국문 본문: Pretendard 계열 (가독성·프리미엄)

### 3.3 비주얼 컨셉
- 히어로: **치열한 코트(흑백) → 여유로운 미국 캠퍼스/멘토링(컬러)** 전환 연출
- 3-Track 등 핵심 정보는 **탭(Tab) / 카드** UI로 가독성 강화

---

## 4. 정보 구조 (IA) / 사이트맵

기존 GCM의 12개 섹션 과밀 구조를 **핵심 중심으로 재편**하고, equre의 웰니스/공간 요소를 흡수.

```
GCM (Home)
├── About            ← 이번 1차 핵심 (브랜드 철학 통합)
├── Tracks           ← 3-Track 로드맵 (Pro / Admission / Hobby)
├── Programs         ← 커리큘럼 + 멘탈 웰니스 케어 시스템
├── Players          ← 배출 선수 / 성공 사례
├── Schedule         ← 캠프 · 제휴 · 일정
└── Contact          ← 무료 상담 / B2B 문의
```

> **확정 구현 순서**: **About → Tracks → Programs** (이후 Players·Schedule·Contact 확장).

---

## 5. Home 페이지 설계 (게이트웨이 랜딩)

> **Home의 역할 = 관문(Gateway).** 상세 정보를 Home에 다 담지 않는다. 메뉴에 있는 영역(About·Tracks·Programs·Players)은 **짧은 티저 + "자세히 보기" 링크**로만 노출하고, 상세는 각 페이지에서 확인하도록 유도한다. Home은 **첫인상 + 길 안내 + 상담 전환**에 집중한다.

| # | 섹션 | 타이틀(영문) | 본문 핵심(국문, 짧게) | 링크 | 톤 |
|---|------|------|------|------|------|
| 1 | **HERO** | "Unshakable minds build unbeatable strategies." | 데이터+웰니스 한 줄 가치제안 | **무료 상담(CTA)** | 다크 임팩트 / 흑백→컬러 전환 |
| 2 | **BRAND INTRO** | "Where data meets wellness." | GCM은 누구인가 — 1~2문장 요약 | **브랜드 스토리 더보기 → /about** | 라이트 |
| 3 | **TRACKS TEASER** | "Three roads, one strong start." | Pro Highway / Ivy Admission / Global Elite Hobby — 명칭+한 줄씩만 (3카드) | **트랙 자세히 → /tracks** | 라이트 |
| 4 | **PROGRAMS TEASER** | "Mind first. Data always." | 멘탈 웰니스·데이터 전략·전인적 매니지먼트 키워드만 | **프로그램 보기 → /programs** | 라이트 |
| 5 | **PROOF SNAPSHOT** | "Numbers don't lie." | 핵심 지표 요약(진학 수·UTR 향상 등) + 대표 후기 1~2개 | **선수/사례 더보기 → /players** | 데이터 강조 |
| 6 | **FINAL CTA / CONTACT** | "Start with a conversation." | 30분 무료 디스커버리 상담 예약 + B2B 문의 | **상담 신청 → /contact** | 강조 + Footer |

**설계 원칙 (과밀 방지)**
- 각 티저 섹션은 **3~4줄 이내** + CTA 링크 1개. 상세 설명·전체 카피는 Home에 두지 않는다.
- 메뉴로 들어갈 수 있는 내용(About 철학, 3-Track 상세, Programs 시스템, Players 사례)은 **모두 해당 페이지로 위임**.
- Home 고유 가치 = **첫인상(Hero) + 신뢰 스냅샷(Proof) + 상담 전환(CTA)**.
- Vision 감성 메시지("Beyond the scoreboard…")는 **About 페이지로 이전**(중복 제거).

---

## 6. About 페이지 상세 설계 (1차 핵심)

| # | 섹션 | 타이틀(영문) | 본문 핵심(국문) | UI 비고 |
|---|------|------|------|------|
| 1 | **HERO** | "Unshakable minds build unbeatable strategies." / "Even if you lose the match, never lose your direction in life." | 멘탈 보호 질문 → 조기 시작 시 무한해지는 테니스 가능성 + 심리적 웰니스 + 글로벌 입시 데이터 결합 | 흑백→컬러 전환 비주얼, 슬로건 "Losing a match never means losing your way." |
| 2 | **THE PHILOSOPHY** (왜 테니스인가) | "The earlier they step on the court, the wider their world becomes." | 테니스 = 학업 성취도 긍정 영향, 뇌·신체 흡수력 좋은 시기 시작, 이분법 타파 → 글로벌 챔피언 육성 | 따뜻한 라이트 톤 |
| 3 | **CORE VALUABLE TRACKS** (3-Track) | — | GCM JUNIOR START에서 3갈래 분기 | **탭/카드 UI 필수** (아래 6.1) |
| 4 | **THE GCM APPROACH** (차별화 시스템) | Mindset & Mental Wellness / Multi-Angle Data Analysis / Total Management & Pace-making | equre 웰니스 철학을 GCM 시스템에 통합 (멘탈케어·데이터 균형·전인적 매니지먼트) | 3-컬럼 또는 카드 |
| 5 | **VISION & PROMISE** | "Beyond the scoreboard, toward a bigger world." | 공 잘 치는 선수가 아닌, 지성+회복탄력성 갖춘 글로벌 리더 육성 / 웰니스 멘토링 + 냉철한 입시 전략 시너지 | 임팩트 마무리 (다크 톤 권장) |

### 6.1 3-Track 로드맵 상세
하나의 출발점(키즈 시작)에서 3갈래로 분기되는 트리 → 학부모가 아이 상황에 맞춰 선택 조회.

| Track | 명칭 | Target | 핵심 전략 |
|-------|------|------|------|
| **Track 1** | **The Pro Highway** (프로의 길) | 조기 재능 발견 / 엘리트 선수 지향 | 글로벌 스탠다드 + UTR 데이터 훈련 → 국내외 프로 데뷔 최단거리 |
| **Track 2** | **The Ivy Admission** (미국/해외 명문대 입시) | 학업·운동 병행, 해외 명문대 목표 | NCAA D1/D2 전액 장학금 로드맵, GPA·에세이·포트폴리오 결합, 실패 없는 Plan B |
| **Track 3** | **The Global Elite Hobby** (프리미엄 취미) | 학업 향상 / 글로벌 네트워킹 | 테니스=글로벌 상류사회의 언어, 학업 집중력↑, 엘리트 인맥 형성 초석 |

> ✅ **확정**: Track 2 명칭은 **"The Ivy Admission"** 으로 통일 (다이어그램 "Ivy Ivy League" 표기 폐기).

---

## 7. 기술 스택 (제안)

| 항목 | 제안 | 근거 |
|------|------|------|
| 프레임워크 | **Next.js (App Router) + TypeScript** | Vercel 최적, SEO, 기존 배포 환경 일치 추정 |
| 스타일링 | **Tailwind CSS** | 디자인 시스템 토큰화 용이, 빠른 반응형 |
| 애니메이션 | Framer Motion | 흑백→컬러 전환, 스크롤 인터랙션 |
| 컴포넌트 | shadcn/ui (선택) | 탭·카드 등 일관된 UI |
| 배포 | **Vercel** | 기존 환경 유지 |
| 폰트 | Pretendard(국문) + Inter/Satoshi(영문) | 가독성·프리미엄 |
| 다국어 | **next-intl 또는 App Router `[locale]`** | 국문/영문 2개 언어(i18n), KR/EN 토글 |

> ✅ **확정**: 본 저장소(`global-chanpion-makers`)에 Next.js로 **신규 구축** (기존 `gcm-five` 코드 미이식).

---

## 8. SEO / 신뢰 요소
- 메타: "미국 대학 테니스 진학 · 멘탈 웰니스 아카데미 | GCM"
- 구조화 데이터(Organization, Course), OG 이미지(브랜드 비주얼)
- 신뢰 지표: UTR 로드맵, NCAA 진학 사례, 학부모 후기(Voices), 북미 입학사정관 경력

---

## 9. 작업 단계 (제안 로드맵)
1. **Phase 1 — 설계 확정**: 본 기획안 검토 + 미결 사항 확정
2. **Phase 2 — 프로젝트 셋업 + 디자인 시스템**: Next.js·Tailwind·i18n 셋업, 컬러·타이포·컴포넌트 토큰 정의
3. **Phase 3 — 공통 레이아웃**: 헤더(GNB·언어토글)·푸터·공통 컴포넌트(버튼·카드·탭)
4. **Phase 4 — Home + About 구현**: Home 6섹션(게이트웨이) + About 5섹션 + 3-Track 탭 UI
5. **Phase 5 — 확장**: Tracks → Programs → Players · Contact
6. **Phase 6 — QA & 배포**: 반응형/접근성/SEO/i18n 점검 → Vercel 배포

---

## 10. 의사결정 사항

### 10.1 확정 (2026-06-11)
| 항목 | 결정 |
|------|------|
| **현재 단계** | **기획안 검토** (구현 보류, 문서 확정 우선) |
| **코드 베이스** | **본 저장소(`global-chanpion-makers`)에 Next.js로 신규 구축** (기존 `gcm-five` 코드 미이식 — 깔끔한 통합 리뉴얼) |
| **디자인 무드** | **섹션별 교차** — 히어로·비전은 다크 임팩트, 철학·트랙은 라이트 안정감으로 리듬감 부여 |

### 10.2 잔여 미결 → 확정 (2026-06-11)
| 항목 | 결정 |
|------|------|
| **Track 2 명칭** | **"The Ivy Admission"** 으로 통일 (다이어그램 "Ivy Ivy League" 표기는 폐기) |
| **콘텐츠 자산** | 보유함. **필요 시 사용자가 업로드 예정** → 구현 시 자리표시자(placeholder) 후 교체 |
| **언어** | **국문/영문 2개 언어 지원 (i18n)** — 언어 전환 토글 제공 |
| **확장 우선순위** | About → **Tracks** → Programs 순 |

### 10.3 i18n 적용 방침 (언어 전략 보강)
- **국문 뷰**: 타이틀=영문(굵게) + 본문=국문 혼용 (현 기획 유지, 기본/한국 학부모 타겟)
- **영문 뷰**: 전체 영문 (글로벌 방문자)
- 구현: Next.js i18n (예: `next-intl` 또는 App Router `[locale]` 라우팅) + 우상단 언어 토글(KR/EN)
- 콘텐츠는 `ko` / `en` 메시지 사전으로 분리 관리
```
