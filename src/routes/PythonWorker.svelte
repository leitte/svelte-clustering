<script>
    import { onDestroy, onMount } from "svelte";
    import { n_clusters, metric, requestComputation, linkage } from "./stores";

    export let script;
    export let parameters = {};
    export let resultPromise;

    let worker;
    let id = 0;
    let callbacks = {};

    $: $requestComputation && runCode();

    async function initWorker() {
        if (window.Worker) {
            // init the pyodide worker
            worker = new Worker("pyodide-worker.js");
            // define how to handle finished worker
            worker.onmessage = (event) => {
                const { id, ...data } = event.data;
                const onSuccess = callbacks[id];
                delete callbacks[id];
                onSuccess(data);
                resultPromise = data.results;
            };
        }
    }

    function terminateWorker() {
        if (worker) {
            worker.terminate();
        }
    }

    function runPythonAsync( script, context={} ) {
        id = (id + 1) % Number.MAX_SAFE_INTEGER;
        return new Promise((onSuccess) => {
            callbacks[id] = onSuccess;
            worker.postMessage({
                ...context,
                python: script,
                id
            });
        });
    }

    onMount(async () => {
        initWorker();
        runCode();
    });

    onDestroy(() => {
        terminateWorker();
    });

    function runCode() {
        if (script) {
            const parametersLocal = {
                n_clusters: $n_clusters,
                metric: $metric,
                linkage: $linkage
            }
            parameters = parametersLocal;
            resultPromise = runPythonAsync(script, parametersLocal);
        }
    }
</script>

<div class="block">
    {JSON.stringify(parameters, null, 2)}
</div>
