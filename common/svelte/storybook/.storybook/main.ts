import type { StorybookConfig } from '@storybook/svelte-vite';
import { createGlobPatternsForDependencies } from '@nx/js/src/utils/generate-globs';

const storiesPatterns = createGlobPatternsForDependencies(
  __dirname,
  '**/*.stories.@(js|jsx|ts|tsx|mdx|svelte)',
);

const config: StorybookConfig = {
  stories: storiesPatterns,
  addons: [
    '@storybook/addon-essentials', //base
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf', // write stories in svelte format
    '@storybook/addon-themes',
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
