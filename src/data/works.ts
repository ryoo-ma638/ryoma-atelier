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
  video2?: string;        // 2本目の動画（個別ページ下部に追加表示。任意）
  stageVideos?: { label: string; src: string }[]; // ステージ別の短い動画（3カラム表示。任意）
  gallery?: string[];     // 複数画像（ライトボックスで拡大閲覧。スライド資料・スクショ等）
  audio?: { title: string; src: string; note?: string }[]; // 試聴用の音源（モーダルにプレイヤー表示）
  slideGroups?: { title: string; images: string[]; portrait?: boolean }[];  // 発表/種類ごとに分けた横スクロールのスライド群（portrait:true＝スマホの縦長スクショ用の縦枠）
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
    summary: "巨大ブラシで動物の歯を磨く体感型ゲーム。1年次に先輩たちと制作。東京ゲームショウ2024・ゲームマーケット2024秋に出展。システム工学研究会での活動。",
    goal: "動物園のカバの歯磨き実演が出発点。ルールは言葉で説明しない。磨く姿を見れば伝わる遊びにして、子どもや海外の来場者にも届く形をめざした。",
    approach: "1年生としてチームに参加し、キャラクターの造形とブース装飾を先輩の力を借りながら担当した。動物の顔は巨大なウレタンフォームを約8層に重ねて削り出し、軽くて丈夫で、子どもが思わず近づきたくなる形をねらった。歯はレジン製で、内部に圧力センサーとLEDを仕込み、虫歯が赤く光る→こすると白い歯に戻る連動をUnityとArduinoで実現。日経クロストレンドやゲームメーカーズに注目の学生作として紹介され、海外来場者の関心も集めた。出展後は make.ctrl.Japan 11 など複数のイベントにも出した。",
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
    slug: "deathcamer",
    title: "デスカマー ― LiDAR×鎌で戦う全身アクション",
    category: "imaging",
    status: "研究室で継続開発中",
    summary: "床のセンサーで足の位置を追い、鎌を実際に振って戦う設置型ゲーム。歩く・振る・立ち止まる。その動きがそのまま操作になる。",
    goal: "ボタンではなく体の動きで遊ぶ爽快感をつくる。足元の床を戦場に見立て、動き回ること自体を楽しさにする。",
    approach: "企画・ハードから描画まで個人制作。床のセンサーで足の位置を、鎌側の6軸センサーで振りを検知する。操作は体の動作に直結させ、歩く＝移動と向き、縦振り＝射程の長い強攻撃、横振り＝範囲攻撃、立ち止まる＝防御。防御は前方の弾を反射して攻撃にもなるので、足を止める行為が守りだけで終わらない。床に足元の読み取り、壁に戦闘画面を出す2画面構成をめざした。デジコン演習(2025)で発表したあと動かない原因を追い、ハードではなくコードの競合だと精読で突き止め、向き制御の二重化と防御判定の競合を直した。水野慎士研究室の個人プロジェクトとして再設計し、センサーが無くてもキーボードで通しプレイできる状態まで整備。その後は踏むと出るヘルプ、日本語のHUD、クリア時のランク評価を足してGitHubで公開した。",
    tools: ["C++11 / OpenGL / GLUT", "M5StickC", "LiDAR"],
    thumb: "/assets/works/death-comer.jpg",
    video: "/assets/works/video/death-comer.mp4",
    video2: "/assets/works/video/deathcomer-play.mp4",
    stageVideos: [
      { label: "WAVE 1 ― 駆けて斬る", src: "/assets/works/video/deathcomer-stage-wave1.mp4" },
      { label: "WAVE 2 ― ガードで反射", src: "/assets/works/video/deathcomer-stage-wave2.mp4" },
      { label: "WAVE 3 ― ボス討伐戦", src: "/assets/works/video/deathcomer-stage-boss.mp4" },
    ],
    gallery: ["/assets/works/deathcomer-title.jpg", "/assets/works/deathcomer-rule.jpg", "/assets/works/deathcomer-wave1.jpg", "/assets/works/deathcomer-wave1help.jpg", "/assets/works/deathcomer-wave2.jpg", "/assets/works/deathcomer-wave2help.jpg", "/assets/works/deathcomer-boss.jpg", "/assets/works/deathcomer-bossguide.jpg", "/assets/works/deathcomer-rank-s.jpg", "/assets/works/deathcomer-scythe.jpg"],
    links: [{ label: "GitHub（ソース）", href: "https://github.com/ryoo-ma638/deathkama_rider_game" }],
    featured: true,
  },
  // === カマカマクエスト：本人指示で「一時的に非表示」（2026-09-14／展示に至らなかったため）。再表示する時はこの /* */ を外すだけ。 ===
  /*
  {
    slug: "kamakama-quest",
    title: "カマカマクエスト ― 鎌ゲームの子ども版",
    category: "imaging",
    status: "イベント展示に向けて制作中",
    summary: "「デスカマー」を、小さな子どもでも安心して遊べるように作り直した版。かわいいスライムやおばけの世界を、草原→おかしの国→おばけの城の3ステージで冒険する。文字はすべてひらがな・カタカナ、鎌を振って敵をやっつける体感アクション。",
    goal: "怖さや難しさのハードルをなくして、小さな子でも“鎌を振って敵をやっつける”爽快感を楽しめるようにする。イベント展示では体験は任意・短時間・安全第一を徹底する。",
    // 展示先候補（非表示）: 「子ども大学にっしん」（子ども向けの大学体験イベント）。実現したら本文に戻す。
    approach: "ゲームエンジンや操作はデスカマーと共通のまま、世界観をまるごと子ども向けに置き換え。たてにふる＝つよいこうげき／よこにふる＝まわりをこうげき／とまる＝てきのこうげきをはねかえす／あるく＝すきにうごく、と遊び方はそのままに、敵をかわいいスライム・おばけへ、アイテムを“いちごジュース（げんきかいふく）”“ほしのクリスタル（パワーアップ）”へ、UI・演出の文字をすべてひらがな・カタカナへ差し替えた。ステージ1＝じかんないにたくさんたおそう、ステージ2＝たまをはねかえして4たいたおそう、ステージ3＝おばけキングをたおせ、の3段構成で、ボスの“おばけキング”はとまってシールドではねかえすとダメージが入る。難易度もやさしく再調整。直近では、エフェクト・ボスの演出・壁面のUI・ルール説明画面を作り直し、画面の文字も生成した画像に差し替えて見た目を一新した。鎌は実際に振り回すため、コントローラ（M5StickC）との通信は、有線（USBシリアル）とBluetoothを試したうえで、ペアリング不要で安定する WiFi（M5自身を親機にしてUDPで送信）に切り替えている。ゲーム本体はクリアまで動作し、M5StickやLiDARが無くてもキーボードで体験できる。子ども向けイベントでの展示を目標に、開発を続けている。",
    tools: ["C++11 / OpenGL / GLUT", "M5StickC", "LiDAR"],
    thumb: "/assets/works/kamakama-title.jpg",
    contain: true,
    slideGroups: [
      { title: "3つのステージ（草原→おかしの国→おばけの城）", images: ["/assets/works/kamakama-stage1.jpg", "/assets/works/kamakama-play.jpg", "/assets/works/kamakama-stage2.jpg", "/assets/works/kamakama-stage3.jpg"] },
      { title: "おばけキングとのたたかい", images: ["/assets/works/kamakama-boss1.jpg", "/assets/works/kamakama-boss2.jpg", "/assets/works/kamakama-bossguide.jpg"] },
      { title: "あそびかた・クリア", images: ["/assets/works/kamakama-howto.jpg", "/assets/works/kamakama-stageclear.jpg", "/assets/works/kamakama-clear.jpg", "/assets/works/kamakama-retry.jpg"] },
    ],
  },
  */
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
  // === 福岡市科学館 CREATIVE AWARD：本人指示で「一時的に非表示」（2026-09-14／応募に至らなかったため）。再表示する時はこの /* */ を外すだけ。 ===
  /*
  {
    slug: "fukuoka-award",
    title: "福岡市科学館 CREATIVE AWARD 2026（応募構想）",
    category: "imaging",
    status: "構想中",
    summary: "福岡市科学館の展示アイデア公募『CREATIVE AWARD 2026』（テーマ：生きもののコミュニケーション）への応募を準備している、研究室での個人企画。",
    goal: "科学を“体で感じて学べる”体験を考える。（応募準備中のため、具体的なアイデアの公開は控えています）",
  },
  */
  {
    slug: "shuwa-game",
    title: "手話認識ゲーム",
    category: "imaging",
    summary: "カメラに映した手話を認識して採点するゲームを実装。手と顔のランドマーク検出で、五十音や「ありがとう」「さようなら」などの手話をリアルタイムに判定する。",
    goal: "手の形・動きをコンピュータに認識させ、楽しく学べる“次世代の手話アプリ”をつくる。",
    approach: "MediaPipe の Hands / Face Mesh で指・顔の特徴点を取得し、各手話のポーズを判定するロジックを実装。初級（単音）・中級（フレーズ）・上級（ヒントなし）の難易度、ライブカメラへのランドマーク描画、制限時間とスコア、学習モード・手話辞典・成績確認（苦手な手話の集計）まで作り込んだ。実装とプレゼン資料を主に担当。",
    tools: ["Python", "MediaPipe", "OpenCV", "FreeSimpleGUI"],
    thumb: "/assets/works/shuwa-play.jpg",
    contain: true,
    slideGroups: [
      { title: "アプリの画面", images: ["/assets/works/shuwa-home.jpg", "/assets/works/shuwa-app-2.jpg", "/assets/works/shuwa-app-1.jpg", "/assets/works/shuwa-app-3.jpg", "/assets/works/shuwa-app-4.jpg", "/assets/works/shuwa-result.jpg"] },
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
    summary: "アイドルのミーグリを本番そっくりに練習できる、自作のWebアプリ。緊張も通信ラグも推しの反応も再現した。",
    goal: "本番は一瞬で緊張して頭が真っ白になる。事前に場数を踏める場をつくり、何を話すか・どう振る舞うかを体で覚えられるようにした。（登場キャラは実在の人物・団体とは無関係の架空オリジナル）",
    approach: "会話は2段構えにして、内蔵の台本＋ルールのエンジンを土台にAIとの会話と講評を上乗せし、失敗時は自動で台本へ戻す。上乗せが使えないときも台本で練習できる。APIキーはサーバー側だけに置いた。画面はビルド不要の単一HTMLで、背景はシェーダー、アイドルはインラインSVGの立ち絵にまばたき・口パク・呼吸をつけた。見た目はデザイントークンで整理している。機嫌や会話メモリ、持ち時間と通信ラグまで本番に寄せた。カメラは端末内で完結させ、録画も送信もしない。",
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
    title: "Settlo（セトロ）― レシートAI割り勘アプリ",
    category: "web",
    summary: "レシートを撮るだけで旅行や飲み会の割り勘から精算まで済むアプリ。サークル内ハッカソンで企業協賛賞。技育博2026 Vol.2（2026年9月・虎ノ門ヒルズ）に出展した。",
    goal: "立て替えの計算が面倒で精算はうやむやになりがち。1枚撮れば記録は済み、誰でも迷わず支払いまで終えられる状態をめざした。",
    approach: "自分はイベント詳細・精算ロジックとデータ設計、レシートのAI読み取りを担当。開発は5人、展示は3人体制で、UI・ホーム画面やフレンド機能はチームで分担した。送金の回数が最小で、できるだけ100円単位で割り切れる金額になる相殺を組み、イベント単位と相手単位の二通りでまとめて片づけられるようにした。現金は受け取った側の承認で完了する二段階にし、戻された分は未払いと分けて表示した。撮ったレシートは店名・金額・消費税・品目まで自動入力し、5枚までまとめて読める。返信案を出すときは相手の名前を渡さず仮のラベルに置き換える。金額の正データは取引1本に決めて二重に持たず、お金を確定させる処理はサーバー側だけに置き、まとめて精算に予約された取引は編集も削除もできないようにした。計算は画面から切り離した純粋関数にし、テストで金額と状態遷移を固定した。",
    tools: ["Vue 3 / Vite", "Firebase（Firestore / Cloud Functions / FCM）", "Gemini 2.5 Flash（レシート読み取り・返信案）", "PWA"],
    thumb: "/assets/works/settlo-event.jpg",
    contain: true,
    status: "ハッカソン企業協賛賞・技育博2026出展",
    link: "https://settlo-app.web.app",
    slideGroups: [
      { title: "記録する・まとめて精算する（ゲストデモの実画面）", images: ["/assets/works/settlo-home.jpg", "/assets/works/settlo-event.jpg", "/assets/works/settlo-pay.jpg"], portrait: true },
      { title: "迷わせない仕組み（アシスタント・お知らせ・使い方ガイド・フレンド）", images: ["/assets/works/settlo-assistant.jpg", "/assets/works/settlo-notif.jpg", "/assets/works/settlo-guide.jpg", "/assets/works/settlo-friend.jpg"], portrait: true },
      { title: "相談する・AIと返信を考える（支払いの件ごとのチャット／AIが会話を読んで出した返信案）", images: ["/assets/works/settlo-chat.jpg", "/assets/works/settlo-ai.jpg"], portrait: true },
    ],
  },
  {
    slug: "nogi-photo",
    title: "NogiPhotoManager ― 生写真コレクション管理アプリ",
    category: "web",
    summary: "生写真（約390セット・約1,300枚）の所有を1枚ずつ記録するアプリ。自分用に作り、コンプ率やレア別・年別の統計も見られる。",
    goal: "何を持っていて何が足りないかは紙のバインダーでは追えない。スマホで即確認して、トレードや買い足しをその場で決められるように。",
    approach: "当初はiOS（SwiftUI）で作っていたが、無料枠では署名が7日で失効して使い続けられない。そこでインストール不要でずっと使えるPWAへ全面的に作り直した。写真1枚を最小単位に、バインダー→年→セット→ポーズ枠の階層で手持ちを記録。読み取り専用の作品カタログと自分のデータは完全に分け、手持ちの情報は端末内だけに保存して外部へは一切送らない。取り込みは連続撮影や端末の写真から印字・ポーズ・レア度を判定して枠を自動で割り当て、あいまいなときは候補を出す。ホログラムの見え方で見分けるレアの先入れ、求譲リストの交換、未所持やダブりでの絞り込みも入れた。AI認識はサーバーレス関数側で動かし、APIキーはフロントに出さない構成にした。",
    tools: ["React 19 / TypeScript", "Tailwind CSS v4", "Dexie (IndexedDB)", "Gemini API", "PWA / Vercel"],
    thumb: "/assets/works/nogi-home.jpg",
    contain: true,
    status: "公開中・開発中",
    link: "https://nogi-photo-manager46.vercel.app",
    slideGroups: [
      { title: "コレクション — 所有枚数とコンプ率をひと目で", images: ["/assets/works/nogi-home.jpg"] },
      { title: "バインダー — セット・ポジション単位で所有を記録", images: ["/assets/works/nogi-binder.jpg"] },
      { title: "統計 — レアリティ別・年別の集計", images: ["/assets/works/nogi-stats.jpg"] },
    ],
  },
  {
    slug: "uriko-site",
    title: "売り子 応援サイト",
    category: "web",
    summary: "バンテリンドームのビール売り子活動を広めるために作った個人サイト。『「応援したくなる」を、めざして。』をテーマに、明るくポップにまとめた一枚。運営している本人は、2026年の年間ランキングで新人売上10位・おつまみは全体15位。",
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
    status: "新人売上10位・おつまみ全体15位",
  },
  {
    slug: "portfolio-vol1",
    title: "ポートフォリオ vol.1（SPECTRUM）",
    category: "web",
    summary: "このサイトの前作。「つくって、光を放つ。」がテーマ。深い闇色×可視光線の色で、分野が増えるほど出せる色が増えることを視覚化した。Astro 製。",
    goal: "「いろいろなことに手を出すほど、出せる色が増えていく」を、光のスペクトラムで表現する。量産型に見えない、映画の予告編のような没入感のあるポートフォリオをめざした。",
    approach: "深い闇色の背景に、可視光線のスペクトラムを差し色として効かせる配色。巨大な日本語タイポ、フィルムのようなグレイン（粒状）テクスチャ、テーマに追従するカスタムカーソル、スクロールで要素が立ち上がる演出、初回だけのシネマティックなイントロなどを作り込んだ。Web・画像処理・CG・映像・企画・グラフィック・サウンドの全7分野を、分野ごとに色分けして一覧にした。デザインから実装（Astro／TypeScript／CSS）まで一人で担当。vol.2 では方向性を“明るい仕事場”へ切り替えたため、対照として見比べられるよう別サイトとして残している。",
    tools: ["Astro", "TypeScript", "CSS"],
    thumb: "/assets/works/portfolio-vol1.jpg",
    gallery: ["/assets/works/portfolio-vol1.jpg", "/assets/works/portfolio-vol1-works.jpg", "/assets/works/portfolio-vol1-about.jpg"],
    status: "前作・公開中",
    link: "https://ryoo-ma638.github.io/",
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
const featuredOrder = ["shibuya-crossing", "deathcamer", "robot-argus", "meegri", "yumiki-world", "chuo-seisakusho", "drone-note", "mushiba-animals"];
export const featuredWorks = works
  .filter((w) => w.featured)
  .sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));
