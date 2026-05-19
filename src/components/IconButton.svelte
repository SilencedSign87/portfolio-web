<script lang="ts">
	import Button from "./Button.svelte";
	import { twMerge } from "tailwind-merge";
	import type { buttonAppearance } from "../styles/Button.styles";

	export let appearance: buttonAppearance = "default";
	export let active: boolean = false;

	let className = "";
	export { className as class };

	$: hasTextSlot = $$slots.text;

	const baseClasses = "grid items-center";
	let classes = "";
	$: classes = twMerge(
		baseClasses,
		hasTextSlot
			? "grid-cols-[auto_1fr] gap-2"
			: "aspect-square justify-center",
		className,
	);
</script>

<Button
	{appearance}
	{active}
	class={classes}
	on:click
	on:focus
	on:blur
	on:keydown
	on:mouseenter
	on:mouseleave
	{...$$restProps}
>
	<slot name="icon" />
	<div class="flex items-center justify-start">
		<slot name="text" />
	</div>
</Button>
