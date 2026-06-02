<script lang="ts">
    import { ArrowUpRight } from "@lucide/svelte/icons";
    import { push } from "svelte-spa-router";
    import type { Snippet } from "svelte";

    type Props = {
        href?: string;
        external?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        href = "",
        external = false,
        class: className = "",
        children,
    }: Props = $props();

    function handleClick(event: MouseEvent) {
        if (!external && href) {
            event.preventDefault();
            push(href);
        }
    }
</script>

<a
    {href}
    onclick={handleClick}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    class="group relative flex flex-col h-full bg-surface-container-lowest border border-ink text-on-surface no-underline transition-transform duration-150 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)] {className}"
>
    {@render children?.()}
    <div
        class="absolute top-0 right-0 w-7 h-7 flex items-center justify-center bg-ink text-on-ink opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        aria-hidden="true"
    >
        <ArrowUpRight size={14} />
    </div>
</a>
