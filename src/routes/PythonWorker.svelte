<script>
    import { onDestroy, onMount } from "svelte";

    export let script;
    export let result;

    let worker;
    let id;
    let callbacks = {};

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
                result = data.results;
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
        if (script) {
            result = runPythonAsync(script);
        }
    });

    onDestroy(() => {
        terminateWorker();
    });
</script>

<button class="button">Run code</button>