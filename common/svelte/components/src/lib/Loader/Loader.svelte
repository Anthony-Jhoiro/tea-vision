<script lang="ts">
  import type { HTMLProgressAttributes } from 'svelte/elements';

  interface $$Props extends HTMLProgressAttributes {}

  let className: HTMLProgressAttributes['class'];

  $: {
    className = $$props['class'];
  }
</script>

<div class="mug-container {className}">
  <div class="mug">
    <div class="mug-content">
      <div class="tea-progress-container">
        <progress {...$$restProps} class="tea-progress">
          <slot />
        </progress>
      </div>

      <div class="eye left-eye">
        <div class="inner-eye"></div>
        <div class="eye-sparkle"></div>
      </div>
      <div class="eye right-eye">
        <div class="inner-eye"></div>
        <div class="eye-sparkle"></div>
      </div>
      <div class="mouth"></div>
      <div class="cheek left-cheek"></div>
      <div class="cheek right-cheek"></div>
    </div>

    <div class="steam steam-1"></div>
    <div class="steam steam-2"></div>
    <div class="steam steam-3"></div>
  </div>
  <div class="handle"></div>
</div>

<style lang="postcss">
  .mug-container {
    position: relative;
    height: 4em;
    width: 4em;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    --cup-border: rgb(var(--ctp-mantle));
    --cheeks: rgb(var(--ctp-maroon));
    --tea-content: rgb(var(--ctp-rosewater));
    --smoke: rgb(var(--ctp-text));
  }

  /* mug, handle*/
  .mug {
    position: relative;
    height: 2em;
    width: 1.75em;
  }

  .mug-content {
    height: 100%;
    width: 100%;
    /*background: var(--tea-content);*/
    border-radius: 0.1em 0.1em 0.45em 0.45em;
    border: 0.2em solid var(--cup-border);
    z-index: 1;
    position: relative;
    overflow: hidden;
  }

  .tea-progress-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .tea-progress {
    width: 1.6em;
    height: 100%;
    transform: rotate(-90deg);
    background: transparent;
  }

  .tea-progress::-moz-progress-bar {
    background: var(--tea-content);
  }

  .tea-progress::-webkit-progress-value {
    background: var(--tea-content);
  }

  .tea-progress::-webkit-progress-bar {
    background: transparent;
  }

  .tea-progress[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
  }

  .tea-progress[value]::-moz-progress-bar {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .handle {
    background: transparent;
    transform: translateX(-0.2em) translateY(50%);
    height: 0.75em;
    width: 0.75em;
    border-radius: 40%;
    border: 0.2em solid var(--cup-border);
    margin-bottom: 1em;
  }

  /* cute lil face */
  .eye {
    position: absolute;
    background: var(--cup-border);
    height: 0.25em;
    width: 0.25em;
    top: 0.85em;
    border-radius: 50%;
    z-index: 1;
  }

  .left-eye {
    left: 0.3em;
  }

  .right-eye {
    right: 0.3em;
  }

  .inner-eye {
    position: absolute;
    background: var(--smoke);
    height: 0.1em;
    width: 0.1em;
    top: 0.05em;
    left: 0.1em;
    border-radius: 50%;
  }

  .eye-sparkle {
    position: absolute;
    background: var(--smoke);
    height: 0.05em;
    width: 0.05em;
    bottom: 0.05em;
    left: 0.05em;
    border-radius: 50%;
    z-index: 0;
  }

  .mouth {
    position: absolute;
    background: transparent;
    height: 0.2em;
    width: 0.3em;
    top: 1em;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 0.05em solid transparent;
    border-bottom-color: var(--cup-border);
  }

  .cheek {
    position: absolute;
    background: var(--cheeks);
    height: 0.1em;
    width: 0.25em;
    top: 1.08em;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px var(--cheeks);
  }

  .left-cheek {
    left: 0.2em;
  }

  .right-cheek {
    right: 0.2em;
  }

  /* steam */
  .steam {
    border-radius: 50%;
    background: var(--smoke);
    display: block;
    position: absolute;
  }

  @keyframes steam {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 100%;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: 100%;
    }
    100% {
      opacity: 0;
      top: -2em;
    }
  }

  .steam-1 {
    height: 0.4em;
    width: 0.4em;
    top: 0;
    left: 20%;
    animation: 4s ease-in infinite steam;
  }

  .steam-2 {
    height: 0.2em;
    width: 0.2em;
    top: 0;
    left: 40%;
    animation: 3s ease-in 500ms infinite steam;
  }

  .steam-3 {
    height: 0.6em;
    width: 0.6em;
    top: 0;
    left: 50%;
    animation: 4s ease-in 1s infinite steam;
  }
</style>
