import type { Meta, StoryObj } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import { action } from '@storybook/addon-actions';

import BrewingPage from './BrewingPage.svelte';
import { expect, within } from '@storybook/test';

const actionsData = {
  start: action('start'),
};

const meta: Meta<Required<ComponentProps<BrewingPage>>> = {
  component: BrewingPage,
  title: 'Pages/BrewingPage',
  args: {
    tea: {
      id: 'jardin_bleu',
      imageUrl: '',
      name: 'Jardin Bleu',
      description:
        'Apprécié pour son bel équilibre et son savoureux parfum, il délivre une liqueur veloutée à la saveur de fruits du jardin mêlant avec gourmandise, rhubarbe, fraise et fraise des bois. Dégusté chaud ou encore glacé à la belle saison, on ne sait quelle préparation préférer pour ce thé tout simplement délicieux !',
      brand: 'DAMMANN',
      minimumBrewingTimeInMinutes: 4,
      maximumBrewingTimeInMinutes: 4,
      brewingTemperatureInCelsius: 95,
      type: 'black_tea',
    },
    brandLogo:
      'https://serpapi.com/searches/665a25d62e7d6be4eb21fc64/images/ed9f613376e2dda8115e37bd9f2e58610642b8393b1c15a5ab93dae33aadd5ce.jpeg',
    buttonText: 'Go!',
  },
  render: (args) => ({
    Component: BrewingPage,
    props: {
      ...args,
    },
    on: {
      ...actionsData,
    },
  }),
};

export default meta;
type Story = StoryObj<Required<ComponentProps<BrewingPage>>>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      await canvas.findByText(args.tea.name),
      'Should display the name',
    ).toBeInTheDocument();
    expect(
      canvas.findByText(args.tea.brewingTemperatureInCelsius),
      'Should display the temperature',
    ).toBeInTheDocument();
  },
};
