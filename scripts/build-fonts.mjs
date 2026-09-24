/**
 * Webフォントの自前配信ビルド（サブセット化）
 * --------------------------------------------------
 * 使い方: npm run build → npm run fonts:usage → npm run fonts
 *
 * やること
 *   1. 元の TTF（Google Fonts / すべて OFL）を一時フォルダに取得する
 *   2. その書体が受け持つ文字だけを残す
 *   3. public/fonts/*.woff2 と src/styles/fonts-main.css / fonts-yumiki.css を書き出す
 *
 * 文字集合は「本体（/ , /about/ , /works/ …）」と「推しサイト（/yumiki/）」で分ける。
 * 使う書体が別々なので、片方の文字をもう片方の woff2 に入れる必要がない。
 *
 * どの太さも2ファイルに分ける（＝A で足りなくても必ずこの書体で描ける）
 *   A   … 初回表示で読む。本文用の太さはそのスコープの全文字、見出し・装飾用の太さは
 *         「実測でその太さに出た文字（scripts/fonts-usage.json）＋かな＋ASCII＋約物」。
 *   ext … A に入らなかった残り（本文用は残りの常用漢字、見出し用はそのスコープの残りの漢字）。
 *         unicode-range 付き＝**その字が出たときだけ**読む。A で足りるページでは増えない。
 *
 * ⚠ 以前は見出し・装飾用の太さを「実測に出た文字だけ」にして ext を付けなかった。
 *   JS で後から入る文字（ライトボックスのキャプション・シングルの解説・お誕生日の文言）は
 *   実測に出ないため、その太さだけ OS のフォント（ヒラギノ等）に落ちる不具合が出た。
 *   いまは ext が受け止めるので、実測に漏れがあっても書体は変わらない（読み込みが1本増えるだけ）。
 *
 * 欧文フォントは「元の TTF が持っている文字」との積を取る（cmap を読む）。しきい値で
 * 切ると ↗ のような記号が落ちて、その字だけ OS のフォントで描かれる。
 *
 * 生成物（public/fonts/*.woff2 ・ src/styles/fonts-*.css ・ scripts/fonts-chars.txt ・
 * scripts/fonts-usage.json）はコミットする。ビルド（GitHub Actions）では走らせない。
 */

// 万一ハングしても必ず終わるようにする（正常終了は妨げない）
setTimeout(() => {
  console.error("タイムアウトで打ち切りました（150秒）");
  process.exit(3);
}, 150000).unref();

import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "src");
const OUT_DIR = path.join(ROOT, "public", "fonts");
const CSS_DIR = path.join(ROOT, "src", "styles");
const CHARS_OUT = path.join(ROOT, "scripts", "fonts-chars.txt");
const JOYO_FILE = path.join(ROOT, "scripts", "joyo-kanji.txt");
const USAGE_FILE = path.join(ROOT, "scripts", "fonts-usage.json");

// 元TTFの置き場（リポジトリ外・2サイトで共用）。FONT_SRC_DIR で変えられる。
const SRC_FONT_DIR = process.env.FONT_SRC_DIR || path.join(os.tmpdir(), "portfolio-font-src");
const GF_BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl";

// 推しサイト（/yumiki/）側のファイル。ここに出る文字は yumiki 用の書体だけに入れる。
const YUMIKI_PATHS = [
  "pages/yumiki",
  "layouts/Yumiki.astro",
  "data/yumiki.ts",
];

// 本体・推しサイトの両方で使う共通パーツ。ここに出る文字は両方の書体に入れる。
const BOTH_PATHS = [
  "components/Lightbox.astro",
];

