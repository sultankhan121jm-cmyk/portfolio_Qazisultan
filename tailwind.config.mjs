/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#111110', // Warm Charcoal
        surface: 'rgba(255,255,255,0.03)',
        'accent-blue': '#E2D9CC', // Warm Cream (Used for buttons, links, icons, 8.68% stat)
        'accent-gold': '#A89F91', // Muted Taupe (Used for the QS logo, 3x stat)
        'text-primary': '#F5F5F5', // Clean White (Headings ONLY)
        'text-muted': '#A1A1AA',   // Zinc-400 (Body text ONLY)
        'text-subtle': '#71717A',   // Zinc-500 (Dates, footers ONLY)
      },
       fontFamily: {
        heading: ['"Montserrat"', 'sans-serif'],
        body: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};