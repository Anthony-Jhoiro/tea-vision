import 'tailwind-config/index.css';
import { Preview } from '@storybook/svelte';
import CatppuccinDecorator from './CatppuccinDecorator.svelte';

const preview: Preview = {
  //@ts-expect-error
  decorators: [() => CatppuccinDecorator],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
