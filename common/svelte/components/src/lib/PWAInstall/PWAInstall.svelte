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

  function openDrawer() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    drawerOpened = true;
  }

  async function onConfirm() {
    console.log(promptable);
    if (!promptable) {
      return;
    }
    await promptable.prompt();
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
        <Drawer.Title>Voulez-vous installer l'application ?</Drawer.Title>
        <Drawer.Description
          >Une fois installée, vous pourrez accéder à votre application sur
          votre téléphone, sans passer par le site web.</Drawer.Description
        >
      </Drawer.Header>
      <Drawer.Footer>
        <div class="flex gap-5">
          <Drawer.Close asChild={true}>
            <Button class="flex-grow" variant="outline">Non merci</Button>
          </Drawer.Close>
          <Button class="flex-grow" on:click={onConfirm}>Installer</Button>
        </div>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
