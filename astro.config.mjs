import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://qazi-sultan.vercel.app',
  integrations: [tailwind(), react()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});