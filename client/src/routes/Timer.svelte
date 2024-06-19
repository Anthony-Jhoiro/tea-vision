<script lang="ts">
  import { onMount } from 'svelte';
  import TimerPage from '../pages/TimerPage/TimerPage.svelte';

  const defaultDurationInMilliseconds = 4 * 60 * 1000;

  export let start: string = new Date().toISOString();
  export let end: string = new Date(
    new Date().getTime() + defaultDurationInMilliseconds,
  ).toISOString();

  let hasEnableNotifications = true;

  onMount(async () => {
    const sw = await navigator.serviceWorker.ready;
    sw.active.postMessage({
      type: 'timer',
      notifyAt: new Date(end).toISOString(),
    });
    hasEnableNotifications = Notification.permission === 'granted';
  });

  async function onAskNotification() {
    const permissionResult = await Notification.requestPermission();
    if (permissionResult === 'granted') {
      hasEnableNotifications = true;
    }
  }
</script>

<TimerPage
  {start}
  {end}
  {hasEnableNotifications}
  on:askNotificationPermission={onAskNotification}
/>
