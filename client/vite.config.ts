/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import * as path from 'node:path';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/client',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    nxViteTsPaths(),
    svelte({
      preprocess: sveltePreprocess({}),
    }),
  ],

  worker: {
    plugins: () => [nxViteTsPaths()],
  },

  build: {
    outDir: '../dist/client',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        offline: resolve(__dirname, 'offline.html'),
      },
    },
  },

  test: {
    globals: true,

    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../coverage/client',
      provider: 'v8',
    },
    setupFiles: path.join('.', 'test', 'setup.ts'),
    server: {
      deps: {
        inline: [
          '@storybook/svelte',
          'bits-ui',
          'lucide-svelte',
          'vaul-svelte',
        ],
      },
    },
  },
});
