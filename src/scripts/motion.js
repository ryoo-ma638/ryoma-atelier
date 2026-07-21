/* =========================================================
   motion.js — 「稜馬のアトリエ」の動き
   ・スクロール登場 / 一字立ち上げ / 手描き線
   ・スクロール進捗（ナビの琥珀の芯＝ビール充填）
   ・紙吹雪（判子スタンプ / クリック / ホバー）
   ・うまくん（スクロールで前傾）
   ・マウス・パララックス（ヒーローのコラージュ）
   ・作品カードの動画＝ホバーで再生（省電力）
   View Transitions（astro:page-load）対応＝ページごとに安全に再初期化。
   すべて prefers-reduced-motion を尊重。
   ========================================================= */
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;

/* ページ単位のクリーンアップ（View Transitionsで多重初期化しない） */
let cleanups = [];
const onEvt = (target, type, fn, opts) => {
  target.addEventListener(type, fn, opts);
  cleanups.push(() => target.removeEventListener(type, fn, opts));
};
const keepIO = (io) => { cleanups.push(() => io.disconnect()); return io; };

/* ---------- 1. スクロール登場 ---------- */
function initReveal() {
  const io = keepIO(new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.classList.add('in');
      el.querySelectorAll('.rise-char').forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 45));
      if (el.dataset.handoff !== undefined) el.classList.add('go');
      io.unobserve(el);
    }
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }));
  document.querySelectorAll('.reveal, .draw-line, [data-reveal]').forEach((el) => io.observe(el));
}

/* ---------- 2. スクロール進捗＝ビール充填（先端をうまくんが駆ける） ---------- */
function initProgress() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;
  let ticking = false;
  let lastTop = document.documentElement.scrollTop;
  let idleTimer;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.setProperty('--p', (max > 0 ? h.scrollTop / max : 0).toFixed(4));
    // 走行中フラグ＋進行方向（うまくんの足と向き）
    if (!REDUCE) {
      const dv = h.scrollTop - lastTop;
      if (dv !== 0) bar.dataset.dir = dv < 0 ? 'up' : 'down';
      lastTop = h.scrollTop;
      bar.classList.add('scrolling');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => bar.classList.remove('scrolling'), 180);
    }
    ticking = false;
  };
  update();
  bar.classList.remove('scrolling');
  onEvt(window, 'scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  onEvt(window, 'resize', update, { passive: true });
  cleanups.push(() => clearTimeout(idleTimer));
}

/* ---------- 3. 紙吹雪 ---------- */
let confettiParts = [];
let confettiRunning = false;
let cctx = null;
const CONFETTI_COLORS = ['#E8A13A', '#E4572E', '#1B2A4A', '#2FA46B', '#3E7BFA', '#F6C878', '#FFFDF8'];

function ensureCanvas() {
  let cv = document.getElementById('confetti-cv');
  if (!cv) {
    cv = document.createElement('canvas');
    cv.id = 'confetti-cv';
    Object.assign(cv.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '90' });
    document.body.appendChild(cv);
  }
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  cctx = cv.getContext('2d'); cctx.scale(dpr, dpr);
  return cv;
}
function burst(x, y, count = 30) {
  if (REDUCE) return;
  ensureCanvas();
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 4 + Math.random() * 9;
    confettiParts.push({
      x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 5,
      g: 0.22 + Math.random() * 0.12,
      w: 6 + Math.random() * 6, h: 9 + Math.random() * 8,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      life: 90 + Math.random() * 40,
    });
  }
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(stepConfetti); }
}
function stepConfetti() {
  if (!cctx || !document.getElementById('confetti-cv')) { confettiRunning = false; confettiParts = []; return; }
  cctx.clearRect(0, 0, innerWidth, innerHeight);
  confettiParts = confettiParts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  for (const p of confettiParts) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr; p.life--;
    cctx.save(); cctx.translate(p.x, p.y); cctx.rotate(p.rot);
    cctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  }
  if (confettiParts.length > 0) requestAnimationFrame(stepConfetti);
  else { confettiRunning = false; cctx.clearRect(0, 0, innerWidth, innerHeight); }
}
const centerOf = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };

