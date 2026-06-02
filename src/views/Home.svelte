<script lang="ts">
    import { ArrowRight } from "@lucide/svelte/icons";
    import Anchor from "@components/Anchor.svelte";
    import human from "@assets/human.jpg";
    import GithubIcon from "@/components/icons/GithubIcon.svelte";
    import SketchFrame from "../components/SketchFrame.svelte";
    import IndexSheet from "../components/IndexSheet.svelte";

    const stats = [
        { label: "Stack", value: "Web · Nativo" },
        { label: "Disciplina", value: "Frontend · Backend · Datos" },
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

<main class="max-w-screen-xl mx-auto px-5 pt-10 pb-20">
    <!-- HERO / PORTADA -->
    <section class="relative py-5 pb-[60px]">
        <div class="grid grid-cols-1 gap-12 items-start lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <!-- Columna izquierda: Titleblock -->
            <div class="relative px-4 py-2">
                <div class="absolute top-0 left-0 w-4 h-4 text-ink" aria-hidden="true">
                    <span class="absolute top-0 left-0 w-4 h-px bg-current"></span>
                    <span class="absolute top-0 left-0 w-px h-4 bg-current"></span>
                </div>

                <div class="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-outline mb-7">
                    <span>DISEÑO № 0001</span>
                    <span class="opacity-40">·</span>
                    <span>REVISION A</span>
                </div>

                <h1 class="font-display text-[clamp(56px,12vw,128px)] leading-[0.92] tracking-tighter font-bold text-ink mb-7">
                    <span class="block text-ink">Bruno Nivardo</span>
                    <span class="block text-on-surface">Diaz Vega</span>
                </h1>

                <p class="font-mono text-base leading-relaxed text-on-surface-variant max-w-[50ch] mb-8 text-pretty">
                    <span class="font-hand text-[22px] text-ink mr-1">// hola, soy</span>
                    desarrollador frontend. Diseño y construyo interfaces con la
                    lógica de un plano: medidas claras, jerarquía visible, y un poco
                    de tinta de más.
                </p>

                <div class="flex gap-3 flex-wrap mb-12">
                    <Anchor
                        href="/cuadernos"
                        appearance="primary"
                    >
                        ver cuadernos
                        <ArrowRight size={14} />
                    </Anchor>
                    <a
                        href="https://github.com/silencedsign87"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-4 py-[10px] font-mono text-xs font-medium uppercase tracking-wide no-underline text-ink bg-transparent border border-ink transition-[background-color,color] duration-100 hover:bg-ink-container hover:text-on-ink-container"
                    >
                        <GithubIcon size={14} />
                        github
                    </a>
                </div>

                <ul class="grid grid-cols-2 sm:grid-cols-4 gap-0 list-none m-0 p-0 border-t border-ink">
                    {#each stats as s (s.label)}
                        <li class="py-3.5 px-4 pl-2 border-r border-ink last:border-r-0 flex flex-col gap-1">
                            <span class="font-mono text-[10px] uppercase tracking-[0.1em] text-outline">{s.label}</span>
                            <span class="font-mono text-sm text-on-surface font-bold">{s.value}</span>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Columna derecha: Boceto / Croquis -->
            <SketchFrame
                src={human}
                alt="Pintura digital de flores"
                width={320}
                height={320}
            />
        </div>
    </section>

    <!-- INDEX OF SHEETS -->
    <section class="mt-10 pt-10 border-t border-ink">
        <header class="mb-8">
            <h2 class="headline-md text-on-surface mb-2 flex items-baseline gap-2.5">
                <span class="text-ink font-mono font-normal">§</span>
                Índice de láminas
            </h2>
            <p class="font-mono text-xs text-outline m-0">
                Hojas trazadas en este portfolio. Cada link abre un documento
                técnico.
            </p>
        </header>

        <ol class="list-none m-0 p-0 border-t border-outline-variant">
            {#each sheets as s (s.n)}
                <IndexSheet
                    number={s.n}
                    title={s.title}
                    description={s.desc}
                    href={s.href}
                    external={s.external}
                />
            {/each}
        </ol>
    </section>

    <!-- CTA FINAL -->
    <section class="mt-16">
        <div class="text-center px-5 py-8 border border-dashed border-outline">
            <div class="font-mono text-[10px] uppercase tracking-[0.16em] text-outline mb-3">
                FINAL DE DOCUMENTO
            </div>
            <p class="font-mono text-sm text-on-surface-variant m-0">
                Construido con <span class="text-ink font-bold">Svelte 5</span>,
                <span class="text-ink font-bold">TypeScript</span> y
                <span class="text-ink font-bold">Vite</span>. Tinta digital sobre
                papel.
            </p>
        </div>
    </section>
</main>
