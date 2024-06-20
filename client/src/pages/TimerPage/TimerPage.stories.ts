import type { Meta, StoryObj } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import TimerPage from './TimerPage.svelte';

const meta: Meta<Required<ComponentProps<TimerPage>>> = {
  component: TimerPage,
  title: 'Pages/TimerPage',
  args: {
    start: '2023-05-20T10:00:00.000Z',
    end: '2023-05-20T10:30:00.000Z',
    hasEnableNotifications: false,
  },
  render: (args) => ({
    Component: meta.component,
    props: args,
  }),
};

export default meta;
type Story = StoryObj<Required<ComponentProps<TimerPage>>>;

export const Default: Story = {
  args: {
    start: '2023-05-20T10:00:00.000Z',
    end: '2023-05-20T10:30:00.000Z',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
