// =========================================================
// 作品データ（事実ベース・厳選）
// 出典: 各授業フォルダの成果物（ソース/レンダリング動画を確認）＋ x24231_portfolio.pdf。
// ※虚偽厳禁。「授業でやっただけ」の習作は載せず、見せられるものだけを厳選する方針。
// =========================================================

export type Category = "graphic" | "cg" | "video" | "imaging" | "web" | "planning" | "sound";

// 分野＝色（プリズムで分光した1分野＝1色のスペクトル・マップ）。6分野すべて別色にして、
// サムネ・タグ・番号・フィルタで一貫して使う＝「色々な色＝色々な分野に手を出している」を視覚化する。
// 表示順＝本人の専門分野から（Web・アプリ → 画像処理・インタラクション → CG・映像 → 企画・発表 → グラフィック → サウンド）。
// この順が トップFields と Works のセクション順・通し番号(01,02…)に連動する。works/index.astro の order 配列も同じ順に。
export const categoryLabels: Record<Category, { ja: string; en: string; color: string }> = {
  web:      { ja: "Web・アプリ",        en: "Web & App",     color: "var(--c-blue)" },
  imaging:  { ja: "画像処理・インタラクション", en: "Vision & Interaction", color: "var(--c-cyan)" },
  cg:       { ja: "CG・3D",           en: "3D Graphics",   color: "var(--c-red)" },
  video:    { ja: "映像",             en: "Film & Video",  color: "var(--c-yellow)" },
  planning: { ja: "企画・発表",         en: "Planning & Slides", color: "var(--c-green)" },
  graphic:  { ja: "グラフィック・ロゴ", en: "Graphic & Logo", color: "var(--c-violet)" },
  sound:    { ja: "サウンド・音楽",      en: "Sound & Music", color: "var(--c-orange)" },
};

export interface Work {
  slug: string;
  title: string;
  category: Category;
  summary: string;        // 一覧用の短い説明
  goal?: string;          // 狙い
  approach?: string;      // 工夫
  tools?: string[];       // 使用ツール
  duration?: string;      // 制作時間
  thumb?: string;         // サムネイル画像パス
  video?: string;         // ループ再生する軽量mp4（任意）
  gallery?: string[];     // 複数画像（ライトボックスで拡大閲覧。スライド資料・スクショ等）
  audio?: { title: string; src: string; note?: string }[]; // 試聴用の音源（モーダルにプレイヤー表示）
  slideGroups?: { title: string; images: string[] }[];     // 発表/種類ごとに分けた横スクロールのスライド群
  featured?: boolean;     // トップのBentoで大きく見せる
  link?: string;          // 外部/別サイトへのリンク（Web作品など）
  links?: { label: string; href: string }[]; // 掲載メディア等の外部リンク（複数・任意）
  status?: string;        // 進行中・公開予定・出展 などのバッジ（任意）
  contain?: boolean;      // サムネ/ヒーローを切り抜かず全体表示（縦長ポスター・正方形アプリ画面など）
}

