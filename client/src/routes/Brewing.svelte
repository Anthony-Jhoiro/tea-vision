<script lang="ts">
  import { useRouter } from 'svelte-routing';
  import { useGetTeaById } from '../api';
  import { Loader } from 'common-svelte';
  import BrewingPage from '../pages/BrewingPage/BrewingPage.svelte';
  import { t } from '../i18n';

  const { activeRoute } = useRouter();
  const query = useGetTeaById($activeRoute.params['id']);

  $: teaId = $activeRoute.params['id'];
</script>

{#if $query.isLoading}
  <div class="grid w-full place-items-center">
    <Loader max="100" value="70" class="text-8xl" />
  </div>
{/if}

{#if $query.data}
  <BrewingPage
    tea={$query.data}
    brandLogo={'https://serpapi.com/searches/665a25d62e7d6be4eb21fc64/images/ed9f613376e2dda8115e37bd9f2e58610642b8393b1c15a5ab93dae33aadd5ce.jpeg'}
    buttonText={$t('brewing.startBrewing')}
  />
{/if}

{#if $query.error}
  <div class="grid w-full place-items-center">
    <p class="text-maroon text-center">{$query.error.message}</p>
  </div>
{/if}
