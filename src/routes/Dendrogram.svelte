<script>
    import { onMount } from 'svelte';
    import { stratify, cluster } from 'd3-hierarchy'; 
    import { scaleLinear } from 'd3-scale'; 

    export let children;
    export let distances;

    let svg;

    let tree;
    let nSamples;

    let width = 400;
    let height = 400;
    const padding = { top: 20, right: 15, bottom: 25, left: 35 };

    const dx = 1;
    const layout = cluster().nodeSize([dx,dx]);

    let x0 = Infinity;
    let x1 = -Infinity;
    let xScale = scaleLinear().range([40,width-40]);
    let yScale = scaleLinear();

    $: yScale = yScale
        .domain([0, Math.max(...distances)])
        .range([height-40,40]);
    $: yTicks = yScale.ticks();
    $: {
        nSamples = children.length;
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
        root.each(d => {
            if (d.x < x0) x0 = d.x;
            if (d.x > x1) x1 = d.x;
        });
        xScale.domain([x0, x1]);
        updatePositions(root);
        console.log("px", root);

        console.log(root.links());
    }

    function updatePositions(root) {
        root.each(d => {
            d.x = xScale(d.x);
            if (d.id > nSamples) {
                d.y = yScale(distances[Number(d.id) - (nSamples+1)]);
            } else {
                d.y = yScale(0)
            }
        })
    }

    /* onMount(resize);

    function resize() {
        ({ width, height } = svg.getBoundingClientRect());
        console.log("size dendrogram", width, height)
    } */
</script>

<svg width="{width}" height="{height}" bind:this={svg}>
    <!-- y axis -->
    {#if yTicks}
        <g class="axis y-axis" transform="translate(0, {padding.top})">
            {#each yTicks as tick}
                <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                    <line x1={padding.left} x2="100%" stroke="#ccc"/>
                    <text x={padding.left - 8} y="+4">{tick}</text>
                </g>
            {/each}
        </g>
    {/if}
    
    {#each root.links() as {source, target}}
        <circle r="5" cx="{source.x}" cy="{source.y}" fill="orange"/>
        <circle r="5" cx="{target.x}" cy="{target.y}" fill="black" />
        <path d="M{source.x} {source.y} H{target.x} V{target.y}" fill="transparent" stroke="black"/>
    {/each}
</svg>

{JSON.stringify(yTicks)}<br>
{x0} {x1}

<!-- {JSON.stringify(tree, null, 2)} -->
<!-- {JSON.stringify(root, null, 2)} -->

<style>
    svg {
        background-color: whitesmoke;
    }
</style>