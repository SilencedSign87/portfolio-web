<script lang="ts">
    import { onMount } from 'svelte';

    let {
        lightSrc,
        darkSrc,
        alt = "",
        width = null,
        height = null,
        className = ""
    } = $props();

    let isDark = $state(false);

    onMount(() => {
        const observer = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains('dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        isDark = document.documentElement.classList.contains('dark');

        return () => observer.disconnect();
    });

    let src = $derived(isDark ? darkSrc : lightSrc);
</script>

<img src={src} {alt} {width} {height} class={className} />
