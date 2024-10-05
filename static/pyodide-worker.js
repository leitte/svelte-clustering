// documentation from pyodide
// https://pyodide.org/en/stable/usage/webworker.html

importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");

async function initPyodide() {
    // init pyodide
    self.pyodide = await loadPyodide();
}

let pyodideReadyPromise = initPyodide();

self.onmessage = async (event) => {
    await pyodideReadyPromise;

    const { id, python, ...context } = event.data;
    for (const key of Object.keys(context)) {
        self[key] = context[key];
    }
    try {
        await self.pyodide.loadPackagesFromImports(python);
        let results = await self.pyodide.runPythonAsync(python);
        let resultsTmp = self.pyodide.globals.get('results');
        if ( resultsTmp ) {
            results = resultsTmp.toJs({dict_converter : Object.fromEntries});
            resultsTmp.destroy();
        }
        self.postMessage({ results, id });
    } catch (error) {
        self.postMessage({ error: error.message, id });
    }
}