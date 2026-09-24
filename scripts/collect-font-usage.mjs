/**
 * どの書体・どの太さで、実際にどの文字が描かれているかを集める
 * --------------------------------------------------------------
 * 使い方: npm run build → npm run fonts:usage → npm run fonts
 *
 * npm run build で出来た dist をローカルで配信し、全ページを Chrome（ヘッドレス）で開いて
 * 「(font-family, font-weight) ごとに実際に描かれる文字」を集めて
 * scripts/fonts-usage.json に書き出す。build-fonts.mjs はこれを読んで、
 * 本文用の太さを「どのスコープで使われているか」で振り分ける。
 *
 * ⚠ 文字は font-family の「並び全部」に記録する（先頭だけではない）。
 *   例: --font-display は "Space Grotesk", "Zen Kaku Gothic New", … の順で、
 *   欧文は先頭、日本語は2番目の書体が描く。先頭だけに記録すると、日本語が
 *   欧文フォント側に数えられて和文フォントのサブセットから漏れる（実際に起きた不具合）。
 *   FONTS に無い family（sans-serif など）は build-fonts.mjs 側で無視される。
 *
 * 画面幅は 1280 と 390 の2回ぶん（メディアクエリで太さが変わる箇所を取りこぼさないため）。
 * 表示されていない要素（フィルタで隠れているセクション等）も DOM にあれば数える。
 */

// 万一ハングしても必ず終わるようにする（正常終了は妨げない）
setTimeout(() => {
  console.error("タイムアウトで打ち切りました（150秒）");
  process.exit(3);
}, 150000).unref();

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(ROOT, "scripts", "fonts-usage.json");
const WIDTHS = [1280, 390];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
};

async function listHtml(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await listHtml(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function serve(root) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      let file = path.join(root, decodeURIComponent(url.pathname));
      if (!file.startsWith(root)) return res.writeHead(403).end();
      if (url.pathname.endsWith("/") || !path.extname(file)) file = path.join(file, "index.html");
      const buf = await readFile(file);
      res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(buf);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}

// ページ内の実文字を (font-family, font-weight) ごとに集める（family は並び全部）
const COLLECT = () => {
  const out = {};
  const add = (family, weight, text) => {
    if (!family || !text) return;
    const key = `${family}|${weight}`;
    const set = (out[key] ||= new Set());
    for (const ch of text) {
      const cp = ch.codePointAt(0);
      if (cp >= 0x20 && cp !== 0x7f) set.add(ch);
    }
  };
  // font-family の並びを全部返す。総称ファミリー（sans-serif 等）は書体ではないので捨てる。
  const GENERIC = new Set([
    "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui",
    "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded",
    "-apple-system", "blinkmacsystemfont", "math", "emoji", "fangsong",
  ]);
  const families = (stack) =>
    (stack || "")
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter((s) => s && !GENERIC.has(s.toLowerCase()));
  const addStack = (stack, weight, text) => {
    for (const fam of families(stack)) add(fam, weight, text);
  };
  const wof = (w) => (w === "normal" ? "400" : w === "bold" ? "700" : String(parseInt(w, 10) || 400));

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.nodeValue;
    if (!text || !text.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest("script, style, template, noscript")) continue;
    const cs = getComputedStyle(el);
    addStack(cs.fontFamily, wof(cs.fontWeight), text);
  }
  for (const el of document.body.querySelectorAll("*")) {
    for (const pe of ["::before", "::after"]) {
      const cs = getComputedStyle(el, pe);
      const c = cs.content;
      if (!c || c === "none" || c === "normal") continue;
      const m = c.match(/^"([\s\S]*)"$/) || c.match(/^'([\s\S]*)'$/);
      if (!m || !m[1]) continue;
      addStack(cs.fontFamily, wof(cs.fontWeight), m[1]);
    }
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, [...v].join("")]));
};

async function main() {
  if (!existsSync(DIST)) throw new Error("dist がありません。先に npm run build を実行してください。");
  const pages = (await listHtml(DIST)).sort();
  const { server, port } = await serve(DIST);
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const usage = {}; // "Family|weight" -> Set(chars)
  const scopes = {}; // "Family|weight" -> Set("main"|"yumiki")

  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const file of pages) {
      const rel = path.relative(DIST, file).split(path.sep).join("/");
      const url = `http://127.0.0.1:${port}/${rel.replace(/(^|\/)index\.html$/, "$1")}`;
      const scope = rel.startsWith("yumiki/") ? "yumiki" : "main";
      await page.goto(url, { waitUntil: "load", timeout: 20000 });
      await page.evaluate(() => (document.fonts ? document.fonts.ready.then(() => true) : true)).catch(() => {});
      const found = await page.evaluate(COLLECT);
      for (const [k, chars] of Object.entries(found)) {
        (usage[k] ||= new Set());
        for (const ch of chars) usage[k].add(ch);
        (scopes[k] ||= new Set()).add(scope);
      }
    }
    await ctx.close();
    console.log(`幅 ${width}px: ${pages.length} ページ走査`);
  }
  await browser.close();
  server.close();

  const sortByCp = (s) => [...s].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join("");
  const faces = {};
  for (const k of Object.keys(usage).sort()) {
    faces[k] = { scopes: [...scopes[k]].sort(), count: usage[k].size, chars: sortByCp(usage[k]) };
  }
  await writeFile(
    OUT,
    JSON.stringify(
      {
        _memo:
          "npm run fonts:usage が自動生成（手で編集しない）。キーは「font-family|font-weight」。" +
          "font-family の並び全部に記録するので、同じ文字が欧文と和文の両方に出る。",
        generatedFrom: { pages: pages.length, widths: WIDTHS },
        faces,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log(`\n${Object.keys(faces).length} 組（書体×太さ）を ${path.relative(ROOT, OUT)} に書き出しました`);
  for (const [k, v] of Object.entries(faces)) console.log(`  ${k}  ${v.count} 字  [${v.scopes.join(",")}]`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
