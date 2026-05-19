<script lang="ts">
    import { onMount } from 'svelte';

    export let className = "";

    let paper: HTMLDivElement;

    let width = 0;
    let height = 0;

    onMount(() => {
        const observer = new ResizeObserver(() => {
            width = paper.offsetWidth;
            height = paper.offsetHeight;
        });
        observer.observe(paper);
        return () => observer.disconnect();
    });

    $: showHeight = height > 300;
</script>

<div class="flex justify-center">

    <!-- intrinsic wrapper -->
    <div class="relative w-fit">

        <!-- TOP MEASURE -->
        <div
            class="absolute -top-10 left-0 pointer-events-none"
            style={`width:${width}px`}
        >
            <div class="relative h-4">

                <!-- main line -->
                <div
                    class="
                        absolute
                        left-0
                        right-0
                        top-1/2
                        h-px
                        -translate-y-1/2
                        bg-neutral-500
                    "
                ></div>

                <!-- left cap -->
                <div
                    class="
                        absolute
                        left-0
                        top-0
                        w-px
                        h-4
                        bg-neutral-500
                    "
                ></div>

                <!-- right cap -->
                <div
                    class="
                        absolute
                        right-0
                        top-0
                        w-px
                        h-4
                        bg-neutral-500
                    "
                ></div>

                <!-- label -->
                <div
                    class="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        px-2
                        text-[11px]
                        font-mono
                        bg-neutral-100
                        dark:bg-neutral-900
                        text-neutral-400
                    "
                >
                    {Math.round(width)} px
                </div>
            </div>
        </div>

        <!-- LEFT MEASURE -->
        {#if showHeight}
            <div
                class="absolute -left-10 top-0 pointer-events-none"
                style={`height:${height}px`}
            >
                <div class="relative h-full w-4">

                    <!-- main line -->
                    <div
                        class="
                            absolute
                            top-0
                            bottom-0
                            left-1/2
                            w-px
                            -translate-x-1/2
                            bg-neutral-500
                        "
                    ></div>

                    <!-- top cap -->
                    <div
                        class="
                            absolute
                            top-0
                            left-0
                            h-px
                            w-4
                            bg-neutral-500
                        "
                    ></div>

                    <!-- bottom cap -->
                    <div
                        class="
                            absolute
                            bottom-0
                            left-0
                            h-px
                            w-4
                            bg-neutral-500
                        "
                    ></div>

                    <!-- label -->
                    <div
                        class="
                            absolute
                            left-1/2
                            top-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            -rotate-90
                            px-2
                            text-[11px]
                            font-mono
                            whitespace-nowrap
                            bg-neutral-100
                        dark:bg-neutral-900
                            text-neutral-400
                        "
                    >
                        {Math.round(height)} px
                    </div>

                </div>
            </div>
        {/if}

        <!-- PAPER -->
        <div
            bind:this={paper}
            class="
                relative
                w-[min(100vw-4rem,800px)]
                font-serif

                bg-white
                dark:bg-neutral-850

                border
                border-neutral-200
                dark:border-neutral-700

                shadow-xl
                shadow-black/20

                px-8
                py-10

                {className}
            "
        >
            <slot />
        </div>

    </div>

</div>
