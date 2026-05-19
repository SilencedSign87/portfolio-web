<script lang="ts">
    export let className: string = "";
</script>

<div
    class="font-serif mx-auto max-w-3xl bg-neutral-50 dark:bg-neutral-800/80 shadow-lg shadow-neutral-300/50 dark:shadow-neutral-950/80 border border-neutral-200 dark:border-neutral-700 px-8 py-10 {className}"
>
    <slot />
</div>
