import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  site: 'https://saintstouch.photography',
  output: 'static',
  outDir: './dist',
  publicDir: './public',
  srcDir: './src',
  vite: {
    resolve: {
      alias: {
        '@i18n': path.resolve('./src/i18n'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
        '@data': path.resolve('./src/data'),
        '@': path.resolve('./src'),
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'pt-br', 'hi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
