import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap'; // <-- Added this

export default defineConfig({
  site: 'https://qazi-sultan.vercel.app',
  integrations: [tailwind(), react(), sitemap()], // <-- Added sitemap() here
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});