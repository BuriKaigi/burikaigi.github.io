// 2027 年版のページのパスはここで組み立てる。
// 2028 年版を公開して 2027 年版を /2027/ 配下に移すときは、
//   1. basePath を '/2027' にする
//   2. src/pages/sponsors/ を src/pages/2027/sponsors/ へ移す
// の 2 つで、スポンサー詳細ページとそこへのリンクが追従する。
export const basePath = '';

export const sponsorPath = (pageSlug: string): string => `${basePath}/sponsors/${pageSlug}/`;

/** トップページのスポンサー欄 */
export const sponsorsSectionPath = `${basePath}/#sponsors`;

/** 重複している pageSlug を返す（重複がなければ空配列） */
export const findDuplicateSlugs = (slugs: string[]): string[] =>
  [...new Set(slugs.filter((slug, i) => slugs.indexOf(slug) !== i))];
