<script lang="ts">
    export let title: string;
    export let description: string | null = null;
    export let id: string | null = null;
</script>

<div class="mb-6">
    <slot name="before" />
</div>

<h1 {id} class="text-4xl font-bold text-brand-base text-center leading-tight">
    {title}
    {#if description}
        <small class="block text-base italic font-normal text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            {description}
        </small>
    {/if}
</h1>

<hr class="mx-auto mt-6 w-20 border-brand-base/60" />

<div class="flex items-center justify-center mt-8">
    <slot name="after" />
</div>
