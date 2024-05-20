import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/server',

  plugins: [
    nxViteTsPaths(),
    copy({
      targets: [{ src: 'src/assets/**/*', dest: 'assets' }],
    }),
  ],

  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          client: ['client'],
        },
      },
      external: [/.*\.svelte/],
    },
    // commonjsOptions: {
    //   exclude: ['client/**'],
    // },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: { dir: '../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../coverage/server', provider: 'v8' },
  },
});
