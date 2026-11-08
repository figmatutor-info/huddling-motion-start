// 패턴 — docs/motion.md 3장 · 5장. 값은 window.T(tokens.js)에서만 가져온다.
(function () {
  const { f, motion, video, W, H } = T;

  // ×2.8 감싸개(.x28) 안의 요소가 영상 프레임에서 차지하는 사각형.
  // 레이아웃 좌표(offset*)로 재고, 감싸개가 가운데에서 ×2.8 된다는 것(docs/video.md 5장)으로 바꾼다.
  function rectInFrame(el, wrapper) {
    let x = 0, y = 0, n = el;
    while (n && n !== wrapper) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    const s = video.scale, ww = wrapper.offsetWidth, wh = wrapper.offsetHeight;
    const left = W / 2 + (x - ww / 2) * s, top = H / 2 + (y - wh / 2) * s;
    return { left, top, right: left + el.offsetWidth * s, bottom: top + el.offsetHeight * s };
  }

  // 폰이 화면을 덮는 배율: 폰 크기(docs/video.md 4장)와 영상 크기에서 계산
  const coverScale = Math.max(W / video.phone.w, H / video.phone.h);

  // screen-change (3장): 누른 부품이 커져 화면을 채우고(motion-transition 1단계) → 다음 화면이 됨(2단계, camera-pull)
  // radius = 그 부품의 피그마 모서리(px, ×2.8 전)
  function screenChange(tl, t0, { from, wrapper, fill, phone, hide, radius }) {
    const r = rectInFrame(from, wrapper);
    const rad = radius * video.scale;
    const t = motion.transition;
    tl.set(fill, { opacity: 1, clipPath: `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round ${rad}px)` }, t0);
    tl.to(fill, { clipPath: `inset(0px 0px 0px 0px round 0px)`, duration: t.d, ease: t.ease }, t0);
    const t1 = t0 + t.d;
    if (hide) tl.set(hide, { opacity: 0 }, t1);
    tl.fromTo(phone, { scale: coverScale, opacity: 1 }, { scale: 1, duration: t.d, ease: t.ease, immediateRender: false }, t1);
    tl.to(fill, { opacity: 0, duration: t.d, ease: t.ease }, t1);
    return t1 + t.d;
  }

  T.rectInFrame = rectInFrame;
  T.screenChange = screenChange;
})();
