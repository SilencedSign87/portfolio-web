<script lang="ts">
    type Props = {
        lightSrc: string;
        darkSrc?: string | null;
        alt?: string;
        width?: number | null;
        height?: number | null;
        class?: string;
        caption?: string | null;
    };

    let {
        lightSrc,
        darkSrc = null,
        alt = "",
        width = null,
        height = null,
        class: className = "",
        caption = null,
    }: Props = $props();
</script>

<figure class="theme-image {className}">
    <div class="theme-image__frame">
        <div class="theme-image__corner theme-image__corner--tl"></div>
        <div class="theme-image__corner theme-image__corner--tr"></div>
        <div class="theme-image__corner theme-image__corner--bl"></div>
        <div class="theme-image__corner theme-image__corner--br"></div>
        <img src={lightSrc} {alt} {width} {height} class="theme-image__img" />
    </div>
    {#if caption}
        <figcaption class="theme-image__caption">
            <span class="theme-image__caption-mark">FIG.</span>
            <span class="theme-image__caption-text">{caption}</span>
        </figcaption>
    {/if}
</figure>

<style>
    .theme-image {
        margin: 0;
    }

    .theme-image__frame {
        position: relative;
        border: 1px solid var(--ink);
        background: var(--secondary-container);
        padding: 4px;
    }

    .theme-image__corner {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 1px solid var(--ink);
        background: var(--surface-container-lowest);
        z-index: 1;
    }

    .theme-image__corner--tl {
        top: -1px;
        left: -1px;
        border-right: none;
        border-bottom: none;
    }
    .theme-image__corner--tr {
        top: -1px;
        right: -1px;
        border-left: none;
        border-bottom: none;
    }
    .theme-image__corner--bl {
        bottom: -1px;
        left: -1px;
        border-right: none;
        border-top: none;
    }
    .theme-image__corner--br {
        bottom: -1px;
        right: -1px;
        border-left: none;
        border-top: none;
    }

    .theme-image__img {
        display: block;
        width: 100%;
        height: auto;
        max-height: 320px;
        object-fit: cover;
        filter: sepia(8%) saturate(85%) contrast(95%);
    }

    .theme-image__caption {
        display: flex;
        gap: 8px;
        align-items: baseline;
        margin-top: 8px;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--outline);
    }

    .theme-image__caption-mark {
        color: var(--ink);
        font-weight: 700;
    }
</style>
