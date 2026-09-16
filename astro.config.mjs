import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sakuranomiyakoen.com',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh-tw', 'ko'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
