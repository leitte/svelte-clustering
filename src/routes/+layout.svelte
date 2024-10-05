<script>
    import Sidebar from "./Sidebar.svelte";

    export let data;
</script>

<!-- <div class="hero is-fullheight">
    <div class="hero-body"> -->
        <div class="columns is-fullwidth">
            <!-- Sidebar -->
            <div class="column is-one-quarter has-background-light">
                <div class="block">
                    <Sidebar script="print(5)"/>
                </div>
            </div>
    
            <!-- Main area -->
            <div class="column">
                <div class="block">
                    <slot />
                </div>
            </div>
        </div>
<!--     </div>
</div> -->