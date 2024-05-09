<script lang="ts">
  import { Header, Footer } from 'common-svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import New from './routes/New.svelte';

  export let url = '';
</script>

<Router {url}>
  <div
    class="macchiato bg-base flex min-h-screen w-full flex-col justify-between"
  >
    <Header>
      <Link to="/">
        <h1>My Tea Collection</h1>
      </Link>
    </Header>

    <div class="flex-grow">
      <Route path="/new" component={New} />
      <Route path="/"><Home /></Route>
    </div>
    <Footer
      leftButton={Link}
      rightButton={Link}
      leftButtonProps={{ to: '/' }}
      rightButtonProps={{ to: '/new' }}
    />
  </div>
</Router>
