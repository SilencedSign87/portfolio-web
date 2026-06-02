<script lang="ts">
    type Props = {
        number?: string;
        date?: string;
        class?: string;
    };

    let {
        number = "",
        date = "",
        class: className = "",
    }: Props = $props();
</script>

<header class="flex items-center justify-between px-3.5 py-[10px] bg-secondary-container border-b border-outline-variant font-mono text-xs uppercase tracking-wider {className}">
    <span class="inline-flex items-baseline gap-1 font-bold text-ink">
        <span class="opacity-50">№</span>
        {number}
    </span>
    <span class="text-on-secondary-container opacity-70">{date}</span>
</header>
