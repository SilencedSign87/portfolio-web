<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
    };

    let {
        class: className = "",
        children,
    }: Props = $props();
</script>

{#if children}
    <div class="bg-secondary-container border-b border-outline-variant {className}">
        {@render children()}
    </div>
{/if}
