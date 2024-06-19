import * as stories from './TimerPage.stories';
import TimerPage from './TimerPage.svelte';
import { afterEach, beforeEach } from 'vitest';
import type { ComponentProps } from 'svelte';
import { render, RenderResult } from '@testing-library/svelte';
import { composeStories } from '@storybook/svelte';

const { Default } = composeStories(stories);

const { mockedT } = await vi.hoisted(async () => {
  const { derived, writable } = await import('svelte/store');

  const mockedLocale = writable('fr');
  return { mockedT: derived(mockedLocale, () => (key: string) => key) };
});

describe('TimerPage', () => {
  let props: Required<ComponentProps<TimerPage>>;
  let canvas: RenderResult<TimerPage>;

  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    });
    vi.mock('../../i18n', async () => ({
      t: mockedT,
    }));

    props = Default.args as Required<ComponentProps<TimerPage>>;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('should render the ask notification permission button if not authorised', () => {
    canvas = render(TimerPage, { ...props, hasEnableNotifications: false });

    expect(
      canvas.getByText('brewing.notificationPermissionButton'),
    ).toBeInTheDocument();
  });

  test('should not render the ask notification permission button if authorised', async () => {
    canvas = render(TimerPage, { ...props, hasEnableNotifications: true });

    const askNotificationButton = canvas.queryByText(
      'brewing.notificationPermissionButton',
    );

    expect(askNotificationButton).toBeNull();
  });
});
