<script lang="ts">
  import { Header, Footer } from 'common-svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import New from './routes/New.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  export let url = '';

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Router {url}>
    <div
      class="macchiato bg-base dark flex min-h-screen w-full flex-col justify-between"
    >
      <Header>
        <Link to="/">
          <h1>My Tea Collection</h1>
        </Link>
      </Header>

      <main class="flex-grow py-5">
        <Route path="/new" component={New} />
        <Route path="/"><Home /></Route>
      </main>
      <Footer
        leftButton={Link}
        rightButton={Link}
        leftButtonProps={{ to: '/' }}
        rightButtonProps={{ to: '/new' }}
      />
    </div>
  </Router>
</QueryClientProvider>
