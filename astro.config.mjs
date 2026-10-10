import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

import react from "@astrojs/react";

// Astro 既定の Shiki が出力する <pre>/<code>/<span> の class/style を残すため
// defaultSchema を拡張する。これがないとシンタックスハイライトが剥がれる。
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className', 'style'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className', 'style', 'tabIndex'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className', 'style'],
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://burikaigi.dev',
  // 改行をまたぐ空白を削除しない (削除すると文中のスペースが消える)
  compressHTML: true,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeSanitize, sanitizeSchema]],
    }),
  },
});