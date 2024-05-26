<script lang="ts">
  export let leftButton: ConstructorOfATypedSvelteComponent;
  export let leftButtonProps: any;
  export let leftButtonText: string;

  export let rightButton: ConstructorOfATypedSvelteComponent;
  export let rightButtonProps: any;
  export let rightButtonText: string;
</script>

<div class="flex">
  <div class="flex-grow p-5">
    <svelte:component
      this={leftButton}
      {...leftButtonProps}
      class="bg-peach hover:bg-yellow block w-full rounded-lg px-8 py-3 text-center transition-colors"
    >
      {leftButtonText}
    </svelte:component>
  </div>
  <div class="flex-grow p-5">
    <svelte:component
      this={rightButton}
      {...rightButtonProps}
      class="bg-teal hover:bg-sky block w-full rounded-lg px-8 py-3 text-center transition-colors"
    >
      {rightButtonText}
    </svelte:component>
  </div>
</div>
