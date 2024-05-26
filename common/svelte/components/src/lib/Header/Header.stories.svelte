<script context="module">
  import Header from './Header.svelte';

  export const meta = {
    title: 'Header',
    component: Header,
  };
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf';

  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Header {...args}>I am the title</Header>
</Template>

<Story name="Default" args={{}} />
