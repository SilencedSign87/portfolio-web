<script lang="ts">
    type Props = {
        numeration?: string;
        subtitle?: string;
        title: string;
        description?: string;
        class?: string;
    };

    let {
        numeration = "",
        subtitle = "",
        title,
        description = "",
        class: className = "",
    }: Props = $props();
</script>

<header class="max-w-[60ch] mb-14 {className}">
    {#if numeration || subtitle}
        <div class="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-outline mb-5">
            {#if numeration}<span>{numeration}</span>{/if}
            {#if numeration && subtitle}<span class="opacity-40">·</span>{/if}
            {#if subtitle}<span>{subtitle}</span>{/if}
        </div>
    {/if}
    {#if title}
        <h1 class="headline-lg-mobile headline-lg text-ink mb-6">
            {@html title}
        </h1>
    {/if}
    {#if description}
        <p class="font-mono text-sm leading-relaxed text-on-surface-variant">
            {description}
        </p>
    {/if}
</header>
