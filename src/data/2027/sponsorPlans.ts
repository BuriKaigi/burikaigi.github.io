// スポンサープラン。この配列の順でトップページに並べる。
// size はロゴ枠の大きさ（lg: 1 行 3 枠 / md: 4 枠 / sm: 6 枠）。
// プラン名・順序はスポンサー概要資料に合わせて調整すること。
export const sponsorPlans = [
  { id: 'himi-buri', label: '氷見ブリスポンサー', size: 'lg' },
  { id: 'buri', label: 'ブリスポンサー', size: 'lg' },
  { id: 'gando', label: 'ガンドスポンサー', size: 'md' },
  { id: 'fukuragi', label: 'フクラギスポンサー', size: 'md' },
  { id: 'kozukura', label: 'コヅクラスポンサー', size: 'sm' },
  { id: 'supporter', label: '後援', size: 'sm' },
] as const;

export type SponsorPlanId = (typeof sponsorPlans)[number]['id'];

export const sponsorPlanIds = sponsorPlans.map((p) => p.id) as [SponsorPlanId, ...SponsorPlanId[]];
