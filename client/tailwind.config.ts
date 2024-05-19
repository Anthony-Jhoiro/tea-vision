import type { Config } from 'tailwindcss';
import { createGlobPatternsForDependencies } from '@nx/js/src/utils/generate-globs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import CommonTailwindConfig from '../common/config/tailwind-config/src/index';

export default {
  content: [
    './src/*.{html,js,svelte,ts}',
    './src/**/*.{html,js,svelte,ts}',
    './*.html',
    ...createGlobPatternsForDependencies(__dirname, '**/*.{html,js,svelte,ts}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [CommonTailwindConfig],
} satisfies Config;
