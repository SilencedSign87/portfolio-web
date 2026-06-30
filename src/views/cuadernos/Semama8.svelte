<script>
    import ArticleHeader from "@/components/article/ArticleHeader.svelte";
    import Paper from "@/components/article/Paper.svelte";
    import Paragraph from "@/components/article/Paragraph.svelte";

</script>
<main class="cuaderno">
    <Paper sheet="08" revision="A">
        {#snippet title()}Semana 08 — Consolidado{/snippet}
        <ArticleHeader
            number="08.00"
            title="Consolidado"
            description="Nada esta semana, solo notas"
        >
        </ArticleHeader>
    </Paper>
</main>