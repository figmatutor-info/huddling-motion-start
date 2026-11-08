# motion.md

우리 서비스의 움직임 기준. 성격: **경쾌한**: 빨리 시작해서 길게 멈추고, 리듬이 앞으로 나아간다.
규칙: 이 문서에 있는 값만 쓴다. 문서에 없는 숫자가 필요하면 쓰기 전에 **"새 후보"로 물어본다** (끝의 표에 모아 둠).

- 색 · 글자 · 로고 · 크기는 `docs/design.md`만 따른다. 레퍼런스의 색 · 글꼴 · 로고는 가져오지 않는다.
- 장면 순서 · 화면 배치는 이 문서에 없다. 영상마다 비트 시트에 적는다.
- 기준 프레임: **30fps**. 1f = 33.3ms. 시점 표기는 `초:프레임` (예: `16:28` = 16초 28프레임).

출처
| 기호 | 레퍼런스 | 받은 방식 |
|---|---|---|
| V | @SaadPastaDev 영상 "Claude Opus 5.5 🤝 Remotion" (skillry.dev, saadpastadev-347341), 1280×720 · 30fps · 736f | `references/saadpastadev-347341/original.mp4`를 프레임마다 측정 |
| C | Carbon Design System, *Motion overview* | 문서 값 옮김 |
| R | Remotion, *Apple-style device rise animation* (프롬프트) | 문서 값 옮김 |

---

## 1. Primitives

Semantic(2장)을 거쳐서 쓰고, Primitive를 직접 쓰지 않는다. 예외는 3 · 5장에 이름을 적은 곳뿐이다.

### 길이 (6단계)

| 토큰 | 프레임 | ms | 레퍼런스 시점 |
|---|---|---|---|
| `duration-3` | 3f | 100 | V `01:08–01:10` 글줄 뒤에 단어 하나 붙음 3f · V `11:00` 숫자 키 눌림 3f |
| `duration-6` | 6f | 200 | V `16:28–17:02` 회사 이름 위로 굴러 바뀜 6f · V `16:05–16:10` 알림이 화면을 채움 6f |
| `duration-10` | 10f | 333 | V `00:10–00:19` 단어가 붙으며 글줄 가운데 다시 맞춤 10f · V `14:19–14:28` 알림 내려와 멈춤 10f |
| `duration-16` | 16f | 533 | V `06:19–07:04` 점 → 차트 → 화면으로 넓어짐 16f · V `06:06–06:19` 검색창이 점으로 줄어듦 14f |
| `duration-24` | 24f | 800 | V `01:20–02:14` 큰 단어와 동전 날아 들어옴 25f · V `13:07–13:26` 밀어서 확인 버튼 채움 20f |
| `duration-40` | 40f | 1333 | V `03:10–04:20` 휴대폰이 다가오며 기울기 풀림 40f · R 휴대폰 올라옴 1.5s(45f) |

C 길이(70 · 110 · 150 · 240 · 400 · 700ms)는 쓰지 않는다. 우리 영상은 프레임 단위라 V에서 잰 값으로 정했다. C에서는 곡선만 옮긴다.

### 곡선

| 토큰 | cubic-bezier | 레퍼런스 |
|---|---|---|
| `curve-standard` | `0.2, 0, 0.38, 0.9` | C Standard · Productive. 보이는 채로 움직일 때. V `00:10–00:19` 첫 프레임이 가장 빠르고 서서히 멈춤 |
| `curve-standard-expressive` | `0.4, 0.14, 0.3, 1` | C Standard · Expressive. 큰 순간. V `09:07–10:27` 천천히 출발해 가운데가 가장 빠름 |
| `curve-entrance` | `0, 0, 0.3, 1` | C Entrance · Expressive. 들어올 때. V `16:28` 들어오는 첫 프레임이 가장 빠름 (움직임 5.2 → 2.9 → 1.9) |
| `curve-exit` | `0.4, 0.14, 1, 1` | C Exit · Expressive. 사라질 때. V `16:04–16:10` 알림이 화면을 채우며 점점 빨라지다 끊김 (움직임 15 → 46) |
| `curve-out-cubic` | `0.33, 1, 0.68, 1` | R `Easing.out(Easing.cubic)`. 카메라 전용 (5장) |

성격이 **경쾌한**이므로 C의 Expressive 곡선을 기본으로 쓴다. Productive는 `curve-standard` 하나만 둔다.

---

## 2. Semantic (5개)

| 토큰 | 길이 | 곡선 | 언제 | 레퍼런스 시점 |
|---|---|---|---|---|
| `motion-enter` | `duration-6` | `curve-entrance` | 부품 · 글줄이 나타남 | V `16:28–17:02` 이름이 아래에서 올라옴 6f |
| `motion-exit` | `duration-6` | `curve-exit` | 부품 · 글줄이 사라짐 | V `16:28–17:02` 앞 이름이 위로 빠짐 6f (들어오는 것과 동시) |
| `motion-move` | `duration-10` | `curve-standard` | 보이는 채로 자리 · 크기가 바뀜 | V `00:10–00:19` 글줄 가운데 다시 맞춤 10f |
| `motion-emphasis` | `duration-24` | `curve-standard-expressive` | 값이 차오름, 결과 강조 | V `13:07–13:26` 확인 버튼 채움 20f · V `01:20–02:14` 큰 단어 등장 25f |
| `motion-transition` | `duration-16` | `curve-standard-expressive` | 화면 → 화면 (한 단계) | V `06:06–06:19` 검색창 → 점 14f · V `06:19–07:04` 점 → 화면 16f |

