<script lang="ts">
    type Props = {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        fig?: string;
        craft?: string;
        scale?: string;
        class?: string;
    };

    let {
        src,
        alt,
        width = 320,
        height = 320,
        fig = "FIG.01",
        craft = "CRAFT",
        scale = "1:1",
        class: className = "",
    }: Props = $props();
</script>

<aside class={className} aria-hidden="true">
    <div class="relative bg-surface-container-lowest border border-ink text-ink">
        <span class="absolute w-3 h-3 border-t-2 border-l-2 border-ink -top-px -left-px"></span>
        <span class="absolute w-3 h-3 border-t-2 border-r-2 border-ink -top-px -right-px"></span>
        <span class="absolute w-3 h-3 border-b-2 border-l-2 border-ink -bottom-px -left-px"></span>
        <span class="absolute w-3 h-3 border-b-2 border-r-2 border-ink -bottom-px -right-px"></span>
        <img {src} {width} {height} {alt} class="block w-full h-auto" />
    </div>
    <div class="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-outline">
        <span>{fig}</span>
        <span>{craft}</span>
        <span>{scale}</span>
    </div>
</aside>
