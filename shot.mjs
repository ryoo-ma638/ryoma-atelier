// スクショ補助（開発用・デプロイ対象外）: node shot.mjs <url> <out.png> [width] [height] [fullPage]
import { chromium } from 'playwright-core';
const [url, out, w = '1440', h = '1000', full = ''] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
await page.waitForTimeout(1200);
// アニメを止めて撮影を安定させ、登場系は最終状態に
await page.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused !important;transition:none !important}' }).catch(() => {});
await page.evaluate(() => {
  document.querySelectorAll('.reveal,.draw-line,[data-reveal],.rise-char').forEach((e) => e.classList.add('in', 'go'));
  document.querySelectorAll('[data-stamp]').forEach((e) => e.classList.add('stamped'));
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; i.src = i.src; });
  const c = document.getElementById('confetti-cv'); if (c) c.remove();
}).catch(() => {});
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: full === 'full' });
await browser.close();
console.log('saved', out);
