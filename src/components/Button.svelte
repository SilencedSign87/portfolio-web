<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import {
        buttonStyles,
        type ButtonVariants,
    } from "../styles/Button.styles";
    import type { HTMLButtonAttributes } from "svelte/elements";

    type $$Props = ButtonVariants & {
        class?: string;
        children?: import("svelte").Snippet;
        icon?: import("svelte").Snippet;
        text?: import("svelte").Snippet;
    } & Omit<HTMLButtonAttributes, "children" | "class" | "size">;

    let {
        appearance = "outline",
        size = "md",
        block = false,
        active = false,
        class: className = "",
        children,
        icon,
        text,
        ...rest
    }: $$Props = $props();

    let classes = $derived(
        twMerge(buttonStyles({ appearance, size, block, active }), className),
    );
</script>

<button class={classes} {...rest}>
    {#if icon}{@render icon()}{/if}
    {#if text}{@render text()}{/if}
    {#if children}{@render children()}{/if}
</button>