/* ---------------- このサイトで使う書体 ---------------- */
// weight          = CSS の font-weight
// scope           = main（本体）/ yumiki（推しサイト）/ both
// split           = 本文用の太さ。A にサイトの全文字を入れる（見出し用は実使用分だけ）
// variableWeight  = 可変フォント。1本のファイルを複数の @font-face で宣言する
//                   （以前 Google Fonts が配っていた静的ウェイトと同じ太さが当たるように刻む）
const FONTS = [
  {
    // 本文・見出しの土台（Base.astro）。body が font-weight: 500
    family: "Zen Kaku Gothic New",
    slug: "zen-kaku-gothic-new",
    jp: true,
    scope: "main",
    faces: [
      { weight: 500, src: "ZenKakuGothicNew-Medium.ttf", split: true }, // 本文
      { weight: 700, src: "ZenKakuGothicNew-Bold.ttf" },
      { weight: 900, src: "ZenKakuGothicNew-Black.ttf" },
    ],
  },
  {
    // 丸ゴシック。本体はバッジ・ラベル（700/900）、推しサイトは本文・見出し
    family: "Zen Maru Gothic",
    slug: "zen-maru-gothic",
    jp: true,
    scope: "both",
    faces: [
      { weight: 400, src: "ZenMaruGothic-Regular.ttf", split: true }, // /yumiki/ の本文
      { weight: 500, src: "ZenMaruGothic-Medium.ttf" },
      { weight: 700, src: "ZenMaruGothic-Bold.ttf" },
      { weight: 900, src: "ZenMaruGothic-Black.ttf" },
    ],
  },
  {
    // 手書きマーカー（Base.astro）
    family: "Yusei Magic",
    slug: "yusei-magic",
    jp: true,
    scope: "main",
    faces: [{ weight: 400, src: "YuseiMagic-Regular.ttf" }],
  },
  {
    // 等幅のラベル・キャプション（Base.astro）。可変フォント1本で 500/700
    family: "JetBrains Mono",
    slug: "jetbrains-mono",
    jp: false,
    scope: "main",
    variableWeight: ["500", "700"],
    faces: [{ src: "JetBrainsMono[wght].ttf" }],
  },
  {
    // 推しサイトの欧文（Yumiki.astro）。可変フォント1本で 500/600/700
    family: "Quicksand",
    slug: "quicksand",
    jp: false,
    scope: "yumiki",
    variableWeight: ["500 700"],
    faces: [{ src: "Quicksand[wght].ttf" }],
  },
  {
    // 推しサイトの手書きアクセント（Yumiki.astro）
    family: "Yomogi",
    slug: "yomogi",
    jp: true,
    scope: "yumiki",
    faces: [{ weight: 400, src: "Yomogi-Regular.ttf" }],
  },
];

/* ---------------- 文字集合 ---------------- */
// 和文フォントに必ず入れる範囲（フォントに無いコードポイントは自動で無視される）
const JP_RANGES = [
  [0x0020, 0x007e], // ASCII
  [0x3000, 0x303f], // 　、。「」『』（）〜…々〆〇
  [0x3041, 0x309f], // ひらがな
  [0x30a0, 0x30ff], // カタカナ
  [0xff01, 0xff60], // 全角英数・記号・約物
  [0xff61, 0xff9f], // 半角カタカナ
];

// 追加で入れておく記号・約物（ブロック全部は入れない＝容量対策）
// サイトに実際に出てくる記号は自動で入るので、ここは「あとから足しそうな分」の保険だけ
const EXTRA_SYMBOLS =
  "¥§¶©®°±×÷" +
  "‐–—‘’“”†‡•…‰′″※" +
  "℃№™" +
  "←↑→↓↔⇄⇒⇔" +
  "∞≠≦≧≪≫√∴" +
  "─│┌┐└┘├┤┬┴┼" +
  "■□▲△▼▽◀▶◆◇○●◎" +
  "★☆♪♡♥" +
  "✓✔✕✖➜➡" +
  "①②③④⑤⑥⑦⑧⑨⑩";

// 欧文フォントに入れる範囲
const LATIN_RANGES = [
  [0x0020, 0x007e],
  [0x00a0, 0x00ff],
];
const LATIN_SYMBOLS = "‐‑‒–—―‘’‚“”„†‡•…‰′″※→←↑↓↔↖↗↘↙⇄⇆⇒⇔∞≠≦≧√✓★☆♪♥①②③④⑤⑥⑦⑧⑨⑩";

