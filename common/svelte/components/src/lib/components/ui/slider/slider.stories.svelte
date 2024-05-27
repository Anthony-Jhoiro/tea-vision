<script context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import Slider from './slider.svelte';

  export const meta = {
    title: 'Slider',
    component: Slider,
    args: {
      value: [80],
      max: 100,
      step: 5,
    },
  };
</script>

<Template let:args>
  <div class="grid h-full place-items-center">
    <Slider {...args} />
  </div>
</Template>

<Story name="Default" args={{ class: 'w-64' }} />
<Story name="Vertical" args={{ orientation: 'vertical', class: 'h-64' }} />
<Story name="Horizontal" args={{ orientation: 'horizontal', class: 'w-64' }} />
