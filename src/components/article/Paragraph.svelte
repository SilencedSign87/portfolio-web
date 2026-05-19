<script lang="ts">
    export let className: string = "";
</script>

<p
    class="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed mb-5 mt-2 indent-8 {className}"
>
    <slot />
</p>
