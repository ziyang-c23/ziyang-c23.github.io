import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ziyang-c23.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-light' } },
  integrations: [sitemap({
    filter: (page) => !page.endsWith('/404/'),
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', zh: 'zh-CN' },
    },
  })],
});
