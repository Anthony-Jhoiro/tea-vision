import { render, RenderResult } from '@testing-library/svelte';
import { composeStories } from '@storybook/svelte';
import * as stories from './BrewingPage.stories';
import BrewingPage from './BrewingPage.svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach } from 'vitest';
import type { ComponentProps } from 'svelte';

const { Default } = composeStories(stories);

describe('Brewing Page', () => {
  let props: Required<ComponentProps<BrewingPage>>;
  let canvas: RenderResult<BrewingPage>;

  beforeEach(() => {
    props = Default.args as Required<ComponentProps<BrewingPage>>;
    canvas = render(BrewingPage, { ...props });
  });
  test('should render correctly', async () => {
    const title = await canvas.findByText(props.tea.name);
    const temperature = await canvas.findByText(
      `${props.tea.brewingTemperatureInCelsius}°`,
    );
    expect(title).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });

  test('should emit start event on button pressed', async () => {
    const user = userEvent.setup();

    const startFn = vitest.fn();
    canvas.component.$on('start', startFn);

    const startButton = await canvas.findByText(props.buttonText);

    await user.click(startButton);

    expect(startFn).toHaveBeenCalledWith(
      new CustomEvent('start', {
        detail: {
          brewingTime: props.tea.minimumBrewingTimeInMinutes,
        },
      }),
    );
  });
});
