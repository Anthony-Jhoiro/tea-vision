import type { StorybookConfig } from '@storybook/svelte-vite';
import { createGlobPatternsForDependencies } from '@nx/js/src/utils/generate-globs';
import * as path from 'node:path';

const storiesPatterns = createGlobPatternsForDependencies(
  __dirname,
  '**/*.stories.@(js|jsx|ts|tsx|mdx|svelte)',
);

// const storiesPatterns = [
//   path.join(
//     __dirname,
//     '..',
//     '..',
//     'components',
//     '**/*.stories.@(js|jsx|ts|tsx|mdx|svelte)',
//   ),
// ];

const config: StorybookConfig = {
  stories: storiesPatterns,
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf',
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
