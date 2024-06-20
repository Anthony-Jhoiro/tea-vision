<script lang="ts">
  import clsx from 'clsx';
  import Loader from '../Loader/Loader.svelte';
  import type { HTMLProgressAttributes } from 'svelte/elements';

  interface $$Props extends HTMLProgressAttributes {}

  $: isTerminated = $$props['value'] >= $$props['max'];

  $: angle = (1 - $$props['value'] / $$props['max']) * 360;

  $: background = `radial-gradient(rgb(var(--ctp-base)) 60%, transparent 60%),
    conic-gradient(transparent 0deg ${angle}deg, rgb(var(--ctp-crust)) ${angle}deg 360deg),
    rgb(var(--ctp-teal));`;

  $: cssVarStyles = `--background:${background}`;

  let className: HTMLProgressAttributes['class'];

  $: {
    className = $$props['class'];
  }
</script>

<div
  class={clsx('flex max-h-80 max-w-80 items-center justify-center', {
    'variable-background rounded-full transition-all duration-500 ease-in will-change-transform	':
      !isTerminated,
    className,
  })}
  style={cssVarStyles}
>
  <Loader
    {...$$restProps}
    class={clsx('-translate-y-8 translate-x-5 text-6xl', {
      'animate-preserved-bounce delay-500': isTerminated,
    })}
  />
</div>

<style lang="postcss">
  .variable-background {
    background: var(--background);
  }
</style>
