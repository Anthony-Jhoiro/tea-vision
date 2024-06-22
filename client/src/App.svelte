<script lang="ts">
  import { Header, Footer, PWAInstall } from 'common-svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import New from './routes/New.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { t } from './i18n';
  import Brewing from './routes/Brewing.svelte';
  import Timer from './routes/Timer.svelte';
  import Logo from './components/Logo.svelte';

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
          <h1 class="flex items-center gap-3">
            <span class="inline-block text-4xl">
              <Logo />
            </span>
            My Tea Collection
          </h1>
        </Link>
      </Header>

      <main class="flex flex-grow flex-col items-stretch py-5">
        <Route path="/new" component={New} />
        <Route path="/" component={Home} />
        <Route path="/teas/:id" component={Brewing} />
        <Route path="/teas/:id/timer" component={Timer} />
      </main>
    </div>
  </Router>
</QueryClientProvider>
