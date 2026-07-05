// セクション拡大スクショ（開発用）: node secshot.mjs <url> <selector> <out.png> [width] [height]
import { chromium } from 'playwright-core';
const [url, selector, out, w = '390', h = '844'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
await page.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused !important;transition:none !important}' }).catch(() => {});
await page.evaluate(() => {
  document.querySelectorAll('.reveal,.draw-line,[data-reveal],.rise-char').forEach((e) => e.classList.add('in', 'go'));
  document.querySelectorAll('[data-stamp]').forEach((e) => e.classList.add('stamped'));
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
  const c = document.getElementById('confetti-cv'); if (c) c.remove();
});
await page.waitForTimeout(800);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await el.screenshot({ path: out });
await browser.close();
console.log('saved', out);
