<script lang="ts">

    let count: number = 0;
    const increment = () => {
        count += 1;
    };
</script>

<h1 class="text-3xl font-bold underline text-blue-500">Hello World</h1>

<button on:click={increment}>
    count is {count}
</button>
