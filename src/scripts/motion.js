/* =========================================================
   motion.js — 「稜馬のアトリエ」の独特なアニメーション群
   ・紙吹雪バースト（本人のCG作品「紙吹雪演出」由来）
   ・スクロール進捗＝ビールが注がれる（売り子モチーフ）
   ・登場（rise + 弾む着地）/ 手描き線を引く / 一字立ち上げ
   ・判子スタンプ / 「手渡す」飛来
   すべて prefers-reduced-motion を尊重して自動で静かになる。
   ========================================================= */
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. スクロール登場・手描き線・一字立ち上げ ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.classList.add('in');
      // 見出しの一字立ち上げ（子の .rise-char を順に）
      const chars = el.querySelectorAll('.rise-char');
      chars.forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 45));
      // 手渡し飛来
      if (el.dataset.handoff !== undefined) el.classList.add('go');
      io.unobserve(el);
    }
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .draw-line, [data-reveal]').forEach((el) => io.observe(el));
}

/* ---------- 2. スクロール進捗＝ビール充填 ---------- */
function initProgress() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    bar.style.setProperty('--p', p.toFixed(4));
    ticking = false;
  };
  update();
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update, { passive: true });
}

/* ---------- 3. 紙吹雪バースト ---------- */
let confettiParts = [];
let confettiRunning = false;
let cctx = null;
const CONFETTI_COLORS = ['#E8A13A', '#E4572E', '#1B2A4A', '#2FA46B', '#3E7BFA', '#F6C878', '#FFFDF8'];

function ensureCanvas() {
  let cv = document.getElementById('confetti-cv');
  if (!cv) {
    cv = document.createElement('canvas');
    cv.id = 'confetti-cv';
    Object.assign(cv.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '90',
    });
    document.body.appendChild(cv);
  }
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  cctx = cv.getContext('2d'); cctx.scale(dpr, dpr);
  return cv;
}

function burst(x, y, count = 42) {
  if (REDUCE) return;
  ensureCanvas();
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 4 + Math.random() * 9;
    confettiParts.push({
      x, y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 5,
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
  if (!cctx) { confettiRunning = false; return; }
  cctx.clearRect(0, 0, innerWidth, innerHeight);
  confettiParts = confettiParts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  for (const p of confettiParts) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr; p.life--;
    cctx.save();
    cctx.translate(p.x, p.y); cctx.rotate(p.rot);
    cctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  }
  if (confettiParts.length > 0) requestAnimationFrame(stepConfetti);
  else { confettiRunning = false; cctx.clearRect(0, 0, innerWidth, innerHeight); }
}

function centerOf(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function initConfetti() {
  window.__burst = burst;
  // トリガー要素：ホバー/クリック/フォーカスで祝福
  document.querySelectorAll('[data-confetti]').forEach((el) => {
    const fire = () => { const c = centerOf(el); burst(c.x, c.y, +el.dataset.confetti || 30); };
    el.addEventListener('mouseenter', fire);
    el.addEventListener('click', fire);
  });
}

/* ---------- 4. 判子スタンプ（ヒーロー、読み込み時に一度） ---------- */
function initStamp() {
  const stamp = document.querySelector('[data-stamp]');
  if (!stamp) return;
  const go = () => {
    stamp.classList.add('stamped');
    const c = centerOf(stamp);
    burst(c.x, c.y, 24);
  };
  setTimeout(go, 650);
}

/* ---------- 5. 馬：スクロールの速さで前傾（疾走感） ---------- */
function initHorse() {
  const horse = document.querySelector('[data-horse]');
  if (!horse || REDUCE) return;
  let last = scrollY, idle;
  addEventListener('scroll', () => {
    const dv = scrollY - last; last = scrollY;
    const lean = Math.max(-10, Math.min(10, dv * 0.4));
    horse.style.setProperty('--lean', lean.toFixed(1) + 'deg');
    horse.classList.add('running');
    clearTimeout(idle);
    idle = setTimeout(() => { horse.style.setProperty('--lean', '0deg'); horse.classList.remove('running'); }, 160);
  }, { passive: true });
}

/* ---------- 6. 動画は画面内のときだけ再生（省電力） ---------- */
function initVideoInView() {
  const vids = document.querySelectorAll('video[preload="none"], video[loop]');
  if (!vids.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target;
      if (e.isIntersecting) { v.muted = true; v.play?.().catch(() => {}); }
      else v.pause?.();
    }
  }, { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));
}

function boot() {
  initReveal();
  initProgress();
  initConfetti();
  initStamp();
  initHorse();
  initVideoInView();
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
