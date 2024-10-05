<div class="hero is-fullheight">
    <div class="hero-body">
        <div class="columns is-fullheight">
            <!-- Sidebar -->
            <div class="column is-one-quarter has-background-light is-fullheight">
                <div class="field">
                    <label class="label is-small">Number of clusters</label>
                    <div class="control">
                        <input class="input is-small" type="number" placeholder="Normal input" />
                    </div>
                </div>

            </div>
    
            <!-- Main area -->
            <div class="column">
                <section class="section">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</div>