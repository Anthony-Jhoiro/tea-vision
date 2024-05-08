import type { Config } from 'tailwindcss'

export default {
  content: ['./src/*.{html,js,svelte,ts}', './src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

