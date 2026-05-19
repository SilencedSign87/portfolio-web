<script lang="ts">
    import {
        buttonStyles,
        type buttonAppearance,
    } from "../styles/Button.styles";
    import { twMerge } from "tailwind-merge";

    export let appearance: buttonAppearance = "default";
    export let active: boolean = false;
    let className: string = "";
    export { className as class };

    let classes: string = "";
    $: classes = twMerge(buttonStyles({ appearance, active }), className);
</script>

<button
    class={classes}
    on:click
    on:focus
    on:blur
    on:keydown
    on:mouseenter
    on:mouseleave
    {...$$restProps}
>
    <slot />
</button>