- 들어오고 나가는 것은 겹친다: `motion-exit`과 `motion-enter`를 같은 프레임에 시작한다 (V `16:28`).
- 한 화면 안에서 `motion-emphasis`는 한 번에 하나만 쓴다.

---

## 3. Pattern (`src/parts` · `src/screens`)

파일은 `src/patterns/<이름>.html`. 부품 HTML은 고치지 않고 장면에서 감싼다 (`docs/design.md` 6장).

| 패턴 | 대상 | 움직임 | 레퍼런스 시점 |
|---|---|---|---|
| `button-press` | `button-submit` | scale 1 → 0.96 눌림 `duration-3` · `curve-standard` → 1로 뗌 `duration-6` · `curve-entrance` (0.96은 2026-11-08 새 후보에서 정함) | V `11:00` 숫자 키 눌림 3f |
| `count-up` | `stat-card` `#stat-card-amount` span | 0 → `data-final` 값, `duration-16` · `curve-standard-expressive`. ₩는 고정 | V `11:15–12:00` 금액 0 → 500 → 5,000이 15f |
| `progress-fill` | `mission-card` `--progress` · `#mission-card-progress-text` | 막대와 글자 함께 `motion-emphasis` | V `13:07–13:26` 버튼 왼쪽부터 채움 20f |
| `badge-pulse` | `badge-approved` | `motion-enter`로 나온 뒤 `motion-emphasis` 한 번 | V `14:17–14:23` 체크 원 나타남 6f |
| `card-stagger` | `skill-card-1·2·3` · `asset-card` 목록 | 카드마다 `motion-enter`, 간격 `duration-10` | V `16:28 → 17:08 → 17:18` 이름 간격 10f |
| `state-swap` | `asset-card` · `button-submit`의 `data-state` 문구 | 앞 문구 위로 `motion-exit` + 새 문구 아래에서 `motion-enter`. 이동 거리 = 그 글자 스타일 행간 | V `16:28–17:02` 이름이 굴러 바뀜 6f |
| `screen-change` | `src/screens` 01 → 05 | 누른 부품이 커져 화면을 채우고 다음 화면이 됨: `motion-transition` × 2단계 | V `06:06–07:04` 검색창 → 점 → 화면 · V `16:05–16:10` 알림이 화면 채움 6f |

---

## 4. 머무는 시간

| 토큰 | 프레임 | 언제 | 레퍼런스 시점 |
|---|---|---|---|
| `hold-beat` | 5f | 움직임이 끝나고 다음 움직임 전 | V `09:02–09:06` 5f · V `13:27–14:01` 5f · V `16:23–16:27` 5f |
| `hold-read` | 21f | 글줄 하나를 읽게 함 | V `21:06–21:26` 마지막 글줄 21f |
| `hold-show` | 60f | 화면 하나를 보여 줌 (숫자가 바뀌어도 화면은 그대로) | V `07:05–09:06` 가격만 바뀌는 화면 61f |
| `hold-end` | 60f | 영상 마지막 화면 | V `22:13–24:15` 마지막 화면 62f |

- 움직임이 연달아 오면 사이에 `hold-beat` 이상 둔다.
- 마지막 화면은 `motion-exit`으로 지우지 않는다. `hold-end` 동안 그대로 두고 영상을 끝낸다.

---

## 5. 카메라

카메라는 화면(`src/screens`)을 담은 휴대폰 전체를 움직인다. 한 번에 하나만 움직이고, 카메라가 움직이는 동안 부품은 `motion-enter` · `motion-exit`만 겹칠 수 있다.

| 토큰 | 움직임 | 길이 · 곡선 | 레퍼런스 시점 |
|---|---|---|---|
| `camera-rise` | 휴대폰이 아래에서 올라옴: translateY 400px → 0 · rotateX 35° → 8° · scale 0.8 → 1, 기준점 아래 가운데, perspective 1200px (2026-11-08 새 후보에서 정함) | `duration-40` · `curve-out-cubic` | R 값 그대로 (R 1.5s = 45f → `duration-40`) · V `02:28–03:29` 올라옴, V `03:10–04:20` 기울기 풀림 40f |
| `camera-push` | 한 부품으로 다가간 뒤 그 부품이 화면을 채움 (`screen-change`로 이어짐) | 다가감 `duration-24` · `curve-standard-expressive` → 채움 `duration-6` · `curve-exit` | V `15:03–15:28` 다가감 26f, 가운데 `15:16`이 가장 빠름 (움직임 2.7 → 9.6 → 4.1) · V `16:04–16:10` 채움 7f, 점점 빨라지다 끊김 |
| `camera-pull` | 한 점에서 화면 전체로 물러남 | `motion-transition` | V `06:19–07:04` 점 → 차트 → 휴대폰 16f |

- 카메라 뒤에는 `hold-beat` 이상 둔다 (V `04:20` 이후 화면 멈춤).

---

## 새 후보 (쓰기 전에 물어볼 것)

V에 있지만 위의 값으로 옮기지 못한 움직임. 정해지면 해당 장으로 옮긴다.

| 후보 | 레퍼런스 값 | 레퍼런스 시점 |
|---|---|---|
| 글자 입력 간격 | 글자마다 4f | V `05:15 · 05:19 · 05:23` 검색창 입력 |
| 점점 빨라지는 간격 (`card-stagger`) | 10f → 7f로 줄어듦 | V `16:28–20:20` 이름 간격 10 · 9 · 8 · 7f |
| 화면 스크롤 | 51f | V `09:07–10:27` 상세 화면 아래로 |
| `badge-pulse` 크기 | 없음 (V는 크기 변화 없음) | V `14:17–14:23` |
| 알림 · 카드 순서 간격 | R 0.3s = 9f | R 알림 카드 내려옴 |
