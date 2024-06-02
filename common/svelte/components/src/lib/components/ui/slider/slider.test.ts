import { beforeEach, describe, test, expect } from 'vitest';
import Meta, { Default as DefaultStory } from './slider2.stories';
import { composeStory } from '@storybook/svelte';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { before } from '@nx/js/src/utils/typescript/__mocks__/plugin-a';
import { get, writable } from 'svelte/store';
import Slider from './slider.svelte';

const Default = composeStory(DefaultStory, Meta);

describe('Slider', () => {
  beforeEach(() => {
    // userEvent.setup();
  });
  test('should render correctly', async () => {
    userEvent.setup();

    const valueStore = writable(0);

    const component = Default.Component;

    const { container } = render(Slider, {
      value: [valueStore],
      min: 0,
      max: 5,
    });

    await userEvent.tab();
    for (let i = 0; i < 3; i++) {
      await userEvent.keyboard('[ArrowRight]');
    }

    expect(get(valueStore)).toBe(3);
  });
});
