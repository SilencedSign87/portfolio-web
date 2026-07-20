<script>
    import Anchor from "@/components/Anchor.svelte";
    import ArticleHeader from "@/components/article/ArticleHeader.svelte";
import Paper from "@/components/article/Paper.svelte";
    import Paragraph from "@/components/article/Paragraph.svelte";

</script>
<main class="cuaderno">
    <Paper sheet="15" revision="A">
        {#snippet title()}Semana 15 — Proyectos{/snippet}
        <ArticleHeader
            number="15.00"
            title="Proyectos"
            description="Nada esta semana, solo un proyecto"
        >
        </ArticleHeader>
        <Paragraph>
            Esta semana se presentó un proyecto final, el cual consistia en hacer un sistema académico
        </Paragraph>
        <Anchor href="https://github.com/SilencedSign87/final-desarrollo-software">Repositorio del proyecto</Anchor>
        <Anchor href="https://frontend-react-ycrw.onrender.com/">Desplegado (puede que ya no funcione)</Anchor>
    </Paper>
</main>