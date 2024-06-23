<script lang="ts">
  import { Loader } from 'common-svelte';
  import { useListTeas } from '../services/storage';
  import HomePage from '../pages/HomePage/HomePage.svelte';

  $: getTeasQuery = useListTeas();
</script>

{#if $getTeasQuery.isLoading}
  <div class="grid w-full place-items-center">
    <Loader max="100" value="70" class="text-8xl" />
  </div>
{/if}

{#if $getTeasQuery.data}
  <HomePage teas={$getTeasQuery.data} />
{/if}
