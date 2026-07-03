// 売り子カレンダー用データ（元: ~/売り子カレンダー/生成.py の GAMES）
// venue が「バンテリン」で始まる = ホーム。work=出勤予定日。event=シリーズ。onecoin=ワンコインデー。
export interface Game {
  opp: string;
  venue: string;
  time: string;
  work?: boolean;
  event?: string;
  onecoin?: boolean;
}

export const uriko = {
  year: 2026,
  month: 7,
  handle: '@ryoma_v_dome',
  homeVenue: 'バンテリン',
  games: {
    1:  { opp: '阪神', venue: '甲子園', time: '18:00' },
    2:  { opp: '阪神', venue: '甲子園', time: '18:00' },
    3:  { opp: '巨人', venue: 'バンテリン', time: '18:00', work: true },
    4:  { opp: '巨人', venue: 'バンテリン', time: '14:00', work: true },
    5:  { opp: '巨人', venue: 'バンテリン', time: '13:30', work: true },
    7:  { opp: 'DeNA', venue: '横浜', time: '18:15' },
    8:  { opp: 'DeNA', venue: '横浜', time: '18:15' },
    9:  { opp: 'DeNA', venue: '横浜', time: '18:15' },
    10: { opp: '広島', venue: 'バンテリン', time: '18:00', work: true, event: 'ブルーサマーフェスティバル' },
    11: { opp: '広島', venue: 'バンテリン', time: '14:00', work: true, event: 'ブルーサマーフェスティバル' },
    12: { opp: '広島', venue: 'バンテリン', time: '13:30', work: true, event: 'ブルーサマーフェスティバル' },
    14: { opp: '阪神', venue: 'バンテリン', time: '18:00', work: true },
    15: { opp: '阪神', venue: 'バンテリン', time: '18:00', work: true },
    16: { opp: '阪神', venue: 'バンテリン', time: '18:00', work: true },
    17: { opp: '巨人', venue: '東京ドーム', time: '18:00' },
    18: { opp: '巨人', venue: '東京ドーム', time: '14:00' },
    19: { opp: '巨人', venue: '東京ドーム', time: '14:00' },
    20: { opp: 'ヤクルト', venue: '神宮', time: '18:00' },
    21: { opp: 'ヤクルト', venue: '神宮', time: '18:00' },
    22: { opp: 'ヤクルト', venue: '神宮', time: '18:00' },
    24: { opp: 'DeNA', venue: 'バンテリン', time: '18:00', work: true },
    25: { opp: 'DeNA', venue: 'バンテリン', time: '14:00', work: true },
    26: { opp: 'DeNA', venue: 'バンテリン', time: '13:30', work: true },
    28: { opp: 'オールスター', venue: '東京ドーム', time: '18:30' },
    29: { opp: 'オールスター', venue: '富山', time: '18:30' },
    31: { opp: '広島', venue: 'マツダ', time: '18:00' },
  } as Record<number, Game>,
};

// 相手球団カラー（背景, 文字）
export const TEAM: Record<string, { bg: string; fg: string }> = {
  巨人: { bg: '#f97709', fg: '#fff' }, 阪神: { bg: '#ffe201', fg: '#111' },
  広島: { bg: '#ff2b06', fg: '#fff' }, DeNA: { bg: '#004098', fg: '#fff' },
  ヤクルト: { bg: '#00205b', fg: '#fff' }, 中日: { bg: '#002569', fg: '#fff' },
  オールスター: { bg: '#c9a227', fg: '#111' },
};
export const SHORT: Record<string, string> = {
  オールスター: 'AS', ヤクルト: 'ヤ',
};
