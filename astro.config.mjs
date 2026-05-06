import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import rehypeSanitize from 'rehype-sanitize';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://burikaigi.dev',
  integrations: [tailwind(), react()],
  markdown: {
    rehypePlugins: [rehypeSanitize],
  },
});