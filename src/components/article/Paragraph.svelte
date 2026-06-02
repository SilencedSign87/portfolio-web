<script lang="ts">
    type Props = {
        class?: string;
        children?: import("svelte").Snippet;
    };

    let { class: className = "", children }: Props = $props();
</script>

<p class="article-paragraph {className}">
    {@render children?.()}
</p>

<style>
    .article-paragraph {
        font-family: var(--font-mono);
        font-size: 15px;
        line-height: 1.75;
        color: var(--on-surface);
        margin: 0 0 20px;
        text-wrap: pretty;
    }

    @media (min-width: 768px) {
        .article-paragraph {
            font-size: 16px;
        }
    }
</style>
