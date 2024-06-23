<script lang="ts" context="module">
  import type { Tea } from 'domains';

  export const teaVariants: Record<Tea['type'], string> = {
    black_tea: 'text-blue',
    white_tea: 'text-sky',
    green_tea: 'text-green',
    rooibos: 'text-marroon',
    herbal_tea: 'text-yellow',
  };
</script>

<script lang="ts">
  import clsx from 'clsx';
  import { Leaf } from 'lucide-svelte';
  import { HorizontalCard } from 'common-svelte';

  export let tea: Tea;
</script>

<HorizontalCard illustration={tea.imageUrl} class="rounded-md">
  <h3 slot="title" class="flex items-center gap-3">
    <Leaf
      data-testid="tea-type-icon"
      class={clsx(teaVariants[tea.type], 'text-teal inline-block')}
    />
    {tea.name}
  </h3>
</HorizontalCard>
