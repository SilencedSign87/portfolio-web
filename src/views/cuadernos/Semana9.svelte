<script>
    import ArticleHeader from "@/components/article/ArticleHeader.svelte";
    import Paper from "@/components/article/Paper.svelte";
    import Paragraph from "@/components/article/Paragraph.svelte";
    import ThemeImage from "@/components/ThemeImage.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
</script>

<main class="cuaderno">
    <Paper sheet="09" revision="A">
        {#snippet title()}Semana 09 — Tecnologías Web Backend{/snippet}
        <ArticleHeader
            number="09.00"
            title="Tecnologías Web Backend"
            description="Arquitectura de aplicaciones web, servidores web y funcionamiento de server-side"
        >
            {#snippet before()}
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    class="w-full h-64 object-cover"
                />
            {/snippet}
        </ArticleHeader>
        <Paragraph>
            
        </Paragraph>
    </Paper>
</main>
