# scenes — mission-complete

## 3안 요약 (승인 1: 하나 고르기)

**A. 미션 한 바퀴** (레퍼런스 체크리스트 11개 중 11개)
- 콘셉트: 한 달 미션이 수익이 되기까지를 레퍼런스 뼈대 그대로 한 바퀴.
- 화면 · 부품: 01-home · 03-mission · 04-approved · 05-assets / mission-card · button-submit · badge-approved · stat-card · logo
- 흐름: 글줄 훅 → 폰 올라옴(01) → mission-card 꺼내 진행 막대 차오름 → 03 → 제출 버튼 눌림 → 04 배지 → stat-card로 다가가 금액 오름 → 엔드
- 끝: 어두운 엔드 카드, 흰 로고타입

→ **A 선택** (2026-11-08)

**B. 부품만** (레퍼런스 체크리스트 11개 중 7개: 3 · 5 · 8 · 1 일부 빠짐)
- 콘셉트: 폰 없이 부품 네 개를 가운데에 크게, 하나씩 바꿔 가며 보여 줌.
- 화면 · 부품: mission-card · button-submit · badge-approved · stat-card · logo (화면 이미지 없음)
- 흐름: 글줄 훅 → mission-card 차오름 → button-submit 눌림 → 배지 → stat-card 금액 오름 → 엔드
- 끝: 어두운 엔드 카드, 흰 로고타입

**C. 결과 먼저** (레퍼런스 체크리스트 11개 중 9개: 2 · 9 빠짐)
- 콘셉트: 승인 완료 화면으로 시작해 "어떻게?"를 거꾸로 짚고 수익으로 끝남.
- 화면 · 부품: 04-approved · 01-home · 03-mission · 05-assets / badge-approved · mission-card · stat-card · logo
- 흐름: 폰 올라옴(04) 배지 → 01 미션 카드 → 03 제출 → 05로 다가가 금액 오름 → 엔드
- 끝: 어두운 엔드 카드, 흰 로고타입

---

## 장면표 — A. 미션 한 바퀴 (450f · 30fps)

문구는 모두 화면에 있는 글자다: S1 = `01-home` 헤드라인, S7 = `05-assets` 헤드라인, 진행 글자 = `03-mission`(50%) · `04-approved`(100%).
바탕: S1–S6 `video-bg`, S7 `video-end-bg` (`docs/video.md` 2장). 폰은 `docs/video.md` 4장, 꺼낸 부품은 5장 배율.
`ref` = `reference.md` 체크리스트 번호.

| 장면 | 프레임 | 화면 · 부품 | 움직임 (토큰) | 글자 | ref | 놓는 위치 · 정렬 근거 |
|---|---|---|---|---|---|---|
| S1 훅 | 0–42 | 없음 | 0–6 첫 줄 `motion-enter` · 6–11 `hold-beat` · 11–21 둘째 줄 `motion-enter` + 줄 가운데 맞춤 `motion-move` · 21–42 `hold-read` | `video-display` `video-text` "오늘도 하나씩," → "오늘도 하나씩, 내 실력으로" | 1 · 2 · 10 | 가운데 한 줄 (`docs/video.md` 3장 헤드라인) |
| S2 폰 | 42–87 | `01-home` in 폰 | 42–48 글줄 `motion-exit` · 42–82 `camera-rise` · 82–87 `hold-beat` | 없음 | 1 · 3 · 10 | 폰 가로 가운데 (`camera-rise` 기준점 아래 가운데) |
| S3 미션 카드 | 87–119 | `mission-card` (×2.8, `--progress` 0.5) | 87–93 폰 `motion-exit` + 카드 `motion-enter` · 93–114 `hold-read` · 114–119 `hold-beat` | 카드 안 글자 그대로 | 4 · 10 | 가운데 (`01-home`에서 카드가 화면 중심 요소) |
| S4 제출 | 119–181 | `mission-card` 버튼 → `03-mission` in 폰 → `button-submit` (submit, ×2.8) | 119–151 `screen-change` (버튼이 커져 채움 → `03-mission`) · 151–156 `hold-beat` · 156–162 폰 `motion-exit` + 버튼 `motion-enter` · 162–167 `hold-beat` · 167–176 `button-press` · 176–181 `hold-beat` | 버튼 "제출하기" | 4 · 5 · 10 | 가운데 (`03-mission` 맨 아래 주 버튼) |
| S5 승인 | 181–275 | `button-submit` → `04-approved` in 폰 → `mission-card` (×2.8) + `badge-approved` (×2.8) | 181–213 `screen-change` (버튼이 커져 채움 → `04-approved`) · 213–218 `hold-beat` · 218–224 폰 `motion-exit` + 카드 `motion-enter` · 224–248 `progress-fill` 0.5 → 1 · 248–254 배지 `motion-enter` · 254–275 `hold-read` | 진행 글자 "50% · 2/4 단계 완료" → "100% · 4/4 단계 완료" · 배지 "승인 완료" | 5 · 6 · 10 | 카드 위 · 배지 아래, 왼쪽 맞춤 (`04-approved` 배치 그대로 ×2.8) |
| S6 수익 | 275–368 | `badge-approved` → `05-assets` in 폰 → `stat-card` (×2.8) | 275–281 카드 `motion-exit` · 275–307 `screen-change` (배지가 커져 채움 → `05-assets`) · 307–312 `hold-beat` · 312–342 `camera-push` (`stat-card`로 다가감 → 채움) · 342–347 `hold-beat` · 347–363 `count-up` 0 → 29,700 · 363–368 `hold-beat` | "이번 달 수익 ₩29,700" | 5 · 7 · 8 · 10 | 가운데 (`05-assets` 맨 위 카드) |
| S7 엔드 | 368–450 | `logo` logotype-white (×2.8) | 368 바탕 끊어 바꿈 · 368–373 `hold-beat` · 373–379 첫 줄 `motion-enter` · 379–384 `hold-beat` · 384–390 `state-swap` + 로고 `motion-enter` · 390–450 `hold-end` | `video-display` `video-text-on-end` "배움이 쌓여," → "나의 자산으로" | 9 · 11 | 글줄 가운데, 로고는 글줄 아래 가운데 |

길이 합계: 42 + 45 + 32 + 62 + 94 + 93 + 82 = **450f** ✓

새 후보: 없음 (S7 이름 굴림 가속은 쓰지 않음).
레퍼런스 반영 예상: 11개 중 11개.