// 見出し・装飾用の太さの A に、実測の文字とは別に必ず入れる最低限。
// ASCII と主な約物は1字あたりが軽いので必ず入れる（記号1文字のために ext を読ませない）。
const SAFE_BASE =
  [...Array(0x7e - 0x20 + 1)].map((_, i) => String.fromCodePoint(0x20 + i)).join("") +
  "　、。，．・：；？！ー〜（）「」『』【】…／＋－×＝％＆";

const SCAN_EXT = new Set([".astro", ".ts", ".tsx", ".js", ".mjs", ".md", ".mdx", ".json"]);

// コメントは画面に出ないので文字集合から外す（日本語の説明コメントが多く、その分だけ軽くなる）。
// 外しすぎていないかは、最後に dist の HTML と機械照合して確かめる。
const stripComments = (s) =>
  s
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:\w])\/\/[^\n]*/g, "$1");

function expand(ranges) {
  const set = new Set();
  for (const [a, b] of ranges) for (let c = a; c <= b; c++) set.add(String.fromCodePoint(c));
  return set;
}

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (SCAN_EXT.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

const sortByCp = (s) => [...s].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join("");

// 連続するコードポイントをまとめて unicode-range の文字列にする
function toUnicodeRange(chars) {
  const cps = [...chars].map((c) => c.codePointAt(0)).sort((a, b) => a - b);
  const hex = (n) => n.toString(16).toUpperCase().padStart(4, "0");
  const parts = [];
  let i = 0;
  while (i < cps.length) {
    let j = i;
    while (j + 1 < cps.length && cps[j + 1] === cps[j] + 1) j++;
    parts.push(i === j ? `U+${hex(cps[i])}` : `U+${hex(cps[i])}-${hex(cps[j])}`);
    i = j + 1;
  }
  return parts.join(", ");
}

function wrap(str, n = 100) {
  const cps = [...str];
  const lines = [];
  for (let i = 0; i < cps.length; i += n) lines.push(cps.slice(i, i + n).join(""));
  return lines.join("\n");
}

// CSS のフォント照合（太さ）と同じ決め方で、欲しい太さ → 実際に当たる face の太さ を返す。
// 例: Shippori Mincho が 600/700/800 のとき、font-weight 未指定（400）には 600 が当たる。
function matchWeight(avail, desired) {
  const ws = [...new Set(avail)].sort((a, b) => a - b);
  if (ws.includes(desired)) return desired;
  const below = ws.filter((w) => w < desired).sort((a, b) => b - a);
  const above = ws.filter((w) => w > desired).sort((a, b) => a - b);
  if (desired >= 400 && desired <= 500) {
    const mid = above.filter((w) => w <= 500);
    if (mid.length) return mid[0];
    if (below.length) return below[0];
    return above[0];
  }
  if (desired < 400) return below.length ? below[0] : above[0];
  return above.length ? above[0] : below[0];
}

// 元の TTF が持っている文字（cmap）を読む。欧文フォントの文字集合を
// 「元フォントにある字だけ」に絞るのに使う（無い字を渡しても落ちないが、
// しきい値で切ると ↗ のような記号を取りこぼすため、積を取る方式にした）。
function ttfChars(buf) {
  try {
    const u16 = (o) => buf.readUInt16BE(o);
    const u32 = (o) => buf.readUInt32BE(o);
    let base = 0;
    if (buf.toString("latin1", 0, 4) === "ttcf") base = u32(12); // フォントコレクションは1本目
    const numTables = u16(base + 4);
    let cmap = 0;
    for (let i = 0; i < numTables; i++) {
      const rec = base + 12 + i * 16;
      if (buf.toString("latin1", rec, rec + 4) === "cmap") cmap = u32(rec + 8);
    }
    if (!cmap) return null;
    const subs = [];
    for (let i = 0, n = u16(cmap + 2); i < n; i++) {
      const p = cmap + 4 + i * 8;
      subs.push({ pid: u16(p), eid: u16(p + 2), at: cmap + u32(p + 4) });
    }
    const uni = subs.filter((s) => (s.pid === 3 && (s.eid === 1 || s.eid === 10)) || s.pid === 0);
    const out = new Set();
    for (const s of uni.length ? uni : subs) {
      const fmt = u16(s.at);
      if (fmt === 4) {
        const segX2 = u16(s.at + 6);
        const endO = s.at + 14;
        const startO = endO + segX2 + 2;
        const deltaO = startO + segX2;
        const rangeO = deltaO + segX2;
        for (let j = 0; j < segX2 / 2; j++) {
          const end = u16(endO + j * 2);
          const start = u16(startO + j * 2);
          const delta = buf.readInt16BE(deltaO + j * 2);
          const ro = u16(rangeO + j * 2);
          if (start > end || start === 0xffff) continue;
          for (let c = start; c <= end; c++) {
            let g;
            if (ro === 0) g = (c + delta) & 0xffff;
            else {
              const gi = rangeO + j * 2 + ro + (c - start) * 2;
              if (gi + 2 > buf.length) continue;
              g = u16(gi);
              if (g) g = (g + delta) & 0xffff;
            }
            if (g) out.add(String.fromCodePoint(c));
          }
        }
      } else if (fmt === 12) {
        for (let j = 0, n = u32(s.at + 12); j < n; j++) {
          const g = s.at + 16 + j * 12;
          const a = u32(g);
          const b = u32(g + 4);
          for (let c = a; c <= b && c - a < 0x10000; c++) out.add(String.fromCodePoint(c));
        }
      }
    }
    return out.size ? out : null;
  } catch {
    return null; // 読めなければ従来どおり（絞り込みなし）で進める
  }
}

async function ensureSource(file) {
  const local = path.join(SRC_FONT_DIR, file);
  if (existsSync(local)) return readFile(local);
  const dir = FONTS.find((f) => f.faces.some((x) => x.src === file))
    .family.toLowerCase()
    .replace(/\s+/g, "");
  const url = `${GF_BASE}/${dir}/${encodeURIComponent(file)}`;
  process.stdout.write(`  取得 ${file} … `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ダウンロード失敗 ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(SRC_FONT_DIR, { recursive: true });
  await writeFile(local, buf);
  console.log(`${(buf.length / 1024 / 1024).toFixed(1)}MB`);
  return buf;
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;

// ビルドした woff2 と dist の HTML を機械照合して、画面に出る文字の取りこぼしを見つける。
// **face（ファミリー＋太さ）単位**で見るのが要点。「サイト全体の文字集合」だけを見ていると、
// ある太さの woff2 にだけ穴が空いていても緑になってしまう（実際にそれで見落とした）。
// 元の TTF にもグリフが無い文字（↗ ✦ ✿ ― ≒ ✉ 絵文字など）は、その face では対象外。
// dist が無ければ黙って飛ばす。
async function verifyAgainstDist(builtFaces) {
  const dist = path.join(ROOT, "dist");
  if (!existsSync(dist)) return 0;
  const pages = [];
  const walkHtml = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walkHtml(p);
      else if (e.name.endsWith(".html")) pages.push(p);
    }
  };
  await walkHtml(dist);

  let ng = 0;
  let noCmap = 0;
  for (const p of pages) {
    const rel = path.relative(dist, p).split(path.sep).join("/");
    const scope = rel.startsWith("yumiki/") ? "yumiki" : "main";
    const text = (await readFile(p, "utf8"))
      .replace(/<head[\s\S]*?<\/head>/i, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]*>/g, " ");
    const chars = new Set();
    for (const ch of text) {
      const cp = ch.codePointAt(0);
      if (cp >= 0x20 && cp !== 0x7f) chars.add(ch);
    }
    for (const f of builtFaces) {
      if (!f.scopes.includes(scope)) continue;
      if (!f.cmap) {
        noCmap += 1;
        continue; // cmap が読めなかった face は照合できない
      }
      const missing = new Set();
      for (const ch of chars) if (f.cmap.has(ch) && !f.chars.has(ch)) missing.add(ch);
      if (missing.size) {
        ng += 1;
        console.error(`  ⚠ ${rel} × ${f.label}: 未収録 ${missing.size} 字 … ${sortByCp(missing)}`);
      }
    }
  }
  if (noCmap) console.warn(`  （cmap を読めず照合を飛ばした組 ${noCmap} 件）`);
  console.log(
    ng
      ? `dist 照合: ${ng} 件（ページ×太さ）に未収録の文字あり`
      : `dist 照合: ${pages.length} ページ × ${builtFaces.length} 太さ すべて収録済み（元フォントに無い文字は除外）`
  );
  return ng;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // 1) サイト内に出てくる文字を集める（本体／推しサイト別）
  const files = await walk(SRC_DIR);
  const site = { main: new Set(), yumiki: new Set() };
  for (const f of files) {
    const rel = path.relative(SRC_DIR, f).split(path.sep).join("/");
    const hit = (list) => list.some((p) => rel === p || rel.startsWith(`${p}/`));
    const keys = hit(BOTH_PATHS) ? ["main", "yumiki"] : hit(YUMIKI_PATHS) ? ["yumiki"] : ["main"];
    for (const ch of stripComments(await readFile(f, "utf8"))) {
      const cp = ch.codePointAt(0);
      if (cp >= 0x20 && cp !== 0x7f) for (const k of keys) site[k].add(ch);
    }
  }

  // 2) 太さごとの実使用文字（npm run fonts:usage の結果）を読む
  let usageRaw = null;
  if (existsSync(USAGE_FILE)) usageRaw = JSON.parse(await readFile(USAGE_FILE, "utf8")).faces || {};
  else
    console.warn(
      "⚠ scripts/fonts-usage.json がありません。どの太さも A に両スコープの全文字を入れます（重くなります）。\n" +
        "  npm run build → npm run fonts:usage を先に実行してください。"
    );

  // font-family と font-weight（実際に描かれた値）を、この書体のどの face が受けるかで振り分ける。
  // いま使うのは「どのスコープ（main / yumiki）で描かれたか」だけ＝A と ext の振り分けに使う。
  // 文字の一覧（chars）は参考情報（fonts-chars.txt の内訳表示）にしか使わない。
  const usageByFace = (font) => {
    const avail = font.faces.map((f) => f.weight);
    const out = new Map(avail.map((w) => [w, { chars: new Set(), scopes: new Set() }]));
    if (!usageRaw) return out;
    for (const [key, val] of Object.entries(usageRaw)) {
      const i = key.lastIndexOf("|");
      if (key.slice(0, i) !== font.family) continue;
      const hit = out.get(matchWeight(avail, Number(key.slice(i + 1))));
      for (const ch of val.chars || "") hit.chars.add(ch);
      for (const sc of val.scopes || []) hit.scopes.add(sc);
    }
    return out;
  };

  // 3) 文字集合の土台を作る
  const joyo = [...(await readFile(JOYO_FILE, "utf8")).trim()];
  const jpCommon = new Set([...expand(JP_RANGES), ...EXTRA_SYMBOLS]);
  const latinCommon = new Set([...expand(LATIN_RANGES), ...LATIN_SYMBOLS]);

  const scopeChars = (scope) =>
    scope === "both" ? new Set([...site.main, ...site.yumiki]) : new Set(site[scope]);

  // その書体・その太さが背負い得る最大の集合（A に入らなかったぶんは ext に回る）
  // 本文用の太さは常用漢字まで、見出し・装飾用の太さは「そのスコープに出る文字」までを受け持つ。
  // 欧文フォントは元の TTF が持っている文字との積を取る（しきい値で切ると ↗ 等を落とす）。
  const fullSetOf = (font, face, cmap) => {
    const own = scopeChars(font.scope);
    if (!font.jp) {
      const cand = new Set([...latinCommon, ...own]);
      return new Set([...cand].filter((c) => (cmap ? cmap.has(c) : c.codePointAt(0) < 0x2000)));
    }
    return new Set([...own, ...jpCommon, ...(face.split ? joyo : [])]);
  };

  // その太さが実際に描かれているスコープ（fonts-usage.json 由来）。A に入れる文字はここで決める。
  // 記録が無ければ、その書体が宣言されているスコープ全部。
  const activeScopes = (font, used) =>
    used && used.scopes.size ? [...used.scopes].sort() : font.scope === "both" ? ["main", "yumiki"] : [font.scope];

  // 4) 文字集合を書き出す（差分が追えるように）
  const setMain = new Set([...site.main, ...jpCommon]);
  const setYumiki = new Set([...site.yumiki, ...jpCommon]);
  const bMain = new Set(joyo.filter((c) => !setMain.has(c)));
  const bYumiki = new Set(joyo.filter((c) => !setYumiki.has(c)));

  // 5) サブセット化して woff2 と fonts-main.css / fonts-yumiki.css を書き出す
  const header = [
    "/* npm run fonts が自動生成（手で編集しない）",
    "   自前配信のサブセット woff2。Google Fonts への通信は無し。",
    "   ...-ext.woff2 は unicode-range 付き＝その字が出たときだけ読み込む。 */",
    "",
  ];
  const cssBy = { main: [...header], yumiki: [...header] };
  const made = new Set();
  const report = [];
  const builtFaces = []; // dist 照合用（face ごとの cmap と収録文字）
  let total = 0;

  for (const font of FONTS) {
    const usage = usageByFace(font);

    for (const face of font.faces) {
      const ttf = await ensureSource(face.src);
      const cmap = ttfChars(ttf);
      const full = fullSetOf(font, face, cmap);
      const bands = font.variableWeight || [String(face.weight)];
      const base = font.variableWeight ? `${font.slug}-var` : `${font.slug}-${face.weight}`;

      // A の中身
      //   欧文・可変フォント … 元の TTF が持っている文字すべて
      //   本文用の和文     … その太さが使われているスコープの全文字（＋かな・ASCII・約物）
      //   見出し用の和文   … 実測でその太さに出た文字＋かな・ASCII・約物
      // どの場合も足りないぶんは下の ext（unicode-range）が受けるので、A に無い字が来ても
      // 書体は変わらない（＝太さで間引いても OS のフォントに落ちない）。
      let setA;
      let mode;
      const used = usage.get(face.weight);
      if (!font.jp || font.variableWeight) {
        setA = new Set(full);
        mode = "元フォントの持つ全文字";
      } else if (face.split || !usageRaw) {
        const scopes = activeScopes(font, used);
        setA = new Set([...scopes.flatMap((sc) => [...site[sc]]), ...jpCommon]);
        mode = `${face.split ? "本文" : "実測データ無し"}（${scopes.join("+")}の全文字）`;
      } else {
        setA = new Set([...used.chars, ...jpCommon, ...SAFE_BASE]);
        mode = "見出し・装飾（実測＋かな・記号／残りは ext）";
      }
      // ext（unicode-range 付き＝その字が出たときだけ読む）が受けるのは A の残り。
      // 本文用は残りの常用漢字、見出し用は「いま使われていないスコープの文字」。
      // A でそのページが足りていれば1本も増えない（A に無い字が来たときだけ読まれる）。
      const setExt = new Set([...full].filter((c) => !setA.has(c)));

      const jobs = [{ name: `${base}.woff2`, chars: setA, range: null }];
      if (setExt.size) jobs.push({ name: `${base}-ext.woff2`, chars: setExt, range: toUnicodeRange(setExt) });

      builtFaces.push({
        label: `${font.family} ${font.variableWeight ? font.variableWeight.join(" / ") : face.weight}`,
        scopes: font.scope === "both" ? ["main", "yumiki"] : [font.scope],
        cmap,
        chars: new Set([...setA, ...setExt]), // A と ext を合わせて「この太さで出せる文字」
      });

      for (const job of jobs) {
        const buf = await subsetFont(ttf, sortByCp(job.chars), { targetFormat: "woff2" });
        await writeFile(path.join(OUT_DIR, job.name), buf);
        made.add(job.name);
        const isExt = job.name.includes("-ext");
        console.log(`  ${job.name} ${kb(buf.length)} / ${job.chars.size} 字${isExt ? "（unicode-range・必要な字が出たときだけ）" : `・${mode}`}`);
        if (!isExt) total += buf.length;
        report.push(
          `${font.family} ${font.variableWeight ? font.variableWeight.join(" / ") : face.weight}` +
            `${isExt ? " ext" : ""}: ${job.chars.size} 字 / ${kb(buf.length)}`
        );

        for (const band of bands) {
          const lines = [
            "@font-face {",
            `  font-family: "${font.family}";`,
            "  font-style: normal;",
            `  font-weight: ${band};`,
            "  font-display: swap;",
            `  src: url("/fonts/${job.name}") format("woff2");`,
          ];
          if (job.range) lines.push(`  unicode-range: ${job.range};`);
          lines.push("}", "");
          for (const s of font.scope === "both" ? ["main", "yumiki"] : [font.scope]) cssBy[s].push(...lines);
        }
      }
    }
  }

  // 使わなくなった woff2 を消す（太さを足したり減らしたときの取り残し防止）
  for (const f of await readdir(OUT_DIR)) {
    if (f.endsWith(".woff2") && !made.has(f)) {
      await unlink(path.join(OUT_DIR, f));
      console.log(`  （削除）${f}`);
    }
  }

  await writeFile(
    CHARS_OUT,
    [
      "# npm run fonts が自動生成（手で編集しない）",
      "# 文字を足したら npm run build → npm run fonts:usage → npm run fonts の順で作り直す。",
      "",
      "# 太さごとの内訳",
      ...report.map((r) => `#   ${r}`),
      "",
      `# A-main = 本体の本文用が読む集合（${setMain.size} 字／うちサイト内の実文字 ${site.main.size} 字）`,
      wrap(sortByCp(setMain)),
      "",
      `# A-yumiki = /yumiki/ の本文用が読む集合（${setYumiki.size} 字／うちサイト内の実文字 ${site.yumiki.size} 字）`,
      wrap(sortByCp(setYumiki)),
      "",
      `# ext-main = 本体の本文用が unicode-range で遅延して読む残りの常用漢字（${bMain.size} 字）`,
      wrap(sortByCp(bMain)),
      "",
      `# ext-yumiki = /yumiki/ の本文用が遅延して読む残りの常用漢字（${bYumiki.size} 字）`,
      wrap(sortByCp(bYumiki)),
      "",
    ].join("\n"),
    "utf8"
  );

  const ng = await verifyAgainstDist(builtFaces);

  for (const scope of ["main", "yumiki"]) {
    await writeFile(path.join(CSS_DIR, `fonts-${scope}.css`), cssBy[scope].join("\n"), "utf8");
  }
  console.log(`\n初回に読む合計（A のみ・全書体） ${kb(total)} / ファイル ${made.size} 本`);
  console.log(`→ src/styles/fonts-main.css ・ src/styles/fonts-yumiki.css と ${path.relative(ROOT, OUT_DIR)} を更新しました`);
  if (ng) {
    console.error(
      "\n⚠ 画面に出る文字がサブセットに入っていない組があります（上の一覧）。" +
        "その文字だけ OS のフォントで描かれます。FONTS の scope／faces と文字集合の作り方を見直してください。"
    );
    process.exitCode = 2;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
