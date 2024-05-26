<script lang="ts">
  import { Button, Drawer } from 'common-svelte';
  import { onMount } from 'svelte';

  // Docs: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;

    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;

    prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>;
  }

  let drawerOpened = false;
  let promptable: Pick<BeforeInstallPromptEvent, 'prompt'> | null = null;

  export let translations: {
    title: string;
    description: string;
    installButton: string;
    dismissButton: string;
  };

  function openDrawer() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    drawerOpened = true;
  }

  async function onConfirm() {
    if (!promptable) {
      return;
    }
    await promptable.prompt();
    close();
  }

  function close() {
    promptable = null;
    drawerOpened = false;
  }

  onMount(() => {
    //@ts-ignore
    if (window.deferredInstallPrompt) {
      //@ts-ignore
      promptable = window.deferredInstallPrompt;
      openDrawer();
    } else {
      window.addEventListener(
        'beforeinstallprompt',
        (event: BeforeInstallPromptEvent) => {
          event.preventDefault();
          promptable = event;
          openDrawer();
        },
      );
    }
  });
</script>

<Drawer.Root bind:open={drawerOpened}>
  <Drawer.Content>
    <div class="container">
      <Drawer.Header>
        <Drawer.Title>{translations.title}</Drawer.Title>
        <Drawer.Description>{translations.description}</Drawer.Description>
      </Drawer.Header>
      <Drawer.Footer>
        <div class="flex gap-5">
          <Drawer.Close asChild={true}>
            <Button class="flex-grow" variant="outline" on:click={close}
              >{translations.dismissButton}</Button
            >
          </Drawer.Close>
          <Button class="flex-grow" on:click={onConfirm}
            >{translations.installButton}</Button
          >
        </div>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
