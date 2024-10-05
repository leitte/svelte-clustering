<!-- Example on WebWorkers in SvelteKit
 https://github.com/jnsprnw/webworker-sveltekit/blob/main/src/routes/%2Bpage.svelte
 -->
<svelte:head>
<!-- 	<script src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"></script>
 -->    
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
</svelte:head>

<script>
    import PythonWorker from "./PythonWorker.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    // stores the page data loaded in +page.js
    // this will be the python script
    export let data;
    // variable to store the result from the script
    let python_result;


</script>

<h1 class="title">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<section class="section">
    {#await python_result}
        Waiting for computation results.
    {:then results} 
        <!-- {#if results?.data}
            {JSON.stringify(results, null, 2)}
        {/if} -->
        
        {#if results?.data}
            <Scatterplot data={results.data} x="0" y="1" color={results.labels} />            
        {/if}
    {/await}
</section>

<section class="section">
    <PythonWorker script={data.script} bind:result={python_result} />
</section>
