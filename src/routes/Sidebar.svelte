<script>
    import { n_clusters, metric, linkage, requestComputation } from "./stores";

    export let script;

    const parametersDefault = {
        n_clusters: 3
    }

</script>

<aside class="sidebar">
    <p class="menu-label">Clustering</p>
    <!-- Number of cluster -->
    <div class="field">
        <label class="label is-small">Number of clusters</label>
        <div class="control">
            <input class="input is-small" type="number" placeholder="3" bind:value={$n_clusters}/>
        </div>
    </div>
    <!-- Metric -->
    <div class="field">
        <label class="label is-small">Distance metric</label>
        <div class="select is-small is-fullwidth">
            <select bind:value={$metric}>
                <option>euclidean</option>
                {#if $linkage !== 'ward'}
                    <option>manhattan</option>
                    <option>cosine</option>
                {/if}
            </select>
        </div>
    </div>
    <!-- Linkage criterion -->
    <div class="field">
        <label class="label is-small">Linkage criterion</label>
        <div class="select is-small is-fullwidth">
            <select bind:value={$linkage}>
                <option>ward</option>
                <option>complete</option>
                <option>average</option>
                <option>single</option>
            </select>
        </div>
    </div>

    <p class="menu-label">Scatterplot</p>
    <button class="button is-primary is-small is-fullwidth" on:click={() => requestComputation.update((n) => (n + 1) % Number.MAX_SAFE_INTEGER)}>Update clustering</button>
    <slot />
</aside>