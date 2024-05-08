<script lang="ts">
    import {ButtonCard} from "common-svelte";

    let count: number = 0;
    const increment = () => {
        count += 1;
    };
</script>


<div class="macchiato bg-base">

    <h1 class="text-3xl font-bold underline text-blue-500">Hello World</h1>

    <button on:click={increment}>
        count is {count}
    </button>

    <ButtonCard>
        Hello World
    </ButtonCard>

</div>
