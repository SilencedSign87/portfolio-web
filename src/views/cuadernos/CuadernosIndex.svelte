<script lang="ts">
    import {
        ChevronLeft,
        ChevronRight,
        House,
        ArrowUpRight,
    } from "@lucide/svelte/icons";
    import Anchor from "../../components/Anchor.svelte";
    import Button from "../../components/Button.svelte";
    import { router } from "svelte-spa-router";

    import Semana1 from "./Semana1.svelte";
    import Semana2 from "./Semana2.svelte";
    import Semana3 from "./Semana3.svelte";
    import Semana4 from "./Semana4.svelte";
    import Semana5 from "./Semana5.svelte";
    import Semana6 from "./semana6.svelte";
    import Semana7 from "./Semana7.svelte";

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
            date: "2024-03",
            sheets: 7,
        },
        {
            slug: "semana-2",
            number: "02",
            title: "Open Web Platform",
            topic: "Estándares, APIs, protocolos",
            tags: ["estándares", "apis"],
            date: "2024-03",
            sheets: 6,
        },
        {
            slug: "semana-3",
            number: "03",
            title: "Librerías frontend",
            topic: "Bootstrap · Tailwind",
            tags: ["bootstrap", "tailwind"],
            date: "2024-04",
            sheets: 5,
        },
        {
            slug: "semana-4",
            number: "04",
            title: "DOM y Canvas",
            topic: "Manipulación, dibujo 2D, animaciones",
            tags: ["dom", "canvas"],
            date: "2024-04",
            sheets: 9,
        },
        {
            slug: "semana-5",
            number: "05",
            title: "Frontend con React",
            topic: "Componentes, props, hooks, virtual DOM",
            tags: ["react", "spa"],
            date: "2024-05",
            sheets: 10,
        },
        {
            slug: "semana-6",
            number: "06",
            title: "Eventos y bucles",
            topic: "Renderizado condicional, formularios, routing",
            tags: ["react", "forms"],
            date: "2024-05",
            sheets: 6,
        },
        {
            slug: "semana-7",
            number: "07",
            title: "Hooks en profundidad",
            topic: "useState, useEffect, useRef, useReducer…",
            tags: ["hooks", "react"],
            date: "2024-06",
            sheets: 9,
        },
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
<div class="cuadernos__subheader" class:is-stuck={isStuck}>
    <div class="cuadernos__subheader-inner">
        <div class="cuadernos__subheader-cell">
            <span class="cuadernos__subheader-label">Sec.</span>
            <span class="cuadernos__subheader-value">Cuadernos</span>
        </div>
        <div class="cuadernos__subheader-cell cuadernos__subheader-cell--wide">
            <span class="cuadernos__subheader-label">Doc.</span>
            <span class="cuadernos__subheader-value">
                {#if isDetail && currentMeta}
                    {currentMeta.number} — {currentMeta.title}
                {:else}
                    Índice general
                {/if}
            </span>
        </div>
        <div class="cuadernos__subheader-cell">
            <span class="cuadernos__subheader-label">Folio</span>
            <span class="cuadernos__subheader-value">
                {isDetail && currentMeta
                    ? `${currentIndex + 1}/${semanaMeta.length}`
                    : `0/${semanaMeta.length}`}
            </span>
        </div>

        {#if isDetail}
            <nav class="cuadernos__subheader-nav">
                <Anchor
                    href={prevMeta ? `/cuadernos/${prevMeta.slug}` : ""}
                    appearance="ghost"
                    class="cuadernos__nav-btn"
                    title={prevMeta ? `← ${prevMeta.title}` : ""}
                >
                    <ChevronLeft size={16} />
                </Anchor>
                <Anchor
                    href="/cuadernos"
                    appearance="outline"
                    size="sm"
                    class="cuadernos__nav-home"
                    title="Volver al índice"
                >
                    <House size={14} />
                    <span class="cuadernos__nav-home-text">índice</span>
                </Anchor>
                <Anchor
                    href={nextMeta ? `/cuadernos/${nextMeta.slug}` : ""}
                    appearance="ghost"
                    class="cuadernos__nav-btn"
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
        <div class="cuadernos__notfound">
            <p>404 — Cuaderno "{slug}" no encontrado en este archivo.</p>
            <Anchor href="/cuadernos" appearance="primary">
                Volver al índice
            </Anchor>
        </div>
    {/if}
{:else}
    <main class="cuadernos__index">
        <header class="cuadernos__intro">
            <div class="cuadernos__intro-meta">
                <span>§ 02</span>
                <span class="cuadernos__intro-dot">·</span>
                <span>Cuadernos de estudio</span>
            </div>
            <h1 class="cuadernos__intro-title">
                Apuntes trazados<br />
                en papel rayado.
            </h1>
            <p class="cuadernos__intro-lead">
                Siete semanas de cursada frontend. Cada lámina resume una
                unidad: teoría, ejemplos y, a veces, una nota al margen.
            </p>
        </header>

        <ol class="cuadernos__grid">
            {#each semanaMeta as s (s.slug)}
                <li class="cuadernos__item">
                    <span class="cuadernos__card-anchor">
                        <Anchor
                            href={`/cuadernos/${s.slug}`}
                            external={false}
                            appearance="ghost"
                            class="cuadernos__card"
                        >
                            <header class="cuadernos__card-head">
                                <span class="cuadernos__card-num">
                                    <span class="cuadernos__card-num-prefix"
                                        >№</span
                                    >
                                    {s.number}
                                </span>
                                <span class="cuadernos__card-date"
                                    >{s.date}</span
                                >
                            </header>

                            <div class="cuadernos__card-body">
                                <h2 class="cuadernos__card-title">{s.title}</h2>
                                <p class="cuadernos__card-topic">{s.topic}</p>
                            </div>

                            <footer class="cuadernos__card-foot">
                                <ul class="cuadernos__card-tags">
                                    {#each s.tags as tag (tag)}
                                        <li class="cuadernos__card-tag">
                                            <span
                                                class="cuadernos__card-tag-mark"
                                                >+</span
                                            >
                                            {tag}
                                        </li>
                                    {/each}
                                </ul>
                                <span class="cuadernos__card-sheets">
                                    {s.sheets} §§
                                </span>
                            </footer>

                            <div
                                class="cuadernos__card-corner cuadernos__card-corner--tr"
                                aria-hidden="true"
                            >
                                <ArrowUpRight size={14} />
                            </div>
                        </Anchor>
                    </span>
                </li>
            {/each}
        </ol>
    </main>
{/if}

<style>
    /* Sub-header */
    .cuadernos__subheader {
        position: sticky;
        top: 0;
        z-index: 30;
        background: var(--paper-bg);
        border-bottom: 1px solid var(--ink);
    }

    .cuadernos__subheader.is-stuck {
        box-shadow: 4px 0 0 0 var(--ink);
    }

    .cuadernos__subheader-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        align-items: stretch;
        gap: 0;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .cuadernos__subheader-cell {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0 16px;
        border-right: 1px solid var(--outline-variant);
    }

    .cuadernos__subheader-cell:first-child {
        padding-left: 0;
    }

    .cuadernos__subheader-cell--wide {
        flex: 1;
        min-width: 0;
    }

    .cuadernos__subheader-label {
        color: var(--outline);
        font-size: 9px;
        letter-spacing: 0.12em;
    }

    .cuadernos__subheader-value {
        color: var(--on-surface);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .cuadernos__subheader-nav {
        display: flex;
        align-items: center;
        gap: 4px;
        padding-left: 16px;
    }

    .cuadernos__subheader-nav :global(.cuadernos__nav-btn) {
        padding: 6px 8px;
    }

    .cuadernos__subheader-nav :global(.cuadernos__nav-home) {
        margin: 0 4px;
    }

    .cuadernos__nav-home-text {
        display: none;
    }

    @media (min-width: 640px) {
        .cuadernos__nav-home-text {
            display: inline;
        }
    }

    /* INDEX */
    .cuadernos__index {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px 80px;
    }

    .cuadernos__intro {
        margin-bottom: 56px;
        max-width: 60ch;
    }

    .cuadernos__intro-meta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--outline);
        margin-bottom: 20px;
    }

    .cuadernos__intro-dot {
        opacity: 0.4;
    }

    .cuadernos__intro-title {
        font-family: var(--font-display);
        font-size: clamp(36px, 6vw, 56px);
        line-height: 1.05;
        letter-spacing: -0.03em;
        font-weight: 700;
        color: var(--ink);
        margin: 0 0 24px;
    }

    .cuadernos__intro-lead {
        font-family: var(--font-mono);
        font-size: 15px;
        line-height: 1.7;
        color: var(--on-surface-variant);
        margin: 0;
    }

    .cuadernos__grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @media (min-width: 640px) {
        .cuadernos__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .cuadernos__grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .cuadernos__item {
        min-width: 0;
    }

    .cuadernos__card-anchor :global(.cuadernos__card) {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--surface-container-lowest);
        border: 1px solid var(--ink);
        text-decoration: none;
        color: var(--on-surface);
        transition:
            transform 150ms ease,
            box-shadow 150ms ease;
    }

    .cuadernos__card-anchor :global(.cuadernos__card:hover) {
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0 0 var(--ink);
    }

    .cuadernos__card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: var(--secondary-container);
        border-bottom: 1px solid var(--outline-variant);
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .cuadernos__card-num {
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        color: var(--ink);
        font-weight: 700;
        margin-right: 8px;
    }

    .cuadernos__card-num-prefix {
        opacity: 0.5;
    }

    .cuadernos__card-date {
        color: var(--on-secondary-container);
        opacity: 0.7;
    }

    .cuadernos__card-body {
        max-width: 100%;
        padding: 20px 16px 16px;
        flex: 1;
        border-bottom: 1px solid var(--outline-variant);
        overflow: hidden;
        display: grid;
        gap: 2px;
    }

    .cuadernos__card-title {
        font-family: var(--font-display);
        font-size: 22px;
        line-height: 1.15;
        letter-spacing: -0.02em;
        font-weight: 700;
        color: var(--ink);
        margin: 0 0 8px;
        text-align: center;
        text-overflow: ellipsis;
        text-wrap: balance;
    }

    .cuadernos__card-topic {
        font-family: var(--font-mono);
        font-size: 13px;
        line-height: 1.5;
        color: var(--on-surface-variant);
        margin: 0;
        text-align: center;
        text-wrap: balance;
    }

    .cuadernos__card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        gap: 12px;
    }

    .cuadernos__card-tags {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .cuadernos__card-tag {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ink);
        display: inline-flex;
        align-items: center;
        gap: 3px;
    }

    .cuadernos__card-tag-mark {
        color: var(--ink);
    }

    .cuadernos__card-sheets {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--outline);
        white-space: nowrap;
    }

    .cuadernos__card-corner {
        position: absolute;
        top: 0;
        right: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ink);
        color: var(--color-on-ink, #fff);
        opacity: 0;
        transition: opacity 100ms ease;
    }

    .cuadernos__card-anchor
        :global(.cuadernos__card:hover .cuadernos__card-corner) {
        opacity: 1;
    }

    .cuadernos__notfound {
        max-width: 600px;
        margin: 80px auto;
        padding: 40px;
        text-align: center;
        border: 1px dashed var(--outline);
        font-family: var(--font-mono);
    }

    .cuadernos__notfound p {
        color: var(--error);
        margin: 0 0 20px;
    }
</style>
