<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { SvelteComponent } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    navigator.mediaDevices.getUserMedia({
      video: true,
    });
  }

  export let leftButton: ConstructorOfATypedSvelteComponent;
  export let leftButtonProps: any;

  export let rightButton: ConstructorOfATypedSvelteComponent;
  export let rightButtonProps: any;
</script>

<div class="flex">
  <div class="flex-grow p-5">
    <svelte:component
      this={leftButton}
      {...leftButtonProps}
      class="bg-peach hover:bg-yellow block w-full rounded-lg px-8 py-3 text-center transition-colors"
    >
      Start clock
    </svelte:component>
  </div>
  <div class="flex-grow p-5">
    <svelte:component
      this={rightButton}
      {...rightButtonProps}
      class="bg-teal hover:bg-sky block w-full rounded-lg px-8 py-3 text-center transition-colors"
    >
      Register new tea
    </svelte:component>
  </div>
</div>
