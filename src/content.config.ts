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
// 本文（Markdown）は今後スポンサー詳細ページを作るときの紹介文として使う
const sponsors2027 = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/2027/sponsors' }),
  schema: z.object({
    name: z.string(),
    plan: z.enum(sponsorPlanIds),
    /** 未指定なら名前を文字で表示する */
    logo: imagePath.optional(),
    /** 未指定ならリンクにしない */
    url: z.url().optional(),
    x: z.string().optional(),
    order: z.number().default(0),
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
