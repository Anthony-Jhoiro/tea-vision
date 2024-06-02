<script lang="ts">
  import { useRouter } from 'svelte-routing';
  import { useGetTeaById } from '../api';
  import { number } from 'zod';

  const { activeRoute } = useRouter();

  $: teaId = $activeRoute.params['id'];

  const query = useGetTeaById($teaId);
</script>

<pre>
  {JSON.stringify($query, null, 4)}
</pre>
