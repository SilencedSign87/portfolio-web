<script lang="ts">
    import Paper from "@/components/article/Paper.svelte";
    import PostIt from "@/components/PostIt.svelte";
</script>

<article class="project-card">
    <h1 class="text-3xl font-bold">Proyectos</h1>

    <PostIt
        title="En construcción"
        align="left"
        number="01"
        >
        <p>
            Esta sección está en construcción, pronto estará disponible...
        </p>
        </PostIt>
</article>

<style>
.project-card {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
