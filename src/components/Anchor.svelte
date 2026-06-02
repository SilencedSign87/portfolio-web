<script lang="ts">
    import { push } from "svelte-spa-router";
    import { twMerge } from "tailwind-merge";
    import {
        buttonStyles,
        type ButtonVariants,
    } from "../styles/Button.styles";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type $$Props = ButtonVariants & {
        href?: string;
        external?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
    } & Omit<HTMLAnchorAttributes, "class" | "children" | "href">;

    let {
        href = "",
        external = false,
        appearance = "ghost",
        size = "md",
        block = false,
        active = false,
        class: className = "",
        children,
        ...rest
    }: $$Props = $props();

    let classes = $derived(
        twMerge(buttonStyles({ appearance, size, block, active }), className),
    );

    function handleClick(event: MouseEvent) {
        if (!external && href) {
            event.preventDefault();
            push(href);
        }
    }
</script>

{#if external || !href}
    <a
        {href}
        class={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...rest}
    >
        {@render children?.()}
    </a>
{:else}
    <a {href} class={classes} onclick={handleClick} {...rest}>
        {@render children?.()}
    </a>
{/if}
