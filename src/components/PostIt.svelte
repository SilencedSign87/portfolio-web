<script lang="ts">
    import { onMount } from 'svelte';

    let {
        align = "random",
        translateX = 0,
        translateY = 0,
        children,
    }: {
        align?: "random" | "right" | "left";
        translateX?: number;
        translateY?: number;
        children?: import('svelte').Snippet;
    } = $props();

    let side: "left" | "right" = $state("right");
    let rotation = $state(0);

    let classes = $derived(`
        bg-yellow-100 
        dark:bg-yellow-300
        text-black
        border border-black/5 dark:border-white/5
        shadow-lg
        shadow-black/50
        md:pt-8 pt-4 pb-4
        px-5
        w-full
        md:absolute md:left-1/2 md:max-w-72
        ${side === "right" ? "md:-mr-6" : "md:-ml-6"}
    `);

    let transform = $derived(
        `translateX(-50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`
    );

    onMount(() => {
        side = align === "random" ? (Math.random() > 0.5 ? "right" : "left") : align;
        rotation = Math.round((Math.random() * 4 - 2) * 10) / 10;
    });
</script>

<div class="md:relative md:h-0">
    <article
        class={classes}
        style="transform-origin: top center; transform: {transform}"
    >
    <div class="w-4 h-4 rounded-full bg-red-500 dark:bg-red-700 absolute top-3 left-1/2 shadow shadow-black/50"></div>
        {@render children?.()}
    </article>
</div>

<style>
    @media (width < 48rem) {
        article {
            transform: none !important;
        }
    }
</style>
