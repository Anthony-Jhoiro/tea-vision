<script lang="ts">
  import { Footer, Loader } from 'common-svelte';
  import { Link } from 'svelte-routing';
  import { t } from '../i18n.ts';
  import { useListTeas } from '../services/storage';

  $: getTeasQuery = useListTeas();
</script>

{#if $getTeasQuery.isLoading}
  <div class="grid w-full place-items-center">
    <Loader max="100" value="70" class="text-8xl" />
  </div>
{/if}

{#if $getTeasQuery.data}
  <ul>
    {#each $getTeasQuery.data as tea}
      <li>
        <Link to="/teas/{tea.id}">{tea.name}</Link>
      </li>
    {/each}
  </ul>
{/if}

<Footer
  leftButton={Link}
  rightButton={Link}
  leftButtonProps={{ to: '/' }}
  rightButtonProps={{ to: '/new' }}
  leftButtonText={$t('home.actions.startClockButton')}
  rightButtonText={$t('home.actions.newTeaButton')}
/>
