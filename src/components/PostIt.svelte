<script lang="ts">
    type Props = {
        title?: string;
        number?: string;
        align?: "left" | "right";
        variant?: "note" | "warning" | "info";
        children?: import("svelte").Snippet;
    };

    let {
        title = "Nota de campo",
        number = "N.01",
        align = "right",
        variant = "note",
        children,
    }: Props = $props();
</script>

<aside class="callout callout--{align} callout--{variant}">
    <div class="callout__leader" aria-hidden="true">
        <span class="callout__leader-line"></span>
        <span class="callout__leader-anchor"></span>
    </div>

    <div class="callout__box">
        <header class="callout__head">
            <span class="callout__number">{number}</span>
            <span class="callout__title">{title}</span>
        </header>
        <div class="callout__body">
            {@render children?.()}
        </div>
    </div>
</aside>

<style>
    .callout {
        position: relative;
        display: grid;
        grid-template-columns: 40px 1fr;
        align-items: start;
        margin: 32px 0;
        font-family: var(--font-mono);
    }

    .callout--right {
        grid-template-columns: 1fr 40px;
    }

    .callout--right .callout__box {
        order: -1;
    }

    .callout__leader {
        position: relative;
        height: 100%;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 14px;
    }

    .callout__leader-line {
        position: absolute;
        top: 14px;
        left: 0;
        right: 0;
        height: 0;
        border-top: 1px dashed var(--ink);
    }

    .callout__leader-anchor {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 12px;
        border: 1.5px solid var(--ink);
        border-radius: 50%;
        background: var(--surface-container-lowest);
    }

    .callout__leader-anchor::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--ink);
    }

    .callout__box {
        background: var(--surface-container-lowest);
        border: 1px solid var(--ink);
        position: relative;
    }

    .callout__head {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: var(--ink);
        color: var(--color-on-ink, #fff);
        border-bottom: 1px solid var(--ink);
    }

    .callout__number {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        opacity: 0.75;
    }

    .callout__title {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .callout__body {
        padding: 12px 14px;
        font-size: 13px;
        line-height: 1.6;
        color: var(--on-surface);
    }

    .callout__body :global(p) {
        margin: 0;
    }

    .callout__body :global(p + p) {
        margin-top: 8px;
    }

    /* Variant: note - default ink */
    .callout--info .callout__head {
        background: var(--ink);
    }

    /* Variant: warning - amber */
    .callout--warning .callout__head {
        background: var(--annotation);
        color: var(--on-annotation-container, #fff);
    }

    .callout--warning .callout__leader-line,
    .callout--warning .callout__leader-anchor {
        border-color: var(--annotation);
    }

    .callout--warning .callout__leader-anchor::after {
        background: var(--annotation);
    }

    .callout--warning .callout__box {
        border-color: var(--annotation);
    }

    /* On mobile: stack as a normal block, no leader */
    @media (max-width: 640px) {
        .callout {
            grid-template-columns: 1fr;
            margin: 24px 0;
        }

        .callout--right {
            grid-template-columns: 1fr;
        }

        .callout--right .callout__box {
            order: 0;
        }

        .callout__leader {
            display: none;
        }
    }
</style>
