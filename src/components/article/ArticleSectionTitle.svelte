<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        title: string;
        number?: string | null;
        description?: string | null;
        id?: string | null;
        class?: string;
        children?: Snippet;
    };

    let {
        title,
        number = null,
        description = null,
        id = null,
        class: className = "",
        children,
    }: Props = $props();
</script>

<section class="article-section {className}" {id}>
    <div class="article-section__head">
        <div class="article-section__number">
            <span class="article-section__number-prefix">§</span>
            <span class="article-section__number-value">{number ?? "00"}</span>
        </div>
        <div class="article-section__heading">
            <h2 class="headline-sm text-on-surface m-0 mb-1">{title}</h2>
            {#if description}
                <p class="font-mono text-xs text-outline m-0">{description}</p>
            {/if}
        </div>
        <div class="article-section__anchor" aria-hidden="true">
            <span class="article-section__anchor-line"></span>
            <span class="article-section__anchor-dot"></span>
        </div>
    </div>
    <div class="article-section__rule" aria-hidden="true"></div>
    <div class="article-section__body">
        {@render children?.()}
    </div>
</section>

<style>
    .article-section {
        margin-top: 56px;
    }

    .article-section__head {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
    }

    .article-section__number {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 4px 8px;
        background: var(--ink);
        color: var(--color-on-ink, #fff);
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .article-section__number-prefix {
        opacity: 0.7;
    }

    .article-section__heading {
        min-width: 0;
    }

    .article-section__anchor {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .article-section__anchor-line {
        width: 24px;
        height: 1px;
        background: var(--outline-variant);
    }

    .article-section__anchor-dot {
        width: 8px;
        height: 8px;
        border: 1px solid var(--ink);
        background: var(--surface-container-lowest);
        border-radius: 50%;
    }

    .article-section__rule {
        position: relative;
        height: 1px;
        background: var(--outline-variant);
        margin-bottom: 24px;
    }

    .article-section__rule::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 60px;
        height: 1px;
        background: var(--ink);
    }
</style>
