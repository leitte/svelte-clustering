<!-- 
- Layout template for dashboard:
https://codepen.io/guamacherox/pen/RJWVdN
- padding and margin need to be set using
different notation
https://bulma.io/documentation/helpers/spacing-helpers/
-->

<script>
    import Sidebar from "./Sidebar.svelte";

    export let data;
</script>

<div class="section is-paddingless has-background-light">
    <div class="columns">
        <!-- Header -->
        <div class="column">
            <div class="header">
                <h1 class="Title">Hello World</h1>
            </div>
        </div>
    </div>
</div>
<div class="section p-0">
    <div class="columns m-0">
        <!-- Sidebar -->
        <div class="column is-one-quarter">
            <Sidebar script="print(5)"/>
        </div>

        <!-- Main area -->
        <div class="column">
            <div class="block">
                <slot />
            </div>
        </div>
    </div>
</div>

<style>
    .is-paddingless-2 {
        
    }
</style>

