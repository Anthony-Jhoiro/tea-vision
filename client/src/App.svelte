<script context="module">
  const LAST_PWA_DISMISS_KEY = 'lastPwaDismiss';
  const PWA_DISMISS_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days
</script>

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
  import { onMount } from 'svelte';

  export let url = '';

  const queryClient = new QueryClient();

  let shouldShowPWAInstall = false;

  onMount(() => {
    const lastPWADismiss = localStorage.getItem(LAST_PWA_DISMISS_KEY);
    if (!lastPWADismiss) {
      shouldShowPWAInstall = true;
      return;
    }
    const lastPWADismissDate = new Date(lastPWADismiss);
    const now = new Date();
    if (now.getTime() - lastPWADismissDate.getTime() > PWA_DISMISS_DURATION) {
      shouldShowPWAInstall = true;
    }
  });

  function onPWAInstallOpenChange(ev: CustomEvent<boolean>) {
    if (!ev.detail) {
      localStorage.setItem(LAST_PWA_DISMISS_KEY, new Date().toISOString());
    }
  }
</script>

<QueryClientProvider client={queryClient}>
  {#if shouldShowPWAInstall}
    <PWAInstall
      translations={{
        title: $t('pwa_install.title'),
        description: $t('pwa_install.description'),
        installButton: $t('pwa_install.installButton'),
        dismissButton: $t('pwa_install.dismissButton'),
      }}
      on:openChange={onPWAInstallOpenChange}
    />
  {/if}
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
