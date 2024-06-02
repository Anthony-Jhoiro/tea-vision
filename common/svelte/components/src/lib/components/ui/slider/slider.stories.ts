import type { Meta, StoryObj } from '@storybook/svelte';

import { userEvent, waitFor, within, expect } from '@storybook/test';
import SingleElementStoryDecorator from '../../../storybook-utils/SingleElementStoryDecorator.svelte';

import Slider from './slider.svelte';

const meta: Meta<any> = {
  component: Slider,
  title: 'Slider',
  // @ts-expect-error, storybook typing is nightmare
  decorators: [() => SingleElementStoryDecorator],
  args: {
    value: [0],
    max: 5,
    min: 0,
  },
  render: (args: any) => ({
    Component: meta.component,
    props: args,
  }),
};

export default meta;
type Story = StoryObj;

function getCurrentValue<T>(canvas: ReturnType<typeof within>) {
  const inputValue = canvas
    .getByRole('slider')
    .attributes.getNamedItem('data-value')?.value;
  return parseInt(inputValue);
}

export const Default: Story = {
  args: {
    class: 'w-full',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    const targetValue = 3;

    await userEvent.tab();
    for (let i = 1; i <= targetValue; i++) {
      await step('Increase Value to ' + i, async () => {
        await userEvent.keyboard('[ArrowRight]');

        await waitFor(() => expect(getCurrentValue(canvas)).toEqual(i));
      });
    }
    await expect(getCurrentValue(canvas)).toBe(targetValue);
  },
};

export const Vertical: Story = {
  args: {
    class: 'h-full',
    orientation: 'vertical',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    const targetValue = 3;

    await userEvent.tab();
    for (let i = 1; i <= targetValue; i++) {
      await step('Increase Value to ' + i, async () => {
        await userEvent.keyboard('[ArrowUp]');

        await waitFor(() => expect(getCurrentValue(canvas)).toEqual(i));
      });
    }
    await expect(getCurrentValue(canvas)).toBe(targetValue);
  },
};
