import type { StorybookConfig } from '@storybook/svelte-vite';
import { createGlobPatternsForDependencies } from '@nx/js/src/utils/generate-globs';
import type { StoriesEntry } from '@storybook/types';
import { createProjectGraphAsync } from 'nx/src/project-graph/project-graph';

const config: StorybookConfig = {
  stories: async (list: StoriesEntry[]) => {
    await createProjectGraphAsync();
    return [
      ...(list ?? []),
      ...createGlobPatternsForDependencies(
        __dirname,
        '**/*.stories.@(js|jsx|ts|tsx|mdx|svelte)',
      ),
    ];
  },
  addons: [
    '@storybook/addon-essentials', //base
    '@storybook/addon-interactions', // component Testing
    '@storybook/addon-svelte-csf', // write stories in svelte format
    '@storybook/addon-themes', // Tailwind
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
  staticDirs: ['../static'],
};

export default config;
