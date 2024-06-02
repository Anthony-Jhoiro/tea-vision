<script lang="ts">
  import { Footer, Loader } from 'common-svelte';
  import { useListTeas } from '../api';
  import { Link } from 'svelte-routing';
  import { t } from '../i18n.ts';

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

<Footer
  leftButton={Link}
  rightButton={Link}
  leftButtonProps={{ to: '/' }}
  rightButtonProps={{ to: '/new' }}
  leftButtonText={$t('home.actions.startClockButton')}
  rightButtonText={$t('home.actions.newTeaButton')}
/>
