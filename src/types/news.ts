export type NewsFrontmatter = {
  title: string;
  date: string;
  summary?: string;
  external?: string;
};

// Astro が `import.meta.glob` で返す `.md` モジュール。`url` は pages/ 配下
// の Markdown には常に付与されるので必須として扱う。
export type NewsModule = {
  frontmatter: NewsFrontmatter;
  url: string;
};

export type NewsItem = NewsFrontmatter & {
  url: string;
};

// frontmatter.external は YAML 由来で型保証が無いため、安全な http(s) スキーム
// のみを許可する。`javascript:` などの危険スキーム混入を防ぐ。
export const safeExternal = (u?: string): string | undefined =>
  u && /^https?:\/\//i.test(u) ? u : undefined;

export const resolveLink = (item: NewsItem): { href: string; isExternal: boolean } => {
  const ext = safeExternal(item.external);
  return ext ? { href: ext, isExternal: true } : { href: item.url, isExternal: false };
};
