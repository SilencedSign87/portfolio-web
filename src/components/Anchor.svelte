<script lang="ts">
    import { push } from "svelte-spa-router";
    import {
        buttonStyles,
        type buttonAppearance,
    } from "../styles/Button.styles";
    import { twMerge } from "tailwind-merge";

    export let href: string = "";
    export let appearance: buttonAppearance = "default";
    export let active: boolean = false;
    export { className as class };
    
    let className: string = "";
    let classes: string = "";
    $: classes = twMerge(buttonStyles({ appearance, active }), className);
    function handleClick(event: MouseEvent) {
        if (href) {
            event.preventDefault();
            push(href);
        }
    }
</script>

<a
    {href}
    class={classes}
    on:click={handleClick}
    on:focus
    on:blur
    on:keydown
    on:mouseenter
    on:mouseleave
    {...$$restProps}
>
    <slot />
</a>
