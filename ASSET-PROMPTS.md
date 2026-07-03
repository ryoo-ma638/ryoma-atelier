# 素材生成プロンプト（稜馬のアトリエ）

ChatGPT（GPT image）用。**このスタイル文は使い回してタッチのブレを防ぐ。** 文字は入れない（崩れるため）。

配色：生成り `#F7F1E4` / 馬の紺 `#1B2A4A` / 琥珀 `#E8A13A` / 朱 `#E4572E`

---

## ① マスコット「うまくん」（背景透過PNG・案内役）
※本名『稜馬』との被りを避けた案内役キャラ名（親しみ重視。「うまくいく」のダジャレも）。

**共通スタイル文（毎回これを先頭に）**
> 『うまくん』というポニー体型の馬のマスコット。白い体、太い濃紺(#1B2A4A)のきれいな輪郭線、琥珀色(#E8A13A)のふさふさのたてがみと尻尾、丸くて優しい目、小さな鼻、元気で親しみのある表情。フラットな2Dベクター・カートゥーン、均一な太さの線画、影は最小限。背景は完全透過（アルファ）。文字・ロゴは一切入れない。

**ポーズ差分（1回1ポーズが安定）**
- 走る：全速力で右へギャロップ。たてがみと尻尾がなびき、足元に小さな砂ぼこり、スピード線。疾走感。
- 手を振る：後ろ足で立ち、片方の前足を上げて元気に手を振る笑顔。
- ビールを掲げる：後ろ足で立ち、琥珀色のビール（白い泡）の入ったジョッキを両前足で高く掲げて乾杯。実在ブランドのロゴは描かない。
- 手渡す：後ろ足で立ち、無地のクラフト箱を両前足で差し出す「どうぞ」のポーズ。
- 3Dロゴ版：同じ馬の“顔”だけを、つやのある3Dアイコン風（アプリアイコン）に。ぷっくりした立体・やわらかな光沢・正面〜3/4アングル・透過背景。

**English base**
> A cute pony-shaped horse mascot named "Umakun". White body, thick dark-navy (#1B2A4A) clean outline, fluffy amber (#E8A13A) mane and tail, round friendly eyes, small muzzle, cheerful energetic expression. Flat 2D vector cartoon, uniform bold linework, minimal soft shadow. Fully transparent background (alpha). No text, no logos.
> — running: full-gallop to the right, mane and tail flowing, small dust puff, speed lines, dynamic.
> — waving: standing on hind legs, one front hoof raised, waving with a big smile.
> — cheers: standing on hind legs, holding up a mug of amber beer with white foam, no brand logos.
> — handing: standing on hind legs, offering a plain kraft box with both front hooves.
> — 3D logo: just the horse's head as a glossy 3D app-icon, rounded volumes, soft studio lighting, front/3-4 view, transparent background.

**調整ポイント**
- キャラが毎回変わる→ **スタイルフレーム画像をアップして「この馬と“完全に同じ”キャラでポーズ違いを、背景透過で」** と指示。
- 透過にならない→ `transparent background, PNG with alpha, no drop shadow, isolated` を明示。
- 3Dが2Dっぽい→ `glossy 3D render, soft studio lighting, rounded volumes` を強調。

保存先：`public/assets/mascot/`（例 `run.png` `wave.png` `cheers.png` `handoff.png` `logo3d.png`）

---

## ② 本人写真の方向性（※最終的に実写へ差し替え）

**日本語**
> 用途：ポートフォリオのヒーロー用イメージ写真（本人の実写に差し替える前提のプレースホルダ）。
> 20〜21歳くらいの元気で明るい笑顔の日本人男性大学生。野球ドームのビール売り子。背中に樽型のビールサーバーを背負い、片手に琥珀色のビールが入った透明カップを高く掲げ、生き生きと躍動するポーズ。少し見上げる笑顔。
> 背景：屋内ドームのコンコース（やわらかくボケる）。自然な昼光。明るくあたたかい実写風。生成り〜琥珀の暖色トーンで統一。人物はくっきり。
> 除外：文字、実在ブランドのロゴ・商品名（KIRIN等の実ロゴは描かない）、暗い雰囲気、複数人。

**English**
> Portfolio hero image (placeholder to be replaced with a real photo). A cheerful ~20-year-old Japanese male university student working as a beer vendor at a domed baseball stadium. Backpack beer keg, raising a clear cup of amber beer high with one hand, lively dynamic pose, bright smile looking slightly up. Background: indoor dome concourse softly blurred, natural daylight. Warm, bright photographic style, cream-to-amber palette, sharp subject. No text, no real brand logos or product labels, not dark, single person only.

**調整ポイント**
- 実ロゴが出る→ `no brand logos or product labels` を追記（商標配慮）。
- 差し替え前提なので、顔は“正面すぎない/少し横向き”だとサイトに馴染む。

保存先：`public/assets/photo/`（例 `hero.jpg`）

---

## 権利メモ
- GPT image(OpenAI)の生成物は規約上作成者が使用可とされるが、**公開前に最新の商用利用規約を確認**。
- **実在ブランド（KIRIN等）のロゴ・商品は描かせない**（商標配慮）。
- 本人写真は最終的に**実写へ差し替え推奨**（「本人」を名乗る以上、AI人物のままにしない）。
