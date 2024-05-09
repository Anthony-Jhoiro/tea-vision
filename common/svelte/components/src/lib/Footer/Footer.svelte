<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    navigator.mediaDevices.getUserMedia({
      video: true,
    });
  }
</script>

<div class="flex">
  <div class="flex-grow p-5">
    <button
      class="bg-peach hover:bg-yellow w-full rounded-lg px-8 py-3 transition-colors"
      >Start clock</button
    >
  </div>
  <div class="flex-grow p-5">
    <button
      class="bg-teal hover:bg-sky w-full rounded-lg px-8 py-3 transition-colors"
      on:click={sayHello}
      >Register new tea
    </button>
  </div>
</div>
