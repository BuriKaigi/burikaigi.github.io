// BuriKaigi 2027 の開催情報。1 件だけの設定値なので Content Collections ではなくここに置く。
// URL 系は確定したら値を入れる（undefined の間はボタン・リンクを出さない）。
export const conference = {
  year: 2027,
  days: ['2027-01-08', '2027-01-09'],
  venue: {
    name: '富山国際会議場',
    address: '富山県富山市大手町1番2号',
    mapUrl: 'https://maps.app.goo.gl/PN7ezeu4XtBsWrx37',
  },
  lead: '年に一度、寒ブリの季節に、ソフトウェア開発・IT の最前線に立つエキスパートを全国から北陸へお招きし、技術の旬を持ち寄るカンファレンスです。',
  /** 参加申し込み（connpass など）。設定するとヘッダーと「BuriKaigiとは？」に申し込みボタンを出す */
  registrationUrl: undefined as string | undefined,
  /** タイムテーブル（fortee など）。設定すると「BuriKaigiとは？」にリンクを出す */
  timetableUrl: undefined as string | undefined,
  x: 'burikaigi',
} as const;

// 'YYYY-MM-DD' を日付表示用に分解する。タイムゾーンの影響を受けないよう UTC で曜日を求める。
const WEEKDAYS_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'] as const;

export type DayParts = {
  year: number;
  month: number;
  day: number;
  weekdayEn: (typeof WEEKDAYS_EN)[number];
  weekdayJa: (typeof WEEKDAYS_JA)[number];
};

export const toDayParts = (iso: string): DayParts => {
  const [year, month, day] = iso.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, weekdayEn: WEEKDAYS_EN[weekday], weekdayJa: WEEKDAYS_JA[weekday] };
};
