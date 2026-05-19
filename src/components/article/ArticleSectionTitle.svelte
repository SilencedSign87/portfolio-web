<script lang="ts">
    export let title: string;
    export let description: string | null = null;
    export let id: string | null = null;
</script>

<div class="grid grid-cols-[auto_2rem_1fr] mb-8">
    <div class="flex items-center justify-start text-brand-base">
        <slot name="before" />
        <h2 {id} class="text-2xl font-medium">
            {title}
            {#if description}
                <small class="text-base mb-8 text-center opacity-80 text-neutral-700 dark:text-neutral-300">
                    {description}
                </small>
            {/if}
        </h2>
    </div>

    <div></div>

    <div class="place-content-center-safe">
        <div class="h-0.75 bg-brand-base rounded-full translate-y-1"></div>
    </div>
</div>
