<script lang="ts">
    import musicwrap from "@/assets/proyectos/musicwrap.png";
    import portfolio from "@/assets/proyectos/portfolio.png";
    import ContentCard from "@/components/ContentCard.svelte";
    import ContentCardBody from "@/components/ContentCardBody.svelte";
    import ContentCardFoot from "@/components/ContentCardFoot.svelte";
    import ContentCardHero from "@/components/ContentCardHero.svelte";
    import ContentHeader from "@/components/ContentHeader.svelte";

    type ProjectMeta = {
        slug: string;
        title: string;
        description: string;
        image: string;
        tags: string[];
        date: string;
    };

    const projectsMeta: ProjectMeta[] = [
        {
            slug: "biblioteca-fis",
            title: "Biblioteca especializada FIS",
            description: "Sistema de gestión para biblioteca universitaria",
            image: "/images/proyecto1.png",
            tags: ["laravel", "php", "react", "mysql", "web"],
            date: "2025-08",
        },
        {
            slug: "music-wrap",
            title: "MusicWrap",
            description: "Administrador de librería musical",
            image: musicwrap,
            tags: ["c#", "wpf", "windows"],
            date: "2026-01",
        },
        {
            slug: "portfolio",
            title: "Portfolio",
            description:
                "Sitio web personal para mostrar proyectos y habilidades",
            image: portfolio,
            tags: ["svelte", "tailwind", "web"],
            date: "2025-03",
        },
    ];
</script>

<main class="max-w-screen-xl mx-auto px-5 pt-10 pb-20">
    <ContentHeader
        numeration="§ 03"
        subtitle="Proyectos"
        title="Trabajos desarrollados en el marco de mis estudios."
        description="Una colección de proyectos personales y académicos que reflejan mi crecimiento y aprendizaje en el ámbito del desarrollo web."
    />

    <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0"
    >
        {#each projectsMeta as project (project.slug)}
            <li class="min-w-0">
                <ContentCard href={`/proyectos/${project.slug}`}>
                    <ContentCardHero>
                        <img
                            src={project.image}
                            alt={`Imagen del proyecto ${project.title}`}
                            class="w-full h-48 object-cover rounded-t"
                        />
                    </ContentCardHero>
                    <ContentCardBody
                        title={project.title}
                        topic={project.description}
                    />
                    <ContentCardFoot tags={project.tags} sheets={2} />
                </ContentCard>
            </li>
        {/each}
    </ul>
</main>
