<script lang="ts">
  import type { Tea } from 'domains';
  import { Button, Slider } from 'common-svelte';
  import { Thermometer } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { formatTime, getTemperatureClassName } from './brewingPageUtils';

  // Props
  export let tea: Tea;
  export let brandLogo: string;
  export let buttonText: string;

  // State
  let brewingTime = [tea.minimumBrewingTimeInMinutes];
  let expendDescription = false;

  // Utils
  const dispatch = createEventDispatcher();

  const temperatureRadiant = [
    'text-teal',
    'text-green',
    'text-yellow',
    'text-peach',
    'text-maroon',
  ];

  // Events
  function onStart() {
    dispatch('start', {
      brewingTime: brewingTime[0],
    });
  }

  // Dynamic

  $: brewingTimeText = formatTime(brewingTime[0]);
</script>

<div class="relative flex h-full w-full flex-grow flex-col">
  <div
    class="nice-background bg-crust absolute left-0 top-0 z-0 h-full w-full"
  />

  <div
    class="flex-stretch relative z-10 flex h-full grow flex-col justify-between px-5"
  >
    <header class="grid grid-flow-col grid-cols-[2fr_1fr] grid-rows-2 gap-2">
      <h2 class="text-text text-xl">{tea.name}</h2>
      <p
        class={clsx(
          getTemperatureClassName(
            tea.brewingTemperatureInCelsius,
            temperatureRadiant,
          ),
          'flex',
        )}
      >
        <Thermometer />
        <span>
          {tea.brewingTemperatureInCelsius}°
        </span>
      </p>

      <div class="row-span-2 ml-auto aspect-square h-16 overflow-hidden">
        <img
          class="max-h-full max-w-full object-contain"
          src={brandLogo}
          alt={tea.brand}
        />
      </div>
    </header>

    <div class="grid grid-cols-3 gap-3">
      <div class="col-span-2 col-start-2 flex gap-3">
        <time class="text-text text-center font-mono text-4xl">
          {brewingTimeText}
        </time>
        <Button on:click={onStart}>
          {buttonText}
        </Button>
      </div>
      <Slider
        class="col-span-3 w-full"
        orientation="horizontal"
        min={0}
        max={tea.maximumBrewingTimeInMinutes}
        bind:value={brewingTime}
        step={0.5}
      />

      <div class="col-span-3">
        <p
          class={clsx('text-text cursor-pointer transition-all', {
            'line-clamp-3': !expendDescription,
          })}
          on:click={() => (expendDescription = !expendDescription)}
        >
          {tea.description}
        </p>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .nice-background {
    mask-image: url('/tea-rabbit.svg');
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;
  }
</style>
