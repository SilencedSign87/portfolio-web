<script lang="ts">
    import { ArrowRight } from "@lucide/svelte/icons";
    import Anchor from "./Anchor.svelte";

    type Props = {
        number: string;
        title: string;
        description: string;
        href: string;
        external?: boolean;
    };

    let {
        number,
        title,
        description,
        href,
        external = false,
    }: Props = $props();
</script>

<li class="border-b border-outline-variant">
    <Anchor
        {href}
        {external}
        appearance="ghost"
        class="group grid grid-cols-[60px_1fr_auto] items-center gap-5 px-2 py-5 text-on-surface no-underline font-mono transition-[background-color,padding] duration-100 hover:bg-ink-container hover:text-on-ink-container hover:pl-4"
    >
        <span class="font-mono text-[11px] font-bold text-ink tracking-wider">
            {number}
        </span>
        <span class="flex flex-col gap-1">
            <span class="font-display text-xl font-semibold tracking-tight">
                {title}
            </span>
            <span class="text-xs text-on-ink-container/80">
                {description}
            </span>
        </span>
        <ArrowRight
            size={16}
            class="transition-transform duration-100 group-hover:translate-x-1 group-hover:text-ink"
        />
    </Anchor>
</li>