export const works: Work[] = [
  // ====================== CG・映像 ======================
  {
    slug: "shibuya-crossing",
    title: "渋谷スクランブル交差点 CG",
    category: "cg",
    summary: "リアルな街並みの再現と光の表現に挑戦した3DCG作品。",
    goal: "実在の風景を題材に、空間スケールと光のリアリティを出す。",
    approach: "建物配置と人流のスケール感、ライティングで都市の空気感を再現。",
    tools: ["C++", "OpenGL / GLUT"],
    thumb: "/assets/works/shibuya-cg.jpg",
    video: "/assets/works/video/shibuya.mp4",
    featured: true,
  },
  {
    slug: "strikeout",
    title: "海賊船ストラックアウト（3Dゲーム）",
    category: "cg",
    summary: "C++とOpenGLで自作した3Dシューティングゲーム。大砲から砲弾を撃ち、海に浮かぶ海賊船を撃ち落とす。スコア・コンボ・制限時間つき。",
    goal: "物理挙動・当たり判定からスコア・コンボ・制限時間まで実装した、“ちゃんと遊べる”ゲームを完成させる。",
    approach: "砲弾の放物運動と船との衝突判定、撃沈数・スコア・コンボ・残り時間のUI、ラウンド制を実装。授業の総合演習として作り込み、講評でも高い評価をもらえた一番の自信作。",
    tools: ["C++", "OpenGL / GLUT"],
    thumb: "/assets/works/strikeout.jpg",
    video: "/assets/works/video/strikeout.mp4",
  },
  // === AITランド：本人指示で「一時的に非表示」（2026-06-25）。再表示する時はこの /* */ を外すだけ。 ===
  /*
  {
    slug: "aitland",
    title: "AITランド（3D遊園地）",
    category: "cg",
    summary: "歩いて見渡せる3Dの遊園地。観覧車・コースター・噴水・キャラクターを配置し、テクスチャで世界観を作り込んだ総合作品。",
    goal: "広い3D空間を破綻なく構成し、テーマパークの“居る感”を出す。",
    approach: "多数のオブジェクトとテクスチャを配置し、視点移動で全体を見渡せるよう設計。授業の集大成として一番作り込んだ作品。",
    tools: ["C++", "OpenGL / GLUT"],
    thumb: "/assets/works/aitland.jpg",
    video: "/assets/works/video/aitland.mp4",
  },
  */
  {
    slug: "robot-argus",
    title: "オリジナル3DCGロボット",
    category: "cg",
    summary: "Mayaでモデリングからアニメーションまで手がけた、オリジナルのヒーロー型ロボット。ジャンプ・キックのアクションを付け、After Effectsで青空を舞う空中シーンに仕上げた。",
    goal: "一体のキャラクターを、デザインからモデリング・動きまで一貫して作り上げる。",
    approach: "頭部センサー・背面装甲・脚部機構などのディテールを設計し、Mayaでモデリング〜リギング〜アニメーション。仕様や設定資料まで作り込んだうえで、After Effectsで青空を背景にした空中アクションのカットに仕上げた。",
    tools: ["Maya", "After Effects"],
    thumb: "/assets/works/robot-argus.jpg",
    video: "/assets/works/video/robot-argus.mp4",
    gallery: ["/assets/works/robot-slide-1.jpg", "/assets/works/robot-slide-2.jpg"],
    featured: true,
  },
  {
    slug: "jojo-scene",
    title: "『ジョジョ』カーズ ― 3Dシーン再現",
    category: "cg",
    summary: "『ジョジョの奇妙な冒険』第2部ラスト、宇宙へ飛ばされ“考えるのをやめた”カーズの場面を3Dで再現したオマージュ作品。",
    goal: "原作の象徴的な“静寂”の場面を、宇宙空間のスケールで表現する。",
    approach: "惑星や太陽を配した宇宙空間に究極生命体カーズを置き、永遠に閉じ込められた孤独と静けさが伝わるよう構図とライティングを調整した。",
    tools: ["C++", "OpenGL / GLUT"],
    thumb: "/assets/works/jojo-kars.jpg",
    video: "/assets/works/video/jojo-kars.mp4",
  },
  {
    slug: "live-stage",
    title: "ライブ会場の紙吹雪演出",
    category: "cg",
    summary: "3Dのライブ会場に無数の紙吹雪が舞う瞬間を演出。ステージと花道を見下ろす構図で、クライマックスの華やかさを表現。",
    goal: "物体移動アニメーションを使って、ライブのクライマックスの高揚感を作り出す。",
    approach: "大量の紙吹雪に一つずつ速度と回転を与えて舞い落とし、色とりどりに散らす。ステージ・花道・客席を配置し、上空からの構図でスケール感を出した。",
    tools: ["C++", "OpenGL / GLUT"],
    thumb: "/assets/works/ls-render-1.jpg",
    video: "/assets/works/video/livestage.mp4",
    slideGroups: [
      { title: "完成レンダリング（こんな感じです）", images: ["/assets/works/ls-render-1.jpg", "/assets/works/ls-render-2.jpg", "/assets/works/ls-render-3.jpg"] },
    ],
  },
  {
    slug: "mushiba-animals",
    title: "虫歯アニマルズ！",
    category: "planning",
    summary: "システム工学研究会の仲間と取り組んだ学生チャレンジプロジェクト（1年次）。飼育員になって、虫歯で痛がる動物の歯を“巨大ブラシ”で磨く体感型ゲーム。東京ゲームショウ2024（ゲームアカデミーコーナー）・ゲームマーケット2024秋に出展し、日経クロストレンドにも掲載された。",
    goal: "「動物園で見たカバの歯磨き実演をゲームにしたい」が出発点。ルールは言葉で説明しなくても、ブラシで歯を磨く姿を見れば伝わる——来場者、特に子どもや海外のお客さんが直感的に楽しめる体験を、チームでめざした。",
    approach: "動物の顔は、巨大なウレタンフォーム（発泡スチロールに似た素材）を何度もカットして約8層に重ね、削り出して塗装——軽くて丈夫、そして子どもが思わず近づきたくなる可愛らしさにこだわって造形した。特製の歯はレジン製で、内部に圧力センサーとLEDを仕込み、虫歯の歯が赤く光る→巨大ブラシでこすると白い歯に戻る連動を Unity＋Arduino で実現。自分は1年生としてチームに参加し、主にこの「デザインと見せ方」——キャラクターの造形やブースの装飾——を、先輩の力を借りながら精一杯やり切った。チーム一丸で作り上げた一台は、日経クロストレンド／ゲームメーカーズに“注目の学生作”として紹介され、海外来場者の関心も集めた。TGS後は make.ctrl.Japan 11（ゲームマーケット内・幕張メッセ）など複数のイベントにも出展した。",
    tools: ["Blender", "造形・デザイン"],
    links: [
      { label: "ゲームメーカーズ", href: "https://gamemakers.jp/article/2024_09_29_80746/" },
      { label: "日経クロストレンド", href: "https://xtrend.nikkei.com/atcl/contents/18/01045/00122/" },
    ],
    status: "学生チャレンジプロジェクト",
    thumb: "/assets/works/mushiba.jpg",
    gallery: ["/assets/works/mushiba-tgs.jpg", "/assets/works/mushiba-team-3.jpg", "/assets/works/mushiba-2.jpg", "/assets/works/mushiba-poster.jpg"],
    featured: true,
  },
  {
    slug: "mm2-cinematography",
    title: "映像制作 ― 構図とアクション繋ぎ",
    category: "video",
    summary: "同じ被写体を「接写」と「望遠」で同じ大きさに見せ分け、複数カットをアクション繋ぎで1シーンにまとめた撮影・編集作品。",
    goal: "カメラワークと編集だけで、被写体の見え方と動きの流れをコントロールする。",
    approach: "三分割法・水平・アングルを意識して構図を設計。寄り（接写）と引き（望遠）で距離感を作り分け、動き出すタイミングでカットを切り替えるアクション繋ぎで一連の所作を一つのシーンに編集した。",
    tools: ["撮影", "Premiere Pro"],
    thumb: "/assets/works/mm2-cinematography.jpg",
    video: "/assets/works/video/mm2-cinematography.mp4",
  },
  {
    slug: "manga-jitsuei",
    title: "漫画「ひゃくえむ。」再現映像 ― 全力疾走のワンシーン",
    category: "video",
    summary: "魚豊の漫画「ひゃくえむ。」（100m走に人生を懸ける物語）の走るシーンを実写で再現した映像。スタート前の緊張から全力疾走、こみ上げる感情までを構図とカット割りで再構成した。",
    goal: "静止画である漫画の「疾走感」と「熱量」を、実写の映像演出に翻訳する。",
    approach: "原作の象徴的な走りの場面をモチーフに、時計の寄りで緊張を、低いアングルの追走ショットでスピード感を、人物の表情のカットで感情のピークを表現。シネマティックな比率（レターボックス）でまとめ、撮影から編集までを担当した。",
    tools: ["撮影", "Premiere Pro"],
    thumb: "/assets/works/hyakuemu.jpg",
    video: "/assets/works/video/hyakuemu.mp4",
  },

  // ====================== グラフィック・ロゴ ======================
  {
    slug: "color-poster",
    title: "「光と色」ポスターシリーズ（加法・減法混色）",
    category: "graphic",
    summary: "RGBの光を重ねる加法混色、CMYのインクを重ねる減法混色を、理科の実験器具になぞらえて図解したポスター。可視光線の波長図とあわせた「光と色」のシリーズ。",
    goal: "色が生まれるしくみ（光の混色とインクの混色）を、ひと目で直感的に伝える。",
    approach: "加法混色はフラスコの中でRGBの光が白へ近づくイメージ、減法混色は試験管にCMYのインクが落ちて暗くなるイメージで対比。実験器具のモチーフと配色で、理屈を視覚的に体感できるよう構成した。",
    tools: ["Illustrator"],
    duration: "各2〜5時間",
    thumb: "/assets/works/color-additive.jpg",
    contain: true,
    gallery: ["/assets/works/color-additive.jpg", "/assets/works/color-subtractive.jpg", "/assets/works/visible-light-poster.png"],
  },
  {
    slug: "business-card",
    title: "名刺デザイン（両面・印刷入稿）",
    category: "graphic",
    summary: "「つくる人 × ビール売り子」――自分の二面性をそのまま両面に込めた名刺。おもて＝Creator、うら＝ビール売り子。低ポリのワイヤーフレーム（馬＝稜馬／ビールジョッキ）で世界観を統一した。",
    goal: "肩書きで固めず、“制作も売り子もやる”自分らしさが一目で伝わる名刺にする。配色（ネイビー×アンバー×生成り）とロゴで全体をまとめた。",
    approach: "ロゴ（馬・ジョッキ）の下絵生成にAIを使い、その仕上げ（背景・グローの除去／色寄せ／透過）から、配色・両面の組版・印刷入稿までを自作。レイアウトはHTML/CSSで組み、Python（Pillow・qrcode）でQR生成・ロゴ加工・入稿PDF化まで自動化した“コードで作る名刺”。91×55mm・塗り足し3mmで入稿できる状態。",
    tools: ["HTML / CSS", "Python（Pillow・qrcode）"],
    thumb: "/assets/works/business-card.jpg",
  },
  {
    slug: "character-design",
    title: "学科マスコット キャラクターデザイン",
    category: "graphic",
    summary: "メディア情報専攻のマスコット「メディーちゃん」「コンちゃん」を設計。",
    goal: "学科の役割（情報サポート／分析・プログラミング）をキャラに落とし込む。",
    approach: "各パーツに「情報処理」「トラブル対処」「発信力」を象徴するモチーフを配置。ノートPC＝冷静に頼れる情報端末、集中したまなざし＝デバッグ中、Wi-Fiマーク入りパーカー＝発信力、といった意味づけを一つずつ設計した。",
    tools: ["Illustrator"],
    duration: "約12時間",
    thumb: "/assets/works/character-poster.jpg",
    contain: true,
    gallery: ["/assets/works/character-poster.jpg", "/assets/works/character-parts.jpg"],
  },
  // ====================== 画像処理・インタラクション（研究室＝CG・画像処理・インタラクションに直結） ======================
  {
    slug: "death-comer",
    title: "鎌ゲーム ― LiDAR×鎌で戦う全身アクション",
    category: "imaging",
    status: "研究室で継続開発中",
    summary: "LiDARで自分の足を追跡し、M5Stickを付けた「鎌」を実際に振って戦う、全身で遊ぶ設置型のアクションゲーム。歩く・振る・止まる――体の動きそのものが操作になる。",
    goal: "ボタンではなく“体の動き”で遊ぶ爽快感をつくる。足元の床を戦場にして、敵も攻撃も自分の位置もそこに映し、動き回ること自体を楽しさにする。",
    approach: "床のLiDARで足の位置を、鎌に付けたM5StickC Plus2（6軸センサー）で振りを検知。歩く＝移動＋向き、縦振り＝強攻撃、横振り＝薙ぎ払い、立ち止まる＝防御（前方の弾を跳ね返し、反射でも攻撃できる）。WAVE制（練習→反射→ボス戦）＋「スコア×残りHP」のランク評価で、攻めと守りの両立を促す。床＝戦場／壁＝情報の2画面構成。企画・ハード・C++/OpenGL描画まで個人制作。デジコン演習(2025)で発表したのち、“動かなかった原因はハードではなくコードの調整だった”と精読で突き止め、水野慎士研究室の個人プロジェクトとして再設計・継続開発中（向きの一本化・防御のノイズ対策・デバッグ表示などを実装済み。今後はLiDAR点群からの姿勢推定など研究へ発展）。",
    tools: ["C++ / OpenGL / GLUT", "M5StickC Plus2", "LiDAR"],
    thumb: "/assets/works/death-comer.jpg",
    video: "/assets/works/video/death-comer.mp4",
    gallery: ["/assets/works/deathcomer-title.jpg", "/assets/works/deathcomer-boss.jpg", "/assets/works/deathcomer-rule.jpg", "/assets/works/deathcomer-scythe.jpg"],
    featured: true,
  },
  {
    slug: "wis-umbrella",
    title: "雨に向く傘 — WISS2026 応募準備中の研究",
    category: "imaging",
    status: "研究中",
    summary: "カメラで雨の向きを読み取り、雨の来る方へ自動で傾くスマート傘の研究。手がふさがる電動車椅子の利用者のために。",
    goal: "「自分で傘を傾けられない人」が、濡れずに移動できるように。風から雨を“推測”する従来手法ではなく、カメラで雨そのものを見て、来る方向へ傘を向けることをめざす。",
    approach: "傘のシャフトに前向き・横向きのカメラを付け、雨筋の傾きから雨の向きを直接推定（Python / OpenCV。合成雨を用いた予備実験で、向きの推定が機能することを確認）。2軸サーボで傘を向け、IMUで車椅子の傾き・旋回を毎秒10〜30回補正する設計。水野慎士研究室での個人研究として、WISS2026（インタラクティブシステムとソフトウェアのワークショップ）への応募を準備している段階。",
    tools: ["Python / OpenCV", "Raspberry Pi", "カメラ・サーボ・IMU"],
    thumb: "/assets/works/wis-scene.jpg",
    slideGroups: [
      { title: "コンセプト — 雨の来る方へ、傘が自動で向く", images: ["/assets/works/wis-scene.jpg", "/assets/works/wis-mechanism.jpg", "/assets/works/wis-concept.jpg"] },
    ],
  },
  {
    slug: "fukuoka-award",
    title: "福岡市科学館 CREATIVE AWARD 2026（応募構想）",
    category: "imaging",
    status: "構想中",
    summary: "福岡市科学館の展示アイデア公募『CREATIVE AWARD 2026』（テーマ：生きもののコミュニケーション）への応募を準備している、研究室での個人企画。",
    goal: "科学を“体で感じて学べる”体験を考える。（応募準備中のため、具体的なアイデアの公開は控えています）",
  },
  {
    slug: "shuwa-game",
    title: "手話認識ゲーム",
    category: "imaging",
    summary: "カメラに映した手話を認識して採点するゲームを実装。手と顔のランドマーク検出で、五十音や「ありがとう」「さようなら」などの手話をリアルタイムに判定する。",
    goal: "手の形・動きをコンピュータに認識させ、楽しく学べる“次世代の手話アプリ”をつくる。",
    approach: "MediaPipe の Hands / Face Mesh で指・顔の特徴点を取得し、各手話のポーズを判定するロジックを実装。初級（単音）・中級（フレーズ）・上級（ヒントなし）の難易度、ライブカメラへのランドマーク描画、制限時間とスコア、学習モード・手話辞典・成績確認（苦手な手話の集計）まで作り込んだ。実装とプレゼン資料を主に担当。",
    tools: ["Python", "MediaPipe", "OpenCV", "FreeSimpleGUI"],
    thumb: "/assets/works/shuwa-home.jpg",
    contain: true,
    slideGroups: [
      { title: "アプリの画面", images: ["/assets/works/shuwa-play.jpg", "/assets/works/shuwa-app-2.jpg", "/assets/works/shuwa-app-1.jpg", "/assets/works/shuwa-app-3.jpg", "/assets/works/shuwa-app-4.jpg", "/assets/works/shuwa-result.jpg"] },
      { title: "開発レポート（発表スライド）", images: ["/assets/works/shuwa-rep-1.jpg", "/assets/works/shuwa-rep-2.jpg", "/assets/works/shuwa-rep-3.jpg", "/assets/works/shuwa-rep-4.jpg", "/assets/works/shuwa-rep-5.jpg"] },
    ],
  },

  // ====================== Web・アプリ ======================
  {
    slug: "chuo-seisakusho",
    title: "中央製作所 採用サイト リデザイン",
    category: "web",
    summary: "学生・若手求職者に向けた企業採用サイトのリデザイン。サークル CEED のWEB班でのクライアント案件。",
    goal: "応募者が必要な情報にたどり着き、企業の魅力が伝わる導線にして応募数を増やす。",
    approach: "技術紹介ページの設計を担当。Figmaでレイアウトを組み、写真と文章の構成・撮影イメージをディレクション。電気／機械／化学の専門性を直感的に見せる構成にした。",
    tools: ["Figma", "Webデザイン"],
    thumb: "/assets/works/chuo-seisakusho.jpg",
    status: "進行中",
    featured: true,
  },
  {
    slug: "drone-note",
    title: "ドローン点検・飛行日誌アプリ",
    category: "web",
    summary: "ドローン点検事業を行う企業からの受託制作。無人航空機の飛行記録・日常点検・点検整備をスマホひとつで記録し、飛行日誌をPDF/CSVで出力できる業務用アプリ。PC・スマホ両対応。",
    goal: "現場の点検と飛行記録を“その場でスマホ完結”にし、法定の飛行日誌づくりの手間をなくす。",
    approach: "飛行記録／日常点検／点検整備の登録・編集、機体管理・操縦者管理（総飛行時間・回数を自動集計）、飛行予定の通知、離陸地点の住所自動入力と日の出・日の入り表示を実装。オフライン保存とクラウド同期を両立し、飛行日誌様式のPDF一括出力・記録のCSV出力にも対応。React Native(Expo)＋Firebase で、1つのコードからPC・スマホ両対応のアプリとして納品した。",
    tools: ["React Native / Expo", "Firebase", "TypeScript"],
    thumb: "/assets/works/drone-home.jpg",
    status: "受託制作",
    slideGroups: [
      { title: "アプリ画面（PC）", images: ["/assets/works/drone-home.jpg", "/assets/works/drone-records.jpg", "/assets/works/drone-form.jpg", "/assets/works/drone-operators.jpg"] },
      { title: "アプリ画面（スマホ）", images: ["/assets/works/drone-m-home.jpg", "/assets/works/drone-m-drawer.jpg"] },
    ],
    featured: true,
  },
  {
    slug: "yumiki-world",
    title: "推しサイト「YUMIKI WORLD」",
    category: "web",
    summary: "乃木坂46・弓木奈於さんの魅力を“推し活ノート”の世界観で詰め込んだ、全6ページの非公式ファンサイト。デザインから実装まで一人で（Astro）。",
    goal: "「好き」という気持ちを、そのままWebの体験に。弓木さんの魅力が、初めて知る人にも自然と伝わるサイトをめざした。（非公式ファンサイトとして、著作権・肖像権に配慮して制作）",
    approach: "ポートフォリオ本体とは世界観を切り替え、クリーム色×パステルの“可愛い別世界”を全面設計。チェキ・マスキングテープ・付箋・方眼ノートを共通部品化し、全ページで一貫した「推し活ノート」の手触りに。線で結ぶ人物相関図、チケット半券風のライブ年表、名場面コラージュ、写真のライトボックス、誕生日カウントダウン、隠しハート集めなど「めくって楽しい」仕掛けを実装。情報は読みやすく整理しつつ、推し活ならではの高揚感を表現した。",
    slideGroups: [
      { title: "トップ — 「推し活ノート」を開く入口。流れる見出し・誕生日カウントダウン・チェキ風インデックス", images: ["/assets/works/yumiki/top.jpg", "/assets/works/yumiki/nav.jpg"] },
      { title: "つながり — 線で結ぶ人物相関図。関係を色分けし、タップでエピソードが開く", images: ["/assets/works/yumiki/relations.jpg"] },
      { title: "思い出 — チケット半券風のライブ年表と、手書き風の現場レポ", images: ["/assets/works/yumiki/memory.jpg"] },
      { title: "魅力 — 名場面を絵文字シールのコラージュで。公式動画にもリンク", images: ["/assets/works/yumiki/charm.jpg"] },
      { title: "ことば — 本人の発言を、付箋・吹き出し・便箋で読ませる", images: ["/assets/works/yumiki/words.jpg"] },
      { title: "プロフィール — レコード棚のディスコグラフィーと1st写真集", images: ["/assets/works/yumiki/discography.jpg", "/assets/works/yumiki/photobook.jpg"] },
    ],
    tools: ["Astro", "HTML", "CSS", "JavaScript"],
    thumb: "/assets/works/yumiki.jpg",
    featured: true,
    link: "/yumiki/",
  },
  {
    slug: "meegri",
    title: "ミーグリ練習シミュレーター「meegri」",
    category: "web",
    status: "公開中・開発中",
    summary: "アイドルの「ミーグリ」を本番そっくりに練習できるWebアプリ。緊張も通信ラグも推しの反応も再現し、AIとの会話で“場数”を踏める。企画から実装まで一人で。",
    goal: "本番のミーグリは一瞬で緊張して、頭が真っ白になりがち。だからこそ、事前に“場数”を踏める場をつくりたかった。初めての人でも安心して練習でき、何を話すか・どう振る舞うかを体で覚えられる体験をめざした。（登場キャラは実在の人物・団体とは無関係の架空オリジナル）",
    approach: "フロントは単一HTML・ビルド不要の軽量構成。背景はWebGL/GLSLシェーダー、アイドルはインラインSVGの立ち絵（まばたき・口パク・呼吸）で表現。会話は2段構え＝内蔵の「台本＋ルール」エンジンを基本に、Gemini による本物のAI会話・AI講評を上乗せし、失敗時は自動で台本へフォールバック。APIキーはサーバーレス関数側だけに置き、フロントには一切出さない設計。機嫌システム・会話メモリ・エンディング図鑑（全23種）・本番リハーサル・端末内で完結するカメラ（録画/送信なし）まで実装。UI/UXはApple HIG・Material 3・8ptグリッド等を参考に、デザイントークンで整理した。",
    slideGroups: [
      { title: "ホーム — 相手・チケット・難易度をスキャンしやすい3カードUI（デザイントークンで体系化）", images: ["/assets/works/meegri/home.jpg"] },
      { title: "本番（通話） — 推しの立ち絵×WebGL背景と、Geminiによる自然なAI会話。持ち時間・通信ラグ・機嫌までリアルに", images: ["/assets/works/meegri/call.jpg"] },
      { title: "結果・AI講評 — 会話全体をAIが採点（スコア／ランク／良かった点／助言）", images: ["/assets/works/meegri/result.jpg"] },
      { title: "エンディング図鑑 — 全23種（通常/特殊/シークレット）＋コンプ率で“もう一回”を誘う", images: ["/assets/works/meegri/zukan.jpg"] },
    ],
    tools: ["JavaScript", "WebGL / GLSL", "Node.js", "Gemini API"],
    thumb: "/assets/works/meegri.jpg",
    link: "https://meegri.vercel.app/",
    featured: true,
  },
  {
    slug: "ceed-site",
    title: "CEED 公式サイト",
    category: "web",
    summary: "所属サークル CEED（愛知工業大学マルチクリエイティブサークル）の公式サイト。WEB班として構築を進行中。",
    tools: ["Webデザイン"],
    status: "公開予定",
  },
  {
    slug: "toka-club",
    title: "藤華クラブ 公式サイト",
    category: "web",
    summary: "中学軟式野球チームの公式サイト。Astro で制作中のクライアント案件。",
    tools: ["Astro"],
    status: "制作中",
  },
  {
    slug: "settlo",
    title: "Settlo（割り勘アプリ）",
    category: "web",
    summary: "システム工学研究会主催のハッカソン『シスハック』でチーム開発し、学生団体経由で企業賞を受賞した割り勘アプリ。「友達との楽しい時間のあとの“精算”を、スマートに」がコンセプト。支払いを記録して精算でき、現在も開発を継続中。",
    goal: "支払いの記録と精算を、誰でも迷わず使えるシンプルなUIで実現する。",
    approach: "5人チームでのハッカソン開発。自分はUI・フロントエンドを中心に、レシート読み込みなどのバックエンドや、発表の構成・登壇も担当した。スマホのスワイプUIとPCレスポンシブの両対応をめざしている。",
    tools: ["Vue 3", "Firebase"],
    thumb: "/assets/works/settlo.jpg",
    status: "ハッカソン企業賞・開発中",
  },
  {
    slug: "nogi-photo",
    title: "NogiPhotoManager（iOSアプリ）",
    category: "web",
    summary: "生写真コレクションを管理するiOSアプリ。Swift で制作中。",
    tools: ["Swift", "iOS"],
    status: "制作中",
  },
  {
    slug: "uriko-site",
    title: "売り子 応援サイト",
    category: "web",
    summary: "バンテリンドームのビール売り子活動を広めるために作った個人サイト。『「応援したくなる」を、めざして。』をテーマに、明るくポップにまとめた一枚。",
    goal: "ビールの売り子という活動をより多くの人に知ってもらい、球場での時間をもっと楽しんでもらうこと。Webでの発信を通じて、活動のイメージアップにつなげる。",
    approach: "初めて訪れた人にも雰囲気が伝わるよう、親しみやすくポップな世界観で統一。活動紹介・おしながき・うりこ日記・キャッシュレス決済の案内などを、見やすく一枚に構成した。HTML / CSS / JavaScript でデザインから実装まで対応。",
    slideGroups: [
      { title: "トップ — 『「応援したくなる」を、めざして。』", images: ["/assets/works/uriko/top.jpg"] },
      { title: "ABOUT — 1年目・ピンクのユニフォームの自己紹介", images: ["/assets/works/uriko/about.jpg"] },
      { title: "MY STORY — 状況→行動→結果で見せる、はじめかた", images: ["/assets/works/uriko/story.jpg"] },
      { title: "おしながき — メニューとキャッシュレス決済の案内", images: ["/assets/works/uriko/menu.jpg"] },
      { title: "うりこ日記 — 球場・道具・オフの日のこと", images: ["/assets/works/uriko/note.jpg"] },
    ],
    tools: ["HTML", "CSS", "JavaScript"],
    thumb: "/assets/works/uriko.jpg",
    link: "https://uriko-v-dome-ryoma.vercel.app",
  },

  // ====================== 企画・発表（スライド制作・プレゼン・企画） ======================
  {
    slug: "presentation-slides",
    title: "プレゼン・スライド制作",
    category: "planning",
    summary: "登壇・発表のために一から設計したスライド。『CEED新入生説明会』『中央製作所WEBリデザイン進捗報告』『Amazon Prime CM構成分析WS』など、情報の優先順位と“伝わる見せ方”を設計した。",
    goal: "「何を・どの順で・どう見せるか」を設計し、内容の価値が一番に伝わる発表にする。",
    approach: "新入生説明会は活動の魅力が伝わる構成を一から設計。中央製作所の進捗報告はリデザイン案を分かりやすく可視化。ワークショップはAmazon PrimeのCM構成を図解で解体した。いずれも配色・余白・図解を整理し、視認性と説得力の両立を狙った。",
    tools: ["Keynote", "PowerPoint", "デザイン"],
    thumb: "/assets/slides/slide-chuo-1.jpg",
    slideGroups: [
      { title: "CEED 新入生説明会（2026年度）", images: [1, 2, 3, 4].map((n) => `/assets/slides/slide-ceed-${n}.jpg`) },
      { title: "中央製作所 採用サイト リデザイン進捗報告", images: [1, 2, 3, 4, 5].map((n) => `/assets/slides/slide-chuo-${n}.jpg`) },
      { title: "Amazon Prime CM構成分析ワークショップ", images: [1, 2, 3, 4, 5].map((n) => `/assets/slides/slide-ws-${n}.jpg`) },
    ],
  },
  {
    slug: "todofuken-battle",
    title: "都道府県バトル（教育カードゲーム）",
    category: "planning",
    summary: "日本の都道府県を題材にした2人対戦型の教育カードゲーム（チーム名「ビタミンB」4人で制作）。各県の経済力・面積・観光力を実在データから★に変換し、特殊能力で駆け引きする。カード・説明書・ケースまで印刷し、製品として完成させた。",
    goal: "遊びながら地理・経済・観光を学べて、しかも運任せでなく“戦略”で勝てるゲームにする。",
    approach: "全7ラウンド制で、毎ラウンド G（経済力）・M（面積）・K（観光力）のどれで勝負するかを“前ラウンドの敗者”が選べる読み合いが核。16県それぞれに「愛知＝ものづくり一筋」「京都＝古都の風格」など土地にちなんだ特殊能力を設定した。初期版は運要素が強く能力も複雑だったため、1カード1能力への統一・カードを10→16枚へ拡張・テストプレイ反復でバランスを再構築。僕は発表資料／プレゼン構成と各県の特殊能力の設計＋データ処理を担当（カードのグラフィックは他メンバー）。",
    tools: ["プレゼン設計", "ゲーム企画", "Python"],
    status: "実物カード制作",
    thumb: "/assets/works/card-real.jpg",
    slideGroups: [
      { title: "どんなゲーム？（発表スライド）", images: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/works/card-slide-${n}.jpg`) },
      { title: "カードのデザイン（表・裏・全16枚・能力一覧）", images: ["/assets/works/card-kagawa.jpg", "/assets/works/card-back.jpg", "/assets/works/card-all.jpg", "/assets/works/card-abilities.jpg"] },
      { title: "説明書（ルールブック）", images: ["/assets/works/card-manual-1.jpg", "/assets/works/card-manual-2.jpg"] },
      { title: "カードケースのデザイン", images: ["/assets/works/card-case-front.jpg", "/assets/works/card-case-back.jpg"] },
    ],
  },

  // ====================== サウンド・音楽（DTM／アレンジ） ======================
  {
    slug: "sound-arrange",
    title: "楽曲アレンジ（DTM・GarageBand）",
    category: "sound",
    summary: "好きなアイドル楽曲を GarageBand で耳コピ・アレンジしたDTM作品。ピアノ・ストリングス・サックス・ギター・ドラムを重ね、原曲の雰囲気を残しつつ自分なりの編曲に仕上げた。（原曲の著作権は各権利者に帰属／学習目的の非商用アレンジ）",
    goal: "原曲を聴き取って各パートを打ち込み直し、“伝わる”アレンジに再構成する。",
    approach: "コード進行とメロディを耳コピし、ピアノロールで各楽器を打ち込み。テンポ・音色・ミックスを調整して、原曲の良さを保ちながら自分の解釈を加えた。",
    tools: ["GarageBand", "DTM・打ち込み"],
    thumb: "/assets/works/sound-garageband.jpg",
    gallery: ["/assets/works/sound-garageband.jpg"],
    audio: [
      { title: "君にDitto", src: "/assets/audio/arrange-kimi-ni-ditto.mp3", note: "乃木坂46 楽曲のアレンジ" },
      { title: "条件反射で泣けてくる", src: "/assets/audio/arrange-jokenhansha.mp3", note: "櫻坂46 楽曲のアレンジ" },
    ],
    status: "アレンジ音源",
  },
];

// トップBento（Featured）の並び順を明示制御。featured な作品を、この順で大きく見せる。
// 1番目＝大カード、2番目＝準大カード（強調枠）。
const featuredOrder = ["shibuya-crossing", "death-comer", "robot-argus", "meegri", "yumiki-world", "chuo-seisakusho", "drone-note", "mushiba-animals"];
export const featuredWorks = works
  .filter((w) => w.featured)
  .sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));
