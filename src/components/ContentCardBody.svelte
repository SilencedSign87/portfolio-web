<script lang="ts">
    type Props = {
        title?: string;
        topic?: string;
        class?: string;
    };

    let {
        title = "",
        topic = "",
        class: className = "",
    }: Props = $props();
</script>

<div class="w-full p-5 pb-4 flex-1 border-b border-outline-variant overflow-hidden grid gap-0.5 {className}">
    {#if title}
        <h2 class="font-display text-[22px] leading-[1.15] tracking-tight font-bold text-ink mb-2 text-center text-pretty truncate">
            {title}
        </h2>
    {/if}
    {#if topic}
        <p class="font-mono text-sm leading-relaxed text-on-surface-variant m-0 text-center text-pretty">
            {topic}
        </p>
    {/if}
</div>
