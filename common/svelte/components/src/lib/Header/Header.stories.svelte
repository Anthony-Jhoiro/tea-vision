<script context="module">
  import Header from './Header.svelte';

  export const meta = {
    title: 'Header',
    component: Header,
  };
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Header {...args}>I am the title</Header>
</Template>

<Story name="Default" args={{}} />
