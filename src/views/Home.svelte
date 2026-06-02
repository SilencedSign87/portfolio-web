<script lang="ts">
    import { ArrowRight, MapPin } from "@lucide/svelte/icons";
    import Anchor from "@components/Anchor.svelte";
    import Button from "@components/Button.svelte";
    import human from "@assets/human.jpg";
    import GithubIcon from "@/components/icons/GithubIcon.svelte";

    const stats = [
        { label: "Stack actual", value: "Svelte · TS · Vite" },
        { label: "Disciplina", value: "Frontend" },
        { label: "Universidad", value: "UNCP" },
    ];

    const sheets = [
        {
            n: "01",
            title: "Cuadernos",
            desc: "Apuntes de cursada — DOM, hooks, React, canvas.",
            href: "/cuadernos",
            external: false,
        },
        {
            n: "02",
            title: "Proyectos",
            desc: "Trabajos personales y colaborativos. (en construcción)",
            href: "/proyectos",
            external: false,
        },
        {
            n: "03",
            title: "Contacto",
            desc: "Para colaboraciones o consultas profesionales.",
            href: "https://github.com/silencedsign87",
            external: true,
        },
    ];
</script>

<main class="home">
    <!-- HERO / PORTADA -->
    <section class="home__hero">
        <div class="home__hero-grid">
            <!-- Columna izquierda: Titleblock -->
            <div class="home__titleblock">
                <div class="home__crosshair" aria-hidden="true">
                    <span></span>
                    <span></span>
                </div>

                <div class="home__meta">
                    <span>DISEÑO № 0001</span>
                    <span class="home__meta-dot">·</span>
                    <span>REVISION A</span>
                </div>

                <h1 class="home__title">
                    <span class="home__title-line">Bruno Nivardo</span>
                    <span class="home__title-line home__title-line--accent"
                        >Diaz Vega</span
                    >
                </h1>

                <p class="home__lead">
                    <span class="home__hand">// hola, soy</span>
                    desarrollador frontend. Diseño y construyo interfaces con la
                    lógica de un plano: medidas claras, jerarquía visible, y un poco
                    de tinta de más.
                </p>

                <div class="home__actions">
                    <Anchor
                        href="/cuadernos"
                        appearance="primary"
                        class="home__btn"
                    >
                        ver cuadernos
                        <ArrowRight size={14} />
                    </Anchor>
                    <a
                        href="https://github.com/silencedsign87"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="home__btn home__btn--outline"
                    >
                        <GithubIcon size={14} />
                        github
                    </a>
                </div>

                <ul class="home__stats">
                    {#each stats as s (s.label)}
                        <li class="home__stat">
                            <span class="home__stat-label">{s.label}</span>
                            <span class="home__stat-value">{s.value}</span>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Columna derecha: Boceto / Croquis -->
            <aside class="home__sketch" aria-hidden="true">
                <div class="home__sketch-frame">
                    <span class="home__sketch-corner home__sketch-corner--tl"
                    ></span>
                    <span class="home__sketch-corner home__sketch-corner--tr"
                    ></span>
                    <span class="home__sketch-corner home__sketch-corner--bl"
                    ></span>
                    <span class="home__sketch-corner home__sketch-corner--br"
                    ></span>

                    <img
                        src={human}
                        width="320"
                        height="320"
                        alt="Pintura digital de flores"
                        class="home__sketch-svg"
                    />
                </div>

                <div class="home__sketch-meta">
                    <span>FIG.01</span>
                    <span>CRAFT</span>
                    <span>1:1</span>
                </div>
            </aside>
        </div>
    </section>

    <!-- INDEX OF SHEETS -->
    <section class="home__index">
        <header class="home__index-head">
            <h2 class="home__index-title">
                <span class="home__index-prefix">§</span>
                Índice de láminas
            </h2>
            <p class="home__index-sub">
                Hojas trazadas en este portfolio. Cada link abre un documento
                técnico.
            </p>
        </header>

        <ol class="home__sheets">
            {#each sheets as s (s.n)}
                <li class="home__sheet">
                    <Anchor
                        href={s.href}
                        external={s.external}
                        appearance="ghost"
                        class="home__sheet-link"
                    >
                        <span class="home__sheet-num">{s.n}</span>
                        <span class="home__sheet-body">
                            <span class="home__sheet-title">{s.title}</span>
                            <span class="home__sheet-desc">{s.desc}</span>
                        </span>
                        <ArrowRight size={16} class="home__sheet-arrow" />
                    </Anchor>
                </li>
            {/each}
        </ol>
    </section>

    <!-- CTA FINAL -->
    <section class="home__cta">
        <div class="home__cta-box">
            <div class="home__cta-meta">FINAL DE DOCUMENTO</div>
            <p class="home__cta-text">
                Construido con <span class="home__cta-tag">Svelte 5</span>,
                <span class="home__cta-tag">TypeScript</span> y
                <span class="home__cta-tag">Vite</span>. Tinta digital sobre
                papel.
            </p>
        </div>
    </section>
</main>

<style>
    .home {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px 80px;
    }

    /* HERO */
    .home__hero {
        position: relative;
        padding: 20px 0 60px;
    }

    .home__hero-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 48px;
        align-items: start;
    }

    @media (min-width: 960px) {
        .home__hero-grid {
            grid-template-columns: 1.4fr 1fr;
            gap: 64px;
        }
    }

    .home__titleblock {
        position: relative;
        padding: 20px 0;
    }

    .home__crosshair {
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 16px;
        color: var(--ink);
    }

    .home__crosshair span:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 1px;
        background: currentColor;
    }

    .home__crosshair span:last-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 16px;
        background: currentColor;
    }

    .home__meta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--outline);
        margin-bottom: 28px;
    }

    .home__meta-dot {
        opacity: 0.4;
    }

    .home__title {
        font-family: var(--font-display);
        font-size: clamp(56px, 12vw, 128px);
        line-height: 0.92;
        letter-spacing: -0.04em;
        font-weight: 700;
        color: var(--ink);
        margin: 0 0 28px;
    }

    .home__title-line {
        display: block;
    }

    .home__title-line--accent {
        color: var(--on-surface);
        position: relative;
    }

    .home__lead {
        font-family: var(--font-mono);
        font-size: 16px;
        line-height: 1.65;
        color: var(--on-surface-variant);
        max-width: 50ch;
        margin: 0 0 32px;
        text-wrap: pretty;
    }

    .home__hand {
        font-family: var(--font-hand);
        font-size: 22px;
        color: var(--ink);
        margin-right: 4px;
    }

    .home__actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 48px;
    }

    .home__btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        text-decoration: none;
        color: var(--color-on-ink, #fff);
        background: var(--ink);
        border: 1px solid var(--ink);
        transition:
            background-color 100ms ease,
            color 100ms ease;
    }

    .home__btn:hover {
        background: var(--ink-soft);
        border-color: var(--ink-soft);
    }

    .home__btn--outline {
        background: transparent;
        color: var(--ink);
    }

    .home__btn--outline:hover {
        background: var(--ink-container);
        color: var(--on-ink-container);
    }

    .home__stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--ink);
    }

    @media (min-width: 600px) {
        .home__stats {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    .home__stat {
        padding: 14px 16px 14px 8px;
        border-right: 1px solid var(--outline-variant);
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .home__stat:last-child {
        border-right: none;
    }

    .home__stat-label {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--outline);
    }

    .home__stat-value {
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--on-surface);
        font-weight: 700;
    }

    .home__stat-value--inline {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    /* SKETCH */
    .home__sketch {
        position: relative;
    }

    .home__sketch-frame {
        position: relative;
        background: var(--surface-container-lowest);
        border: 1px solid var(--ink);
        color: var(--ink);
    }

    .home__sketch-corner {
        position: absolute;
        width: 12px;
        height: 12px;
        z-index: 1;
    }

    .home__sketch-corner--tl {
        top: -1px;
        left: -1px;
        border-top: 2px solid var(--ink);
        border-left: 2px solid var(--ink);
    }
    .home__sketch-corner--tr {
        top: -1px;
        right: -1px;
        border-top: 2px solid var(--ink);
        border-right: 2px solid var(--ink);
    }
    .home__sketch-corner--bl {
        bottom: -1px;
        left: -1px;
        border-bottom: 2px solid var(--ink);
        border-left: 2px solid var(--ink);
    }
    .home__sketch-corner--br {
        bottom: -1px;
        right: -1px;
        border-bottom: 2px solid var(--ink);
        border-right: 2px solid var(--ink);
    }

    .home__sketch-svg {
        display: block;
        width: 100%;
        height: auto;
    }

    .home__sketch-meta {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--outline);
    }

    /* INDEX OF SHEETS */
    .home__index {
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid var(--ink);
    }

    .home__index-head {
        margin-bottom: 32px;
    }

    .home__index-title {
        font-family: var(--font-display);
        font-size: 32px;
        letter-spacing: -0.02em;
        font-weight: 700;
        color: var(--on-surface);
        margin: 0 0 8px;
        display: flex;
        align-items: baseline;
        gap: 10px;
    }

    .home__index-prefix {
        color: var(--ink);
        font-family: var(--font-mono);
        font-weight: 400;
    }

    .home__index-sub {
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--outline);
        margin: 0;
    }

    .home__sheets {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--outline-variant);
    }

    .home__sheet {
        border-bottom: 1px solid var(--outline-variant);
    }

    .home__sheet :global(.home__sheet-link) {
        display: grid;
        grid-template-columns: 60px 1fr auto;
        align-items: center;
        gap: 20px;
        padding: 20px 8px;
        color: var(--on-surface);
        text-decoration: none;
        font-family: var(--font-mono);
        transition:
            background-color 100ms ease,
            padding 100ms ease;
    }

    .home__sheet :global(.home__sheet-link:hover) {
        background: var(--ink-container);
        color: var(--on-ink-container);
        padding-left: 16px;
    }

    .home__sheet-num {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 700;
        color: var(--ink);
        letter-spacing: 0.08em;
    }

    .home__sheet-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .home__sheet-title {
        font-family: var(--font-display);
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    .home__sheet-desc {
        font-size: 13px;
        color: var(--on-surface-variant);
    }

    .home__sheet .home__sheet-desc {
        color: var(--on-ink-container);
        opacity: 0.8;
    }

    .home__sheet :global(.home__sheet-link:hover) :global(.home__sheet-arrow) {
        transform: translateX(4px);
        color: var(--ink);
    }

    /* CTA */
    .home__cta {
        margin-top: 64px;
    }

    .home__cta-box {
        text-align: center;
        padding: 32px 20px;
        border: 1px dashed var(--outline);
    }

    .home__cta-meta {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: var(--outline);
        margin-bottom: 12px;
    }

    .home__cta-text {
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--on-surface-variant);
        margin: 0;
    }

    .home__cta-tag {
        color: var(--ink);
        font-weight: 700;
    }
</style>
