<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import { Button, LoaderWithCircularProgress } from 'common-svelte';
  import { createEventDispatcher } from 'svelte';
  import { Bell, Leaf } from 'lucide-svelte';
  import { t } from '../../i18n';

  export let start: string;
  export let end: string;
  export let hasEnableNotifications: boolean;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const duration = endDate.getTime() - startDate.getTime();

  const remainingTime = tweened(duration, {
    duration: 1000,
    easing: linear,
  });

  let interval = setInterval(() => {
    if ($remainingTime <= 0) {
      clearInterval(interval);
      return;
    }

    $remainingTime -= 1000;
  }, 1000);

  $: isTerminated = $remainingTime <= 0;

  const dispatch = createEventDispatcher<{
    askNotificationPermission: never;
  }>();

  async function onAskNotification() {
    dispatch('askNotificationPermission');
  }
</script>

<div
  class="relative flex h-full w-full flex-col items-center justify-center gap-16 pt-16"
>
  <LoaderWithCircularProgress
    max={duration}
    value={duration - $remainingTime}
    class="max-h-80 max-w-80"
  />

  {#if !hasEnableNotifications && !isTerminated}
    <Button on:click={onAskNotification}>
      <Bell />
      <span>{$t('brewing.notificationPermissionButton')}</span>
    </Button>
  {/if}

  {#if isTerminated}
    <div class="text-center">
      <p class="flex items-center gap-3 text-2xl">
        <Leaf class="text-teal" />
        <span>{$t('brewing.brewingFinished')}</span>
      </p>
    </div>
  {/if}
</div>
