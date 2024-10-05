<script>
    import { stratify } from 'd3-hierarchy'; 

    export let children;
    export let distances;

    /* $: tree = stratify()
        .id((d,i) => d['0'].toString())
        .parentId((d,i) => i.toString())
        (children); */
</script>

<svg>

</svg>

<!-- {JSON.stringify(tree, null, 2)} -->
{JSON.stringify(children, null, 2)}

<style>
    svg {
        background-color: whitesmoke;
    }
</style>