<script lang="ts">
  import { Button } from 'common-svelte';
  import type { Tea } from 'domains';
  import { Link } from 'svelte-routing';
  import { Plus } from 'lucide-svelte';
  import TeaCard, { teaVariants } from './TeaCard.svelte';

  export let teas: Tea[];
</script>

<section class="flex flex-col gap-5 p-5">
  {#each teas as tea}
    <Link to={`/teas/${tea.id}`}>
      <TeaCard {tea} />
    </Link>
  {/each}
</section>

<div class="fixed bottom-5 right-5">
  <Link to="/new">
    <Button size="iconLg">
      <Plus />
    </Button>
  </Link>
</div>
