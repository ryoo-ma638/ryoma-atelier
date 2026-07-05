// 全ページQAクローラ（開発用・デプロイ対象外）: node qa-crawl.mjs [base]
import { chromium } from 'playwright-core';
import { readdirSync, statSync } from 'node:fs';

const base = process.argv[2] || 'http://localhost:4400';
// dist/ から実ページ一覧を作る
const pages = [];
const walk = (dir, url) => {
  for (const e of readdirSync(dir)) {
    const p = `${dir}/${e}`;
    if (statSync(p).isDirectory()) walk(p, `${url}${e}/`);
    else if (e === 'index.html') pages.push(url || '/');
  }
};
walk(decodeURIComponent(new URL('./dist', import.meta.url).pathname), '/');
pages.sort();

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const problems = [];
page.on('console', (m) => { if (m.type() === 'error') problems.push(`[console] ${page.url()} :: ${m.text().slice(0, 140)}`); });
page.on('pageerror', (e) => problems.push(`[jserror] ${page.url()} :: ${String(e).slice(0, 140)}`));

for (const path of pages) {
  await page.goto(base + path, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => problems.push(`[nav] ${path} timeout`));
  const r = await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    return new Promise((res) => setTimeout(() => {
      const broken = [...document.images]
        .filter((i) => (i.getAttribute('src') || '').length > 0 && i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute('src'));
      res({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken,
        title: document.title,
        h1: document.querySelectorAll('h1,h2').length,
      });
    }, 900));
  }).catch(() => null);
  if (!r) { problems.push(`[eval] ${path} failed`); continue; }
  if (r.overflow) problems.push(`[overflow] ${path}`);
  if (r.broken.length) problems.push(`[img] ${path} :: ${r.broken.join(', ')}`);
  if (!r.title) problems.push(`[title] ${path} empty`);
  if (!r.h1) problems.push(`[headless-page] ${path} no headings`);
}
await browser.close();
console.log(`checked ${pages.length} pages`);
console.log(problems.length ? problems.join('\n') : 'ALL CLEAN ✓');
