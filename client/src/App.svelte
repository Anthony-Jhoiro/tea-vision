<script lang="ts">
  import { Header, Footer, PWAInstall } from 'common-svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import New from './routes/New.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { t } from './i18n';

  export let url = '';

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <PWAInstall
    translations={{
      title: $t('pwa_install.title'),
      description: $t('pwa_install.description'),
      installButton: $t('pwa_install.installButton'),
      dismissButton: $t('pwa_install.dismissButton'),
    }}
  />
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
        <Route path="/">
          <Home />
        </Route>
      </main>
      <Footer
        leftButton={Link}
        rightButton={Link}
        leftButtonProps={{ to: '/' }}
        rightButtonProps={{ to: '/new' }}
        leftButtonText={$t('home.actions.startClockButton')}
        rightButtonText={$t('home.actions.newTeaButton')}
      />
    </div>
  </Router>
</QueryClientProvider>
