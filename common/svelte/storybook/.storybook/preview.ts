import 'tailwind-config/index.css';
import { Preview } from '@storybook/svelte';
import CatppuccinDecorator from './CatppuccinDecorator.svelte';

const preview: Preview = {
  //@ts-expect-error svelte component is not a valid svelte component for storybook ¯\_(ツ)_/¯
  decorators: [() => CatppuccinDecorator],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
