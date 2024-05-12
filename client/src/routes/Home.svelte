<script>
  import { Loader } from 'common-svelte';
  import { useListTeas } from '../api';

  const getTeasQuery = useListTeas();
</script>

{#if $getTeasQuery.isLoading}
  <div class="grid w-full place-items-center">
    <Loader max="100" value="70" class="text-8xl" />
  </div>
{/if}

{#if $getTeasQuery.data}
  <pre>
    {JSON.stringify($getTeasQuery.data, null, 2)}
  </pre>
{/if}
