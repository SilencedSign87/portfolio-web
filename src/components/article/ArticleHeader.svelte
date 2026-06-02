<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        title: string;
        number?: string | null;
        description?: string | null;
        id?: string | null;
        class?: string;
        before?: Snippet;
    };

    let {
        title,
        number = null,
        description = null,
        id = null,
        class: className = "",
        before,
    }: Props = $props();
</script>

<header class="article-header {className}" {id}>
    {#if before}
        <div class="article-header__before">
            {@render before()}
        </div>
    {/if}

    <div class="article-header__meta">
        <span class="article-header__ref">
            <span class="article-header__ref-label">FIG.</span>
            <span class="article-header__ref-value">{number ?? "00.00"}</span>
        </span>
        <span class="article-header__divider" aria-hidden="true"></span>
        <span class="article-header__ref">
            <span class="article-header__ref-label">SCALE</span>
            <span class="article-header__ref-value">1:1</span>
        </span>
        <span class="article-header__divider" aria-hidden="true"></span>
        <span class="article-header__ref">
            <span class="article-header__ref-label">DATE</span>
            <span class="article-header__ref-value">
                {new Date().toISOString().slice(0, 10)}
            </span>
        </span>
    </div>

    <h1 class="headline-lg-mobile headline-lg text-ink mb-5">
        {title}
    </h1>

    {#if description}
        <p class="body-md text-on-surface-variant max-w-[60ch] mx-auto text-pretty">{description}</p>
    {/if}

    <div class="article-header__cutline" aria-hidden="true">
        <span class="article-header__cutline-mark"></span>
        <span class="article-header__cutline-line"></span>
        <span class="article-header__cutline-mark"></span>
    </div>
</header>

<style>
    .article-header {
        margin-bottom: 48px;
        text-align: center;
    }

    .article-header__before {
        margin-bottom: 32px;
    }

    .article-header__meta {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--outline);
        margin-bottom: 24px;
    }

    .article-header__ref {
        display: inline-flex;
        align-items: baseline;
        gap: 6px;
    }

    .article-header__ref-value {
        color: var(--ink);
        font-weight: 700;
    }

    .article-header__divider {
        width: 20px;
        height: 1px;
        background: var(--outline-variant);
    }

    .article-header__cutline {
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .article-header__cutline-mark {
        width: 6px;
        height: 6px;
        background: var(--ink);
        transform: rotate(45deg);
    }

    .article-header__cutline-line {
        flex: 0 0 80px;
        height: 1px;
        background: var(--ink);
    }
</style>