function initConfetti() {
  window.__burst = burst;
  // data-confetti: ホバー/クリックで祝福。data-confetti-click: クリック時だけ（＋跳ねる）
  document.querySelectorAll('[data-confetti]').forEach((el) => {
    const fire = () => { const c = centerOf(el); burst(c.x, c.y, +el.dataset.confetti || 30); };
    onEvt(el, 'mouseenter', fire);
    onEvt(el, 'click', fire);
  });
  document.querySelectorAll('[data-confetti-click]').forEach((el) => {
    el.style.cursor = 'pointer';
    onEvt(el, 'click', () => {
      const c = centerOf(el);
      burst(c.x, c.y, +el.dataset.confettiClick || 26);
      el.classList.remove('jump'); void el.offsetWidth; el.classList.add('jump');
    });
  });
}

/* ---------- 4. 判子スタンプ（ヒーロー） ---------- */
function initStamp() {
  const stamp = document.querySelector('[data-stamp]:not(.stamped)');
  if (!stamp) return;
  const t = setTimeout(() => {
    stamp.classList.add('stamped');
    const c = centerOf(stamp);
    burst(c.x, c.y, 14);
  }, 650);
  cleanups.push(() => clearTimeout(t));
}

/* ---------- 5. うまくん：スクロールの速さで前傾 ---------- */
function initHorse() {
  const horse = document.querySelector('[data-horse]');
  if (!horse || REDUCE) return;
  let last = scrollY, idle;
  onEvt(window, 'scroll', () => {
    const dv = scrollY - last; last = scrollY;
    const lean = Math.max(-10, Math.min(10, dv * 0.4));
    horse.style.setProperty('--lean', lean.toFixed(1) + 'deg');
    clearTimeout(idle);
    idle = setTimeout(() => horse.style.setProperty('--lean', '0deg'), 160);
  }, { passive: true });
}

/* ---------- 6. 動画：data-autoplay は画面内で再生 / data-hover はホバー再生 ---------- */
function initVideo() {
  // View Transitions のDOM入れ替え後、<video> の src が選択されず currentSrc が空・readyState 0 の
  // まま読み込まれないことがある（＝更新するまで動画が出ない不具合）。load() で確実に読み込ませてから再生する。
  const ensurePlay = (v) => {
    if (!v.currentSrc && v.getAttribute('src')) { try { v.load(); } catch {} }
    v.muted = true; v.play?.().catch(() => {});
  };
  const auto = document.querySelectorAll('video[data-autoplay]');
  if (auto.length) {
    const io = keepIO(new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target;
        if (e.isIntersecting) ensurePlay(v);
        else v.pause?.();
      }
    }, { threshold: 0.35 }));
    auto.forEach((v) => io.observe(v));
    // 遷移直後は IO の初回判定が外れることもあるため、少し置いて画面内の動画を確実に再生する保険。
    const kick = () => auto.forEach((v) => {
      const r = v.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) ensurePlay(v);
    });
    const t1 = setTimeout(kick, 250);
    const t2 = setTimeout(kick, 900);
    cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
  }
  document.querySelectorAll('video[data-hover]').forEach((v) => {
    const host = v.closest('a, article, div') || v;
    onEvt(host, 'mouseenter', () => ensurePlay(v));
    onEvt(host, 'mouseleave', () => { v.pause?.(); v.currentTime = 0; });
  });
}

/* ---------- 7. マウス・パララックス（fine pointer のみ） ---------- */
function initParallax() {
  if (REDUCE || !FINE) return;
  const scene = document.querySelector('[data-px-scene]');
  if (!scene) return;
  const items = scene.querySelectorAll('[data-px]');
  if (!items.length) return;
  let raf = 0, mx = 0, my = 0;
  const apply = () => {
    raf = 0;
    items.forEach((el) => {
      const f = parseFloat(el.dataset.px || '10');
      el.style.translate = `${(mx * f).toFixed(1)}px ${(my * f).toFixed(1)}px`;
    });
  };
  onEvt(scene, 'mousemove', (e) => {
    const r = scene.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
  onEvt(scene, 'mouseleave', () => {
    mx = 0; my = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
}

function boot() {
  cleanups.forEach((f) => { try { f(); } catch {} });
  cleanups = [];
  initReveal();
  initProgress();
  initConfetti();
  initStamp();
  initHorse();
  initVideo();
  initParallax();
}

/* View Transitions 対応：初回もページ遷移後も astro:page-load が発火する */
document.addEventListener('astro:page-load', boot);
if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
