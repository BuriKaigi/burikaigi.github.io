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
  // Astro 7 の既定値 'jsx' は改行をまたぐ空白を削除し、文中のスペースが消えるため v6 までの挙動に戻す
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