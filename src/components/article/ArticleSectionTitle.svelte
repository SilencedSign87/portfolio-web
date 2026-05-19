<script lang="ts">
    let {
        title = "",
        description = null,
        id = null,
        position = "left",
    }: {
        title: string;
        description?: string | null;
        id?: string | null;
        position?: "left" | "center" | "right";
    } = $props();
</script>

<div class="mt-10 mb-4">
    <h2
        {id}
        class="text-2xl font-bold text-brand-base"
        class:text-center={position === "center"}
        class:text-right={position === "right"}
    >
        {title}
        {#if description}
            <small class="block text-sm italic font-normal text-neutral-600 dark:text-neutral-400 mt-1">
                {description}
            </small>
        {/if}
    </h2>
    <hr class="mt-2 border-neutral-300 dark:border-neutral-600" />
</div>

