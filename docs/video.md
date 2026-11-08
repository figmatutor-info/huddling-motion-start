# video.md

영상 룩 기준. 화면 **16:9 · 1920×1080 · 30fps**.
규칙: 색 · 폰트는 `docs/design.md` 값만 쓴다 (새 hex · 새 폰트 없음). 움직임은 `docs/motion.md`.
장면 순서 · 흐름 · 구성은 이 문서에 없다. 레퍼런스와 영상마다 쓰는 비트 시트가 정한다.

선택 (2026-11-08): 배경 **밝은** · 헤드라인 **단정하게** · 엔드 카드 **어두운**

| 토큰 | 값 |
|---|---|
| `video-size` | 1920×1080 (16:9) |
| `video-fps` | 30 |
| `video-scale` | **2.8**: Figma 글자 · 부품 값 × 2.8 = 영상 px (모션용 텍스트 배율) |

---

## 1. 텍스트 최소 크기

| 토큰 | 값 | 근거 |
|---|---|---|
| `video-text-min` | **31px** | 가장 작은 스타일 `Text/eyebrow` 11px × 2.8 = 30.8 → 31 |

- 영상 위에 놓는 글자(자막 · 헤드라인 · 라벨)는 31px보다 작게 쓰지 않는다.
- 예외: 폰 프레임 안 화면 이미지(4장)의 글자. 화면 그림의 일부라서 읽히지 않아도 된다. 읽혀야 하면 그 부품을 5장 방식(×2.8)으로 따로 꺼낸다.
- 소수점은 반올림해서 정수 px로 쓴다.

---

## 2. 배경

| 토큰 | 가리키는 값 (`docs/design.md` 1장) | hex | 쓰는 곳 |
|---|---|---|---|
| `video-bg` | `color-surface` | `#f7f7f8` | 기본 바탕 (밝은) |
| `video-panel` | `color-bg` | `#ffffff` | 바탕 위 흰 면 (부품 · 폰 화면과 같은 색) |
| `video-end-bg` | `color-text` | `#18191b` | 엔드 카드 바탕 (어두운) |

- 바탕은 단색이다. 그라데이션 · 무늬 · 사진 바탕을 쓰지 않는다 (design.md에 없음).
- `video-bg`를 `#f7f7f8`로 둬서 흰 부품 · 흰 폰 화면이 바탕과 구분된다.

---

## 3. 글자

폰트: `Pretendard` 400 · 600 · 700 (`docs/design.md` 3장, 로컬 파일 A). 자간 0%. 첫 프레임 전에 `document.fonts.ready`.
크기 · 행간 = Figma 텍스트 스타일 × 2.8, 반올림.

| 토큰 | Figma 스타일 | 굵기 | 크기 px | 행간 px |
|---|---|---|---|---|
| `video-display` | `Text/display` 28/34 | 700 | 78 | 95 |
| `video-title` | `Text/title` 24/32 | 600 | 67 | 90 |
| `video-compact-title` | `Text/compact-title` 22/28 | 700 | 62 | 78 |
| `video-section` | `Text/section` 20/28 | 700 | 56 | 78 |
| `video-heading` | `Text/heading` 18/28 | 600 | 50 | 78 |
| `video-body` | `Text/body` 15/24 | 400 | 42 | 67 |
| `video-list-title` | `Text/list-title` 15/22 | 600 | 42 | 62 |
| `video-label` | `Text/label` 14/20 | 600 | 39 | 56 |
| `video-caption` | `Text/caption` 12/16 | 400 | 34 | 45 |
| `video-eyebrow` | `Text/eyebrow` 11/16 | 600 | 31 | 45 |

헤드라인 (단정하게)
- 헤드라인은 `video-display`(78px)가 가장 크다. 이보다 큰 글자는 쓰지 않는다.
- 한 번에 한 줄이고, 줄을 바꿔야 하면 문구를 나눈다. 가운데 정렬.
- 헤드라인 아래 보조 문장은 `video-heading` 또는 `video-body`.

