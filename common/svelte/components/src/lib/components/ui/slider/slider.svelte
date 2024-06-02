<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui';
  import { cn } from 'common-svelte';

  type $$Props = SliderPrimitive.Props;

  let className: $$Props['class'] = undefined;
  export let value: $$Props['value'] = [0];
  export let orientation: $$Props['orientation'] = 'horizontal';
  export { className as class };
</script>

<SliderPrimitive.Root
  bind:value
  bind:orientation
  class={cn(
    'relative flex touch-none select-none items-center',
    className,
    orientation === 'horizontal' ? '' : 'flex-column',
  )}
  {...$$restProps}
  let:thumbs
>
  <span
    class={cn(
      'bg-crust relative grow overflow-hidden rounded-full',
      orientation === 'horizontal' ? 'h-2 w-full' : 'h-full w-2',
    )}
  >
    <SliderPrimitive.Range
      class={cn(
        'bg-teal absolute',
        orientation === 'horizontal' ? 'h-full' : 'w-full',
      )}
    />
  </span>
  {#each thumbs as thumb}
    <SliderPrimitive.Thumb
      {thumb}
      class={cn(
        'border-teal bg-crust hover:bg-teal focus:bg-teal ring-offset-background focus-visible:ring-ring block h-5 w-5 cursor-pointer rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          '-translate-x-1/4': orientation === 'vertical',
        },
      )}
    />
  {/each}
</SliderPrimitive.Root>
