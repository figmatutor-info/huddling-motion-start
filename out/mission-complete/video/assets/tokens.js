// 토큰 — 값은 기준 문서에서만 옮긴다. 이름은 문서 토큰 이름 그대로.
// 장면 파일은 숫자를 직접 쓰지 않고 window.T 만 쓴다.
(function () {
  gsap.registerPlugin(CustomEase);

  // docs/motion.md 1장 · 곡선 (cubic-bezier)
  const curves = {
    "curve-standard": "0.2,0,0.38,0.9",
    "curve-standard-expressive": "0.4,0.14,0.3,1",
    "curve-entrance": "0,0,0.3,1",
    "curve-exit": "0.4,0.14,1,1",
    "curve-out-cubic": "0.33,1,0.68,1",
  };
  for (const [name, bez] of Object.entries(curves)) CustomEase.create(name, bez);

  const fps = 30; // docs/video.md video-fps
  const f = (n) => n / fps; // 프레임 → 초

  // docs/motion.md 1장 · 길이 (프레임)
  const duration = { "duration-3": 3, "duration-6": 6, "duration-10": 10, "duration-16": 16, "duration-24": 24, "duration-40": 40 };

  // docs/motion.md 2장 · Semantic
  const sem = (d, e) => ({ d: f(duration[d]), ease: e });
  const motion = {
    enter: sem("duration-6", "curve-entrance"),
    exit: sem("duration-6", "curve-exit"),
    move: sem("duration-10", "curve-standard"),
    emphasis: sem("duration-24", "curve-standard-expressive"),
    transition: sem("duration-16", "curve-standard-expressive"),
  };

  // docs/motion.md 4장 · 머무는 시간 (프레임)
  const hold = { "hold-beat": 5, "hold-read": 21, "hold-show": 60, "hold-end": 60 };

  // docs/motion.md 3장 · 5장
  const pattern = {
    // button-press: scale 0.96 (3장, 2026-11-08 새 후보에서 정함)
    press: { down: sem("duration-3", "curve-standard"), up: sem("duration-6", "curve-entrance"), scale: 0.96 },
    countUp: sem("duration-16", "curve-standard-expressive"),
  };
  const camera = {
    // camera-rise (5장): translateY 400 → 0 · rotateX 35 → 8 · scale 0.8 → 1 · perspective 1200 (새 후보에서 정함)
    rise: { d: f(duration["duration-40"]), ease: "curve-out-cubic", y: 400, rotFrom: 35, rotTo: 8, scaleFrom: 0.8, perspective: 1200 },
    // camera-push (5장): 다가감 duration-24 · curve-standard-expressive → 채움 duration-6 · curve-exit
    push: { d: f(duration["duration-24"]), ease: "curve-standard-expressive", fillD: f(duration["duration-6"]), fillEase: "curve-exit" },
  };

  // docs/video.md
  const video = {
    scale: 2.8, // video-scale · video-part-scale
    phoneScreenScale: 1.1, // video-phone-screen (390×844 × 1.1)
    phone: { w: 457, h: 956, bezel: 14 }, // video-phone · video-phone-bezel
    displayLineHeight: 95, // video-display 행간 (state-swap 이동 거리 = 행간, motion.md 3장)
  };

  window.T = { fps, f, duration, motion, hold, pattern, camera, video, W: 1920, H: 1080 };
})();
