<script lang="ts">
    import {
        ChevronLeft,
        ChevronRight,
        House,
    } from "@lucide/svelte/icons";
    import Anchor from "../../components/Anchor.svelte";
    import { router } from "svelte-spa-router";
    import ContentHeader from "../../components/ContentHeader.svelte";
    import ContentCard from "../../components/ContentCard.svelte";
    import ContentCardTag from "../../components/ContentCardTag.svelte";
    import ContentCardBody from "../../components/ContentCardBody.svelte";
    import ContentCardFoot from "../../components/ContentCardFoot.svelte";

    import Semana1 from "./Semana1.svelte";
    import Semana2 from "./Semana2.svelte";
    import Semana3 from "./Semana3.svelte";
    import Semana4 from "./Semana4.svelte";
    import Semana5 from "./Semana5.svelte";
    import Semana6 from "./semana6.svelte";
    import Semana7 from "./Semana7.svelte";
    import Semana8 from "./Semama8.svelte";
    import Semana9 from "./Semana9.svelte";
    import Semana10 from "./Semana10.svelte";
    import Semana11 from "./Semana11.svelte";
    import Semana12 from "./Semana12.svelte";
    import Semana13 from "./Semana13.svelte";
    import Semana14 from "./Semana14.svelte";

    type CuadernoMeta = {
        slug: string;
        number: string;
        title: string;
        topic: string;
        tags: string[];
        date: string;
        sheets: number;
    };

    const semanaMeta: CuadernoMeta[] = [
        {
            slug: "semana-1",
            number: "01",
            title: "Fundamentos web",
            topic: "HTML · CSS · JavaScript",
            tags: ["html", "css", "js"],
            date: "2026-04",
            sheets: 7,
        },
        {
            slug: "semana-2",
            number: "02",
            title: "Open Web Platform",
            topic: "Estándares, APIs, protocolos",
            tags: ["estándares", "apis"],
            date: "2026-04",
            sheets: 6,
        },
        {
            slug: "semana-3",
            number: "03",
            title: "Librerías frontend",
            topic: "Bootstrap · Tailwind",
            tags: ["bootstrap", "tailwind"],
            date: "2026-04",
            sheets: 5,
        },
        {
            slug: "semana-4",
            number: "04",
            title: "DOM y Canvas",
            topic: "Manipulación, dibujo 2D, animaciones",
            tags: ["dom", "canvas"],
            date: "2026-04",
            sheets: 9,
        },
        {
            slug: "semana-5",
            number: "05",
            title: "Frontend con React",
            topic: "Componentes, props, hooks, virtual DOM",
            tags: ["react", "spa"],
            date: "2026-05",
            sheets: 10,
        },
        {
            slug: "semana-6",
            number: "06",
            title: "Eventos y bucles",
            topic: "Renderizado condicional, formularios, routing",
            tags: ["react", "forms"],
            date: "2026-05",
            sheets: 6,
        },
        {
            slug: "semana-7",
            number: "07",
            title: "Hooks en profundidad",
            topic: "useState, useEffect, useRef, useReducer…",
            tags: ["hooks", "react"],
            date: "2026-05",
            sheets: 9,
        },
        {
            slug: "semana-8",
            number: "08",
            title: "Consolidado",
            topic: "Notas y apuntes de repaso",
            tags: ["repaso", "notas"],
            date: "2026-05",
            sheets: 1,
        },
        {
            slug: "semana-9",
            number: "09",
            title: "Tecnologías Web Backend",
            topic: "Arquitectura de aplicaciones web y servidores web",
            tags: ["php", "Java", "JSP"],
            date: "2026-05",
            sheets: 8,
        },
        {
            slug: "semana-10",
            number: "10",
            title: "Introducción a Python",
            topic: "Sintaxis, POO, módulos y excepciones",
            tags: ["python", "poo"],
            date: "2026-07",
            sheets: 13,
        },
        {
            slug: "semana-11",
            number: "11",
            title: "Introducción a Django",
            topic: "MTV, modelos, vistas, plantillas y ORM",
            tags: ["django", "python", "backend"],
            date: "2026-07",
            sheets: 13,
        },
        {
            slug: "semana-12",
            number: "12",
            title: "Formularios, Admin, Middleware y Sesiones",
            topic: "Formularios, validación, admin, middleware, sesiones y autenticación",
            tags: ["django", "forms", "admin", "auth"],
            date: "2026-07",
            sheets: 11,
        },
        {
            slug: "semana-13",
            number: "13",
            title: "Diseño de APIs RESTful",
            topic: "DRF, serializadores, ViewSets, HATEOAS, JWT",
            tags: ["django", "drf", "api", "rest"],
            date: "2026-07",
            sheets: 12,
        },
        {
            slug: "semana-14",
            number: "14",
            title: "Microservicios en Django",
            topic: "Docker, Kubernetes, comunicación, monitoreo y escalado",
            tags: ["django", "microservicios", "docker", "kubernetes"],
            date: "2026-07",
            sheets: 11,
        }
    ];

    const components: Record<string, any> = {
        "semana-1": Semana1,
        "semana-2": Semana2,
        "semana-3": Semana3,
        "semana-4": Semana4,
        "semana-5": Semana5,
        "semana-6": Semana6,
        "semana-7": Semana7,
        "semana-8": Semana8,
        "semana-9": Semana9,
        "semana-10": Semana10,
        "semana-11": Semana11,
        "semana-12": Semana12,
        "semana-13": Semana13,
        "semana-14": Semana14,
    };

    let isDetail = $derived(router.location !== "/cuadernos");
    let slug = $derived(
        isDetail ? router.location.replace("/cuadernos/", "") : "",
    );
    let Component = $derived(isDetail ? components[slug] : null);

    let currentIndex = $derived(semanaMeta.findIndex((s) => s.slug === slug));
    let prevMeta = $derived(
        currentIndex > 0 ? semanaMeta[currentIndex - 1] : null,
    );
    let nextMeta = $derived(
        currentIndex < semanaMeta.length - 1
            ? semanaMeta[currentIndex + 1]
            : null,
    );
    let currentMeta = $derived(
        currentIndex >= 0 ? semanaMeta[currentIndex] : null,
    );

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

