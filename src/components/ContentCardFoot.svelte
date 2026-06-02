<script lang="ts">
    type Props = {
        tags?: string[];
        sheets?: number;
        class?: string;
    };

    let {
        tags = [],
        sheets = 0,
        class: className = "",
    }: Props = $props();
</script>

<footer class="flex items-center justify-between px-4 py-3 gap-3 {className}">
    {#if tags.length > 0}
        <ul class="flex flex-wrap gap-1.5 list-none m-0 p-0">
            {#each tags as tag (tag)}
                <li class="font-mono text-[10px] uppercase tracking-wider text-ink inline-flex items-center gap-[3px]">
                    <span class="text-ink">+</span>
                    {tag}
                </li>
            {/each}
        </ul>
    {/if}
    {#if sheets > 0}
        <span class="font-mono text-[11px] text-outline whitespace-nowrap">
            {sheets} §§
        </span>
    {/if}
</footer>
