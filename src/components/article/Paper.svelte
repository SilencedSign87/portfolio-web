<script lang="ts">
    import { onMount, type Snippet } from "svelte";

     type Props = {
        sheet?: string;
        revision?: string;
        referenceWidth?: number;
        class?: string;
        date?: string;
        title?: Snippet;
        children?: Snippet;
    };
    let {
        sheet = "01",
        revision = "A",
        referenceWidth = 800,
        class: className = "",
        date = new Date().toLocaleDateString(),
        title,
        children,
    }: Props = $props();

    let paper: HTMLElement | undefined = $state();
    let width = $state(0);
    let height = $state(0);

    const computedScale = $derived.by(() => {
        if (width <= 0) return null;
        const ratio = Math.max(1, Math.round(height / width));
        return `1:${ratio}`;
    });

    const displayScale = $derived(
        computedScale ? computedScale : "—",
    );

    const displayDimensions = $derived(
        width > 0 && height > 0
            ? `${Math.round(width)} × ${Math.round(height)}`
            : "—",
    );

    onMount(() => {
        if (!paper) return;
        const update = (w: number, h: number) => {
            width = w;
            height = h;
        };
        const rect = paper.getBoundingClientRect();
        update(rect.width, rect.height);
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                update(entry.contentRect.width, entry.contentRect.height);
            }
        });
        observer.observe(paper);
        return () => observer.disconnect();
    });
</script>

<article
    bind:this={paper}
    class="relative max-w-[800px] mx-auto bg-surface-container-lowest border border-ink font-mono text-on-surface {className}"
>
    <header
        class="grid grid-cols-4 max-sm:grid-cols-2 border-b border-ink bg-secondary-container *:px-3.5 *:py-[10px] *:flex *:flex-col *:gap-0.5 *:min-w-0 *:border-r *:border-ink *:last:border-r-0"
    >
        <div>
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Hoja</span>
            <span class="text-sm font-bold text-on-surface">{sheet}</span>
        </div>
        <div class="col-span-2">
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Título</span>
            <span class="font-display text-base tracking-tight whitespace-nowrap truncate font-bold text-on-surface">
                {#if title}{@render title()}{:else}Document{/if}
            </span>
        </div>
        <div>
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Scala</span>
            <span class="text-sm font-bold text-on-surface">{displayScale}</span>
        </div>
        <div>
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Revisión</span>
            <span class="text-sm font-bold text-on-surface">{revision}</span>
        </div>
        <div class="col-span-2">
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Dimensiones</span>
            <span class="font-display text-base tracking-tight whitespace-nowrap truncate font-bold text-on-surface">
                {displayDimensions}
            </span>
        </div>
        <div>
            <span class="text-[10px] uppercase tracking-[0.1em] text-outline">Fecha</span>
            <span class="text-sm font-bold text-on-surface">{date}</span>
        </div>
    </header>

    <div class="dot-grid p-10 pb-14 px-12 max-sm:px-5 max-sm:py-6 max-sm:pb-10">
        {@render children?.()}
    </div>
</article>
