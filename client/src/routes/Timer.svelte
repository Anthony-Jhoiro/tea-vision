<script lang="ts">
  import { useGetTeaById } from '../services/storage';
  import type { Tea } from 'domains';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import { Button, Loader } from 'common-svelte';
  import { onMount } from 'svelte';
  import { Bell, Leaf } from 'lucide-svelte';
  import clsx from 'clsx';

  const defaultDurationInMilliseconds = 4 * 60 * 1000;

  export let id: Tea['id'];
  export let start: string = new Date().toISOString();
  export let end: string = new Date(
    new Date().getTime() + defaultDurationInMilliseconds,
  ).toISOString();

  const startDate = new Date(start);
  const endDate = new Date(end);

  const duration = endDate.getTime() - startDate.getTime();

  let hasEnableNotifications = true;

  onMount(async () => {
    const sw = await navigator.serviceWorker.ready;
    sw.active.postMessage({
      type: 'timer',
      notifyAt: endDate.toISOString(),
    });
    hasEnableNotifications = Notification.permission === 'granted';

    if (hasEnableNotifications) {
      setTimeout(() => {
        new Notification('Tea Timer', {
          body: 'Vous pouvez démarrer le timer',
          icon: '/tea-rabbit.svg',
        });
      }, duration);
    }
  });

  async function onAskNotification() {
    const permissionResult = await Notification.requestPermission();
    if (permissionResult === 'granted') {
      hasEnableNotifications = true;
    }
  }

  const time = tweened(duration, {
    duration: 1000,
    easing: linear,
  });

  let interval = setInterval(() => {
    if ($time <= 0) {
      clearInterval(interval);
      return;
    }

    $time -= 1000;
  }, 1000);

  $: angle = ($time / duration) * 360;

  $: background = `radial-gradient(rgb(var(--ctp-base)) 60%, transparent 60%),
    conic-gradient(transparent 0deg ${angle}deg, rgb(var(--ctp-crust)) ${angle}deg 360deg),
    rgb(var(--ctp-teal));`;

  $: cssVarStyles = `--background:${background}`;

  $: query = useGetTeaById(id);
  $: isTerminated = $time <= 0;
</script>

{#if $query.isLoading}
  <div class="grid w-full place-items-center">
    <Loader max="100" value="70" class="text-8xl" />
  </div>
{/if}

{#if $query.data}
  <div
    class="relative flex h-full w-full flex-col items-center justify-center gap-16 pt-16"
  >
    <div
      class={clsx('flex max-h-80 max-w-80 items-center justify-center', {
        clock: !isTerminated,
      })}
      style={cssVarStyles}
    >
      <Loader
        max={duration}
        value={duration - $time}
        class={clsx('-translate-y-8 translate-x-5 text-6xl', {
          'animate-preserved-bounce delay-500': isTerminated,
        })}
      />
    </div>
    {#if hasEnableNotifications && !isTerminated}
      <Button on:click={onAskNotification}>
        <Bell />
        <span>Recevoir une notification</span>
      </Button>
    {/if}

    {#if isTerminated}
      <div class="text-center">
        <p class="flex items-center gap-3 text-2xl">
          <Leaf class="text-teal" />
          <span>Votre thé est prêt!</span>
        </p>
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .clock {
    background: var(--background);
    border-radius: 50%;
    aspect-ratio: 1;
    transition: all 500ms ease-in;
    will-change: transform;
  }
</style>
