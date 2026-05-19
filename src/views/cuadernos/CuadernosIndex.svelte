<script lang="ts">
    import { ChevronLeft, ChevronRight, House } from "@lucide/svelte";
    import Anchor from "../../components/Anchor.svelte";
    import { router } from "svelte-spa-router";
    import { slide } from "svelte/transition";

    import Semana1 from "./Semana1.svelte";
    import Semana2 from "./Semana2.svelte";
    import Semana3 from "./Semana3.svelte";
    import Semana4 from "./Semana4.svelte";
    import Semana5 from "./Semana5.svelte";
    import Semana6 from "./semana6.svelte";
    import Semana7 from "./Semana7.svelte";

    const semanaSlugs = [
        "semana-1",
        "semana-2",
        "semana-3",
        "semana-4",
        "semana-5",
        "semana-6",
        "semana-7",
    ];

    const components: Record<string, any> = {
        "semana-1": Semana1,
        "semana-2": Semana2,
        "semana-3": Semana3,
        "semana-4": Semana4,
        "semana-5": Semana5,
        "semana-6": Semana6,
        "semana-7": Semana7,
    };

    let isDetail = $derived(router.location !== "/cuadernos");
    let slug = $derived(
        isDetail ? router.location.replace("/cuadernos/", "") : "",
    );
    let Component = $derived(isDetail ? components[slug] : null);

    let currentIndex = $derived(semanaSlugs.indexOf(slug));
    let prevSlug = $derived(currentIndex > 0 ? semanaSlugs[currentIndex - 1] : null);
    let nextSlug = $derived(currentIndex < semanaSlugs.length - 1 ? semanaSlugs[currentIndex + 1] : null);

    let isStuck = $state(false);
    let sentinel = $state<HTMLDivElement | null>(null);

    $effect(() => {
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isStuck = !entry.isIntersecting;
            },
            { threshold: 0 },
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    });
</script>

<div bind:this={sentinel} class="h-px pointer-events-none"></div>
<div
    class={`transition-all duration-100 sticky top-0 z-10 ${
        isStuck ? "shadow-lg" : "px-2 md:px-4 lg:px-12"
    }`}
>
    <header
        class={`bg-white dark:bg-neutral-800 py-3 px-2 md:px-4 flex items-center justify-between flex-wrap transition-all duration-100 h-16 border border-neutral-200 dark:border-neutral-750 ${
            isStuck
                ? "border-t-transparent border-r-transparent border-l-transparent"
                : ""
        }
        `}
    >
        <h1 class="text-lg capitalize">
            {#if isDetail}
                {slug.replace(/-/g, " ")}
            {:else}
                Cuadernos
            {/if}
        </h1>
        {#if isDetail}
            <nav class="flex items-center gap-2">
                <Anchor
                    appearance="transparent"
                    href={prevSlug ? `/cuadernos/${prevSlug}` : ""}
                    class={!prevSlug ? "opacity-50 pointer-events-none" : ""}
                    title={prevSlug ? "Semana anterior" : ""}
                >
                    <ChevronLeft />
                </Anchor>
                <Anchor appearance="transparent" href="/cuadernos" title="Volver a la lista">
                    <House />
                </Anchor>
                <Anchor
                    appearance="transparent"
                    href={nextSlug ? `/cuadernos/${nextSlug}` : ""}
                    class={!nextSlug ? "opacity-50 pointer-events-none" : ""}
                    title={nextSlug ? "Semana siguiente" : ""}
                >
                    <ChevronRight />
                </Anchor>
            </nav>
        {/if}
    </header>
</div>

{#if isDetail}
    {#if Component}
        <Component />
    {:else}
        <p class="text-red-500">Cuaderno "{slug}" no encontrado</p>
    {/if}
{:else}
    <div
        class="max-w-7xl m-auto flex flex-wrap items-center justify-around transition-all duration-100 py-16 *:min-w-75 gap-12"
    >
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-1"
        >
            <article>
                <h2 class="text-xl">Semana 1</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-2"
        >
            <article>
                <h2 class="text-xl">Semana 2</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-3"
        >
            <article>
                <h2 class="text-xl">Semana 3</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-4"
        >
            <article>
                <h2 class="text-xl">Semana 4</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-5"
        >
            <article>
                <h2 class="text-xl">Semana 5</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-6"
        >
            <article>
                <h2 class="text-xl">Semana 6</h2>
            </article>
        </Anchor>
        <Anchor
            class="aspect-[1/1.41] rounded-none hover:shadow-lg hover:-translate-y-2 transition-all duration-100"
            href="/cuadernos/semana-7"
        >
            <article>
                <h2 class="text-xl">Semana 7</h2>
            </article>
        </Anchor>
    </div>
{/if}
