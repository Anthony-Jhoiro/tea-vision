<script context="module">
  import HorizontalCard from './HorizontalCard.svelte';

  export const meta = {
    title: 'HorizontalCard',
    component: HorizontalCard,
    args: {
      illustration: 'https://placekitten.com/200/300',
    },
  };
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <HorizontalCard {...args}>
    <h3 slot="title">I am a title</h3>
    <p>I am a slot</p>
  </HorizontalCard>
</Template>

<Story name="Default" args={{ rounded: true }} />
