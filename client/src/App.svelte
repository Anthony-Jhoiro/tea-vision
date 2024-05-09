<script lang="ts">
  import { Header, Footer, Loader } from 'common-svelte';
</script>

<div
  class="macchiato bg-base flex min-h-screen w-full flex-col justify-between"
>
  <Header>
    <a href="/">
      <h1>My Tea Collection</h1>
    </a>
  </Header>

  <div class="flex-grow">
    <Loader max="100" value="100" class="text-6xl">100%</Loader>
  </div>
  <Footer />
</div>
