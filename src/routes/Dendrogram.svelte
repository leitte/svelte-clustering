<script>
    import { stratify, cluster } from 'd3-hierarchy'; 

    export let children;
    export let distances;

    let tree;

    const width = 400;
    const height = 500;
    const dx = 4;
    const layout = cluster().nodeSize([dx,dx]);

    let x0 = Infinity;
    let x1 = -Infinity;

    $: {
        const nSamples = children.length;
        console.log("nSamples:", nSamples);
        tree = [{parent: "", child: nSamples * 2},
        ...children.flatMap((item, index) => [
            { parent: nSamples + index + 1, child: item["0"] },
            { parent: nSamples + index + 1, child: item["1"] }
        ])];
    }
    $: root = stratify()
        .id((d) => d.child.toString())
        .parentId((d) => d.parent.toString())
        (tree);

    $: {
        const dy = height / (root.height + 1);
        layout.nodeSize([dx,dy*2]);
        layout(root);
        console.log("px", root);
        root.each(d => {
            if (d.x < x0) x0 = d.x;
            if (d.x > x1) x1 = d.x;
        });
        console.log(root.links());
    }
</script>

{x0} {x1}
<svg width="{width}" height="{height}" viewBox="{x0-10} {-20} {width*3} {height}">
    {#each root.links() as {source, target}}
        <circle r="5" cx="{source.x}" cy="{source.y}" />
        <circle r="8" cx="{target.x}" cy="{target.y}" fill="orange" />
    {/each}
</svg>

<!-- {JSON.stringify(tree, null, 2)} -->
<!-- {JSON.stringify(root, null, 2)} -->

<style>
    svg {
        background-color: whitesmoke;
    }
</style>