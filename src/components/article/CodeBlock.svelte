<script lang="ts">
    import { onMount } from "svelte";
    import { Copy, Check } from "@lucide/svelte/icons";

    type Props = {
        code: string;
        language?: string;
        filename?: string | null;
        class?: string;
    };

    let {
        code,
        language = "javascript",
        filename = null,
        class: className = "",
    }: Props = $props();

    let isCopied = $state(false);
    let preRef: HTMLPreElement | undefined = $state();

    const langMap: Record<string, string> = {
        typescript: "typescript",
        javascript: "javascript",
        html: "xml",
        css: "css",
    };

    onMount(() => {
        let cancelled = false;

        void import("highlight.js/lib/core").then(async (mod) => {
            if (cancelled) return;
            const hljs = mod.default;
            const lang = langMap[language] ?? "javascript";

            switch (lang) {
                case "typescript": {
                    const ts = await import("highlight.js/lib/languages/typescript");
                    hljs.registerLanguage("typescript", ts.default);
                    break;
                }
                case "javascript": {
                    const js = await import("highlight.js/lib/languages/javascript");
                    hljs.registerLanguage("javascript", js.default);
                    break;
                }
                case "xml": {
                    const xml = await import("highlight.js/lib/languages/xml");
                    hljs.registerLanguage("xml", xml.default);
                    break;
                }
                case "css": {
                    const css = await import("highlight.js/lib/languages/css");
                    hljs.registerLanguage("css", css.default);
                    break;
                }
            }

            if (!cancelled && preRef) {
                preRef.innerHTML = hljs.highlight(code, { language: lang }).value;
            }
        });

        return () => {
            cancelled = true;
        };
    });

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(code);
            isCopied = true;
            setTimeout(() => (isCopied = false), 1800);
        } catch {
            /* noop */
        }
    }
</script>

<figure class="my-6 border border-ink bg-surface-container-lowest {className}">
    <figcaption class="flex items-center gap-3 px-3.5 py-2 border-b border-ink bg-secondary-container font-mono text-[11px] uppercase tracking-wider text-on-secondary-container">
        <span class="text-ink font-bold">{language}</span>
        {#if filename}
            <span class="text-on-secondary-container opacity-70">{filename}</span>
        {/if}
        <button
            onclick={copyCode}
            aria-label="Copiar código"
            title="Copiar"
            class="ml-auto inline-flex items-center gap-1.5 px-2 py-1 bg-transparent border border-outline-variant text-on-secondary-container font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all duration-100 hover:bg-ink hover:text-on-ink hover:border-ink"
        >
            {#if isCopied}
                <Check size={12} />
                <span>copied</span>
            {:else}
                <Copy size={12} />
                <span>copy</span>
            {/if}
        </button>
    </figcaption>
    <pre bind:this={preRef} class="code-content p-3.5 overflow-x-auto text-sm leading-relaxed m-0">{code}</pre>
</figure>
