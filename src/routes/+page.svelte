<!-- 
 Example on WebWorkers in SvelteKit
 https://github.com/jnsprnw/webworker-sveltekit/blob/main/src/routes/%2Bpage.svelte
 -->
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
</svelte:head>

<script>
    import Scatterplot from "./Scatterplot.svelte";
    import PythonWorker from "./PythonWorker.svelte";
    import Dendrogram from "./Dendrogram.svelte";

    // stores the page data loaded in +page.js
    // this will be the python script
    export let data;

    let pythonResultPromise;
</script>


<h1 class="title">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<section class="section">
    {#await pythonResultPromise}
        Waiting for computation results.
    {:then results} 
        {#if results?.data}
            <div class="grid">
                <div class="cell">
                    <Scatterplot data={results.data} x="0" y="1" color={results.labels} />   
                </div>
                <div class="cell">
                    <Dendrogram distances={results.distances} children={results.children} />
                </div>
            </div>
        {:else}
            results has no data {JSON.stringify(results, null, 2)}        
        {/if}
    {/await}
</section>

<PythonWorker script={data.script} bind:resultPromise={pythonResultPromise} />