글자 색

| 토큰 | 가리키는 값 | hex | 쓰는 곳 |
|---|---|---|---|
| `video-text` | `color-text` | `#18191b` | 밝은 바탕 위 글자 |
| `video-text-muted` | `color-text-muted` | `#75777c` | 보조 문장 |
| `video-accent` | `color-primary` | `#3759de` | 헤드라인 안 강조 단어 하나 |
| `video-text-on-end` | `color-on-primary` | `#ffffff` | 엔드 카드 위 글자 |

- 강조는 색으로만 한다 (`video-accent`). 밑줄 · 테두리 · 다른 굵기를 더하지 않는다.

---

## 4. 폰 프레임

`src/screens/*.png`(780×1688 = 390×844 @2x)를 담는 틀. 화면 이미지는 고치지 않고 감싼다.
출처: 색 · 그림자만 `docs/design.md`. 화면 배율 1.1 · 테두리 14px · 모서리 64/50px는 design.md에 없어 이 문서에서 정했다 (2026-11-08). 바꿀 때는 이 표만 고친다.

| 토큰 | 값 |
|---|---|
| `video-phone-screen` | 429×928 (390×844 × 1.1) |
| `video-phone-bezel` | 14px, 색 `color-text` `#18191b` |
| `video-phone` | 457×956 (화면 + 테두리) |
| `video-phone-radius` | 바깥 64px · 화면 50px |
| `video-phone-shadow` | `Shadow/lg` × 2.8 → 0 · 22 · 흐림 67 · `#0000001F` |

- 폰 크기는 ×2.8을 쓰지 않는다. 화면 높이가 영상 높이 1080 안에 들어가도록 ×1.1로 둔다.
- 다이내믹 아일랜드 · 버튼 · 노치 같은 기기 장식은 없다. 상태 표시줄(9:41)은 화면 이미지에 이미 있다.
- 폰을 움직일 때는 `docs/motion.md` 5장 카메라를 쓴다.

---

## 5. parts

`src/parts/*.html`을 폰 밖으로 꺼내 영상 위에 놓을 때.

| 토큰 | 값 |
|---|---|
| `video-part-scale` | ×2.8, 부품 HTML 전체에 `transform: scale(2.8)` · 기준점 가운데 |
| `video-part-shadow` | `Shadow/md` × 2.8 → 0 · 11 · 흐림 34 · `#00000014` |

×2.8 크기 (부품 폭 · 높이 × 2.8)

| 부품 | Figma | 영상 px |
|---|---|---|
| `asset-card` | 350×74 | 980×207 |
| `badge-approved` | 108×32 | 302×90 |
| `brand-icon` | 98×98 | 274×274 |
| `button-submit` | 350×44 | 980×123 |
| `logo` logotype | 149×19 | 417×53 |
| `mission-card` | 350×253 | 980×708 |
| `skill-card-1·2·3` | 350×88 | 980×246 |
| `stat-card` | 350×101 | 980×283 |

- 부품 안 글자 · 여백 · 모서리는 HTML 그대로 두고 배율만 준다. 그래서 부품 안 글자는 3장 표 크기와 같다.
- 부품을 고치지 않는다. 상태는 `data-state`로만 바꾼다 (`docs/design.md` 6장).
- 부품은 `video-bg` 위에 놓는다. 흰 부품끼리 겹치면 `video-part-shadow`로 구분한다.

엔드 카드 (어두운)
- 바탕 `video-end-bg` `#18191b`, 로고는 `logo`의 `logotype-white`(×2.8 = 417×53)만 쓴다.
- `brand-icon`은 엔드 카드에 쓰지 않는다. 아이콘 바탕 `#000000`이 `#18191b` 위에서 거의 구분되지 않는다.
- 엔드 카드 글자는 `video-text-on-end`, 크기는 3장 표 안에서 고른다.
