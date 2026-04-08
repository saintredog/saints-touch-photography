import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://saintstouch.photography',
  output: 'static',
  outDir: './dist',
  publicDir: './public',
  srcDir: './src'
});