<!-- Sticky sub-header with technical title block -->
<div bind:this={sentinel} class="h-px pointer-events-none"></div>
<div
    class="sticky top-0 z-30 bg-paper border-b border-ink"
    class:subheader-stuck={isStuck}
>
    <div class="flex items-stretch max-w-screen-xl mx-auto px-5 py-[10px] font-mono text-[11px] uppercase tracking-[0.06em]">
        <div class="flex flex-col gap-0.5 min-w-0 px-4 border-r border-outline-variant first:pl-0">
            <span class="text-outline text-[9px] tracking-[0.12em] uppercase">Sec.</span>
            <span class="text-on-surface font-bold whitespace-nowrap truncate">Cuadernos</span>
        </div>
        <div class="flex flex-col gap-0.5 min-w-0 flex-1 px-4 border-r border-outline-variant">
            <span class="text-outline text-[9px] tracking-[0.12em] uppercase">Doc.</span>
            <span class="text-on-surface font-bold whitespace-nowrap truncate">
                {#if isDetail && currentMeta}
                    {currentMeta.number} — {currentMeta.title}
                {:else}
                    Índice general
                {/if}
            </span>
        </div>
        <div class="flex flex-col gap-0.5 min-w-0 px-4 border-r border-outline-variant">
            <span class="text-outline text-[9px] tracking-[0.12em] uppercase">Folio</span>
            <span class="text-on-surface font-bold whitespace-nowrap truncate">
                {isDetail && currentMeta
                    ? `${currentIndex + 1}/${semanaMeta.length}`
                    : `0/${semanaMeta.length}`}
            </span>
        </div>

        {#if isDetail}
            <nav class="flex items-center gap-1 pl-4">
                <Anchor
                    href={prevMeta ? `/cuadernos/${prevMeta.slug}` : ""}
                    appearance="ghost"
                    class="p-1.5 px-2"
                    title={prevMeta ? `← ${prevMeta.title}` : ""}
                >
                    <ChevronLeft size={16} />
                </Anchor>
                <Anchor
                    href="/cuadernos"
                    appearance="outline"
                    size="sm"
                    class="mx-1"
                    title="Volver al índice"
                >
                    <House size={14} />
                    <span class="hidden sm:inline">índice</span>
                </Anchor>
                <Anchor
                    href={nextMeta ? `/cuadernos/${nextMeta.slug}` : ""}
                    appearance="ghost"
                    class="p-1.5 px-2"
                    title={nextMeta ? `${nextMeta.title} →` : ""}
                >
                    <ChevronRight size={16} />
                </Anchor>
            </nav>
        {/if}
    </div>
</div>

{#if isDetail}
    {#if Component}
        <Component />
    {:else}
        <div class="notfound-box">
            <p class="text-error m-0 mb-5">404 — Cuaderno "{slug}" no encontrado en este archivo.</p>
            <Anchor href="/cuadernos" appearance="primary">
                Volver al índice
            </Anchor>
        </div>
    {/if}
{:else}
    <main class="max-w-screen-xl mx-auto px-5 pt-10 pb-20">
        <ContentHeader
            numeration="§ 02"
            subtitle="Cuadernos de estudio"
            title="Apuntes trazados en papel rayado."
            description="Siete semanas de cursada frontend. Cada lámina resume una unidad: teoría, ejemplos y, a veces, una nota al margen."
        />

        <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0">
            {#each semanaMeta as s (s.slug)}
                <li class="min-w-0">
                    <ContentCard href={`/cuadernos/${s.slug}`}>
                        <ContentCardTag number={s.number} date={s.date} />
                        <ContentCardBody title={s.title} topic={s.topic} />
                        <ContentCardFoot tags={s.tags} sheets={s.sheets} />
                    </ContentCard>
                </li>
            {/each}
        </ol>
    </main>
{/if}

