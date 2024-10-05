<script>
    import { scaleLinear, scaleOrdinal } from 'd3-scale'; 
    import { schemeCategory10 } from 'd3-scale-chromatic';

    export let data;
    export let x;
    export let y;
    export let color;

    let svg;
    let width = 500;
    let height = 500;
    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    //const colorScale = scaleOrdinal([0, 1], schemeCategory10);


    $: xScale = scaleLinear()
      .domain([Math.min(...data.map(item => item[x])),
               Math.max(...data.map(item => item[x]))])
      .range([40,width-40])
      .nice();
    $: yScale = scaleLinear()
      .domain([Math.min(...data.map(item => item[y])),
               Math.max(...data.map(item => item[y]))])
      .range([height-40, 40])
      .nice();
    $: colorScale = scaleOrdinal()
        .domain([...new Set(Object.values(color))].sort())
        .range(schemeCategory10);
    $: xTicks = xScale.ticks();
    $: yTicks = yScale.ticks();
</script>

<svg bind:this={svg} width={width} height={height}>
    <!-- x axis -->
    <g class="axis x-axis">
        {#each xTicks as tick}
            <g class="tick tick-{tick}" transform="translate({xScale(tick)},{height})">
                <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
                <text y="-2">{tick}</text>
            </g>
        {/each}
    </g>

    <!-- y axis -->
    <g class="axis y-axis" transform="translate(0, {padding.top})">
        {#each yTicks as tick}
            <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                <line x1={padding.left} x2="100%" />
                <text x={padding.left - 8} y="+4">{tick}</text>
            </g>
        {/each}
    </g>

    {#each data as item, index}
        <circle cx={xScale(item[x])} cy={yScale(item[y])} r="5" fill="{colorScale(color[index.toString()])}"/>
    {/each}
</svg>

<!-- <p>
    data: {JSON.stringify(data, null, 2)}<br/>
</p> -->

<style>
    svg {
        background-color: whitesmoke;
    }

    .tick line {
		stroke: #888;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #888;
		text-anchor: start;
	}

    .x-axis .tick text {
		text-anchor: middle;
	}

    .y-axis text {
		text-anchor: end;
	}
</style>