<script>
    import Anchor from "@/components/Anchor.svelte";
    import ArticleHeader from "@/components/article/ArticleHeader.svelte";
    import Paper from "@/components/article/Paper.svelte";
    import Paragraph from "@/components/article/Paragraph.svelte";
</script>

<main class="cuaderno">
    <Paper sheet="16" revision="A">
        {#snippet title()}Semana 16 — Consolidado{/snippet}
        <ArticleHeader
            number="16.00"
            title="Consolidado"
            description="Nada esta semana, solo notas"
        ></ArticleHeader>
        <Paragraph>
            Nada esta semana, solo notas de la semana 15 y 16, ya que no se presento ningun proyecto final.
        </Paragraph>
    </Paper>
</main>
