<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { clsx } from 'clsx';
  import { Sprout } from 'lucide-svelte';

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props['class'];
  export { className as class };
  export let illustration: string;
  export let alt = '';

  let imageLoadFailed = false;

  function handleImageLoadFail() {
    imageLoadFailed = true;
  }

  $: usePlaceholderIllustration = imageLoadFailed || !illustration;
</script>

<div
  class={clsx(
    'bg-surface1 text-text flex h-24 gap-3 overflow-hidden hover:shadow-lg',
    className,
  )}
  {...$$restProps}
>
  <div class="relative row-span-2 aspect-square object-cover">
    {#if usePlaceholderIllustration}
      <div class="flex h-full w-full items-center justify-center bg-slate-50">
        <Sprout class="text-slate" size={60} />
      </div>
    {:else}
      <img
        src={illustration}
        {alt}
        class="h-full w-full object-cover"
        on:error={handleImageLoadFail}
      />
    {/if}
  </div>

  <div class="flex flex-col gap-3 p-3">
    <div class="text-xl">
      <slot name="title" />
    </div>

    <div class="overflow-y-auto">
      <slot />
    </div>
  </div>
</div>
