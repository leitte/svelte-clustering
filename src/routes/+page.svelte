<svelte:head>
	<script src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import { scaleLinear } from 'd3-scale';

    let pyodide;
    let python_result;
    let data;


    onMount(async () => {
        pyodide = await loadPyodide();

        const response = await fetch('hello_world.py');
        const python_code = await response.text();
        console.log("have code", python_code)

        await pyodide.loadPackagesFromImports(python_code);

        await pyodide.runPythonAsync(python_code);
        python_result = pyodide.globals.get('result').toJs({dict_converter : Object.fromEntries});
        let dataTmp = pyodide.globals.get('X').toJs();
        let labels = pyodide.globals.get('labels').toJs();
        dataTmp.forEach((element, index) => {
            element.label = labels[index];
        });
        data = dataTmp;
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if pyodide}
    pyodide loaded {pyodide}<br>

    result {python_result}<br/>
{:else}
    Waiting for python to load.
{/if}

{#if data}
    <Scatterplot data={data} x="0" y="1" />
{/if}
