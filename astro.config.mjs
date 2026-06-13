import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://qazi-sultan.vercel.app',
  integrations: [tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});