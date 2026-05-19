<script lang="ts">
    export let title: string;
    export let description: string | null = null;
    export let id: string | null = null;
</script>

<div class="flex items-center justify-center mb-8">
    <slot name="before" />
</div>

<h1 {id} class="text-4xl font-medium text-brand-base mb-4 text-center">
    {title}
    {#if description}
        <small class="text-base mb-8 text-center opacity-80 block text-neutral-700 dark:text-neutral-300 font-normal mt-2">
            {description}
        </small>
    {/if}
</h1>

<div class="flex items-center justify-center mt-8">
    <slot name="after" />
</div>
