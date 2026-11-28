import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { sponsorPlanIds } from '~/data/2027/sponsorPlans';

// 確定するたびに 1 件 = 1 ファイルで追加していくデータ。
// コレクションが空ならトップページの該当セクションとナビは出ない。
// 並び順は order の昇順（同じ値ならファイル名順）。

// public 配下のパス（/images/...）か外部 URL
const imagePath = z.string().regex(/^(\/|https:\/\/)/, '/ で始まる public 配下のパスか https:// の URL を指定してください');

// src/content/2027/sponsors/*.md
// 本文（Markdown）はスポンサー詳細ページ（src/pages/sponsors/[slug].astro）に紹介文として出す
const sponsors2027 = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/2027/sponsors' }),
  schema: z.object({
    name: z.string(),
    /**
     * 詳細ページの URL（/sponsors/<pageSlug>/）。Webサイトのドメインから決め、一度決めたら変えない。
     * URL が変わっても自動では追従させない（リンク切れを防ぐため）。
     * 項目名を slug にしないこと: glob ローダーが slug をエントリ ID に使い、同じ値のエントリが黙って上書きされる
     */
    pageSlug: z.string().regex(/^[a-z0-9-]+$/, '英小文字・数字・ハイフンのみ使えます'),
    /** 申込日時。同じ order の中ではこの昇順で並べる */
    appliedAt: z.coerce.date().optional(),
    plan: z.enum(sponsorPlanIds),
    /** 未指定なら名前を文字で表示する */
    logo: imagePath.optional(),
    /** Webサイト。詳細ページに出す */
    url: z.url().optional(),
    x: z.string().optional(),
    order: z.number().default(0),
    /** true ならサイトに出さない（ロゴ未着などでデータだけ用意しておく場合） */
    hidden: z.boolean().default(false),
  }),
});

// src/content/2027/keynotes/*.yaml
const keynotes2027 = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/2027/keynotes' }),
  schema: z.object({
    name: z.string(),
    affiliation: z.string().optional(),
    image: imagePath.optional(),
    /** 講演タイトル。未定なら省略 */
    title: z.string().optional(),
    /** 1 = DAY 1, 2 = DAY 2 */
    day: z.union([z.literal(1), z.literal(2)]).optional(),
    x: z.string().optional(),
    /** Facebook のユーザー名（facebook.com/ 以降） */
    facebook: z.string().optional(),
    /** セッション詳細（fortee など） */
    url: z.url().optional(),
    order: z.number().default(0),
  }),
});

// src/content/2027/events/*.yaml
// 前夜祭・ハッカソン・ワークショップ・各種募集など、カードで並べる告知
const events2027 = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/2027/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.object({ label: z.string(), href: z.string() }).optional(),
    /** kin = 金色の強調カード */
    accent: z.enum(['ai', 'kin']).default('ai'),
    order: z.number().default(0),
  }),
});

export const collections = { sponsors2027, keynotes2027, events2027 };
