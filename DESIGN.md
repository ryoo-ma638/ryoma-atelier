# DESIGN.md — 「稜馬のアトリエ」デザイン言語（v2 大改修）

本人が生成したモック（生成りの紙×紺×琥珀×朱・手書き・マスコット「うまくん」・躍動コラージュ）を全ページで再現するための共通ルール。**トップのヒーロー（Hero.astro）と Nav.astro が実装基準**＝迷ったらそこの書き方に合わせる。

## 世界観の言葉
あたたかい／親しみ／手作り／明るい昼の仕事場／ポップで元気／少し手描き／まっすぐ。
**禁止**：ダーク背景・ネオン/グラデ盛り・冷たいミニマル・薄グレー基調・明朝/セリフ・純黒 #000。

## トークン（src/styles/tokens.css 定義済み・必ず var() で使う）
- 面: `--paper #F7F1E4` / `--paper-2 #FBF7EE` / `--paper-3 #EFE7D5` / `--card #FFFDF8`
- 墨: `--ink #1B2A4A`（文字・線・濃い面）/ `--mut #6A6152`（副文）
- 芯: `--amber #E8A13A` / `--amber-d #C9871F` / `--amber-l #F6C878`
- 熱: `--scarlet #E4572E` / `--scarlet-d #C33E1A`
- 角丸: `--r-sm 10 / --r-md 16 / --r-lg 26 / --r-pill`
- 影: `--sh-1/2/3`（紙の浮き）・動き: `--spring`（弾む）/`--ease`
- 書体: `--f-head`(Zen Kaku Gothic New 見出し900) / `--f-round`(Zen Maru 丸ゴ) / `--f-mono`(JetBrains Mono ラベル・数字) / `--f-hand`(**Yusei Magic 手書きマーカー**)

## 共通部品・作法（base.css にあり）
- `.wrap` 幅1180 / `.section` 縦リズム / `.reveal (.d1〜.d4)` スクロール登場 / `.rise-char` 一字立ち上げ
- **eyebrow**（セクションの小見出し）＝手書き赤：`<p class="eyebrow"><span class="dot"></span>01 — ラベル</p>`
- `.hand`＝手書きフォント。`.tape`＝マスキングテープ（position:absolute の親に置く）
- ボタン `.btn`（琥珀ピル・下影）/ `.btn.ghost`（下線型）

## 頻出モチーフ（ヒーローの実装からコピペ推奨）
- **判子**：朱の円に白抜き「馬」、`transform: rotate(-8〜-10deg)`、`box-shadow: inset 0 0 0 2.5px rgba(255,255,255,.4)`
- **マーカー下線**：inline SVG `<path>`（stroke=amber、stroke-width 6-9、手描き波）＋ `.draw-line` で描画アニメ
- **手書き注釈**：`.hand` + `--scarlet-d` + 小さな手描き矢印SVG（stroke 2.2、round cap）
- **紙吹雪**：13px前後の色付き小四角を数個、rotate散らし（多用しない・余白に置く）
- **画鋲メモ**：白紙 `#FFFDF6`＋radial画鋲＋rotate 2〜3deg＋`.hand`
- **濃紺カード**（ストリップ型）：bg=ink、白monoラベル、右上に琥珀の→、下辺3pxに分野色
- **白カード**：bg=card、border 2px ink または枠なし＋`--sh-2`、hoverで `translateY(-6〜8px) rotate(-1deg)`＋`--sh-3`

## マスコット「うまくん」素材（public/assets/mascot/）
`run.png`（疾走・ヒーローで使用中）/ `wave.png`（手を振る）/ `cheers.png`（ビール乾杯）/ `handoff.png` `handoff2.png`（箱を手渡す）/ `logo3d.png`（顔アイコン・ナビとカレンダー出勤マークで使用中）。
- 使うときは `filter: drop-shadow(3px 5px 5px rgba(27,42,74,.2))`
- 動きは**一つの要素に一つ**（bob or 触れたら跳ねる程度）。0.5〜0.7s ease-in-out。過剰に増やさない。
- 本人写真（イメージ）＝ `public/assets/photo/hero.jpg`

## 文章のトーン
一人称で元気に・素直に（「〜です！」「〜してます」）。**事実の捏造は絶対禁止**（経歴・受賞・数字を足さない）。既存テキストの意味を変えない。

## 品質チェック（各ページ共通）
- 横スクロールが出ない（scrollWidth ≦ viewport）
- モバイル390pxで崩れない・文字が読める（最低14px相当）
- 見出し階層が明確（eyebrow → h2.big → lead）
- `prefers-reduced-motion` を壊さない（base.cssが面倒を見る。無限アニメを新設するときだけ注意）
- 画像は必ず実在パス（works.ts のもの）。リンク切れを作らない
