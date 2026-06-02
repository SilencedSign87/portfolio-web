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
        // Initial measure
        const rect = paper.getBoundingClientRect();
        update(rect.width, rect.height);
        // Watch for resize
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                update(entry.contentRect.width, entry.contentRect.height);
            }
        });
        observer.observe(paper);
        return () => observer.disconnect();
    });
</script>

<article bind:this={paper} class="paper {className}">
    <header class="paper__titleblock">
        <div class="paper__titleblock-cell">
            <span class="paper__titleblock-label">Hoja</span>
            <span class="paper__titleblock-value">{sheet}</span>
        </div>
        <div class="paper__titleblock-cell paper__titleblock-cell--wide">
            <span class="paper__titleblock-label">Título</span>
            <span
                class="paper__titleblock-value paper__titleblock-value--title"
            >
                {#if title}{@render title()}{:else}Document{/if}
            </span>
        </div>
        <div class="paper__titleblock-cell">
            <span class="paper__titleblock-label">Scala</span>
            <span class="paper__titleblock-value">{displayScale}</span>
        </div>
        <div class="paper__titleblock-cell">
            <span class="paper__titleblock-label">Revisión</span>
            <span class="paper__titleblock-value">{revision}</span>
        </div>
        <div class="paper__titleblock-cell paper__titleblock-cell--wide">
            <span class="paper__titleblock-label">Dimensiones</span>
            <span
                class="paper__titleblock-value paper__titleblock-value--title"
            >
                {displayDimensions}
            </span>
        </div>
        <div class="paper__titleblock-cell">
            <span class="paper__titleblock-label">Fecha</span>
            <span class="paper__titleblock-value">{date}</span>
        </div>
    </header>

    <div class="paper__body">
        {@render children?.()}
    </div>
</article>

<style>
    .paper {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        background-color: var(--surface-container-lowest);
        border: 1px solid var(--ink);
        font-family: var(--font-mono);
        color: var(--on-surface);
    }

    .paper__titleblock {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        border-bottom: 1px solid var(--ink);
        background-color: var(--secondary-container);
        font-family: var(--font-mono);
    }

    .paper__titleblock-cell {
        padding: 10px 14px;
        border-right: 1px solid var(--ink);
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
    }

    .paper__titleblock-cell:last-child {
        border-right: none;
    }

    .paper__titleblock-cell--wide {
        grid-column: span 2;
    }

    .paper__titleblock-label {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--outline);
    }

    .paper__titleblock-value {
        font-size: 13px;
        font-weight: 700;
        color: var(--on-surface);
    }

    .paper__titleblock-value--title {
        font-family: var(--font-display);
        font-size: 16px;
        letter-spacing: -0.02em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .paper__body {
        padding: 40px 48px 56px;
        background-image: radial-gradient(
            circle at 1px 1px,
            var(--outline-variant) 1px,
            transparent 0
        );
        background-size: 20px 20px;
        background-position: 0 0;
    }

    @media (max-width: 640px) {
        .paper__titleblock {
            grid-template-columns: 1fr 1fr;
        }
        .paper__titleblock-cell--wide {
            grid-column: span 2;
        }
        .paper__body {
            padding: 24px 20px 40px;
        }
    }
</style>
