<script lang="ts">
    import Button from "./Button.svelte";
    import { twMerge } from "tailwind-merge";
    import type { ButtonVariants } from "../styles/Button.styles";

    type $$Props = ButtonVariants & {
        class?: string;
        icon?: import("svelte").Snippet;
        text?: import("svelte").Snippet;
    };

    let {
        appearance = "outline",
        size = "md",
        block = false,
        active = false,
        class: className = "",
        icon,
        text,
        ...rest
    }: $$Props = $props();

    let classes = $derived(
        twMerge(
            hasText(text) || hasIcon(icon) ? "inline-flex" : "aspect-square",
            className,
        ),
    );

    function hasText(snippet: unknown): boolean {
        return typeof snippet === "function";
    }
    function hasIcon(snippet: unknown): boolean {
        return typeof snippet === "function";
    }
</script>

<Button
    {appearance}
    {size}
    {block}
    {active}
    class={classes}
    {...rest}
>
    {#if icon}{@render icon()}{/if}
    {#if text}{@render text()}{/if}
</Button>
