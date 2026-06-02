<script lang="ts">
    import { onMount, onDestroy } from "svelte";
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

    let editorContainer: HTMLDivElement;
    let editor: any = null;
    let isCopied = $state(false);

    let monacoRef: any = null;

    onMount(() => {
        let mounted = true;

        void import("monaco-editor").then((monaco) => {
            if (!mounted) return;

            monaco.editor.defineTheme("blueprint-light", {
                base: "vs",
                inherit: true,
                rules: [
                    { token: "comment", foreground: "78767f", fontStyle: "italic" },
                    { token: "keyword", foreground: "423d6c", fontStyle: "bold" },
                    { token: "string", foreground: "c2410c" },
                    { token: "number", foreground: "5a5485" },
                    { token: "type", foreground: "464170" },
                ],
                colors: {
                    "editor.background": "#fcf8ff",
                    "editor.foreground": "#1c1a26",
                    "editor.lineHighlightBackground": "#f1ebfd",
                    "editor.lineHighlightBorder": "#f1ebfd",
                    "editorLineNumber.foreground": "#c9c5d0",
                    "editorLineNumber.activeForeground": "#423d6c",
                    "editor.selectionBackground": "#e5deff",
                    "editor.inactiveSelectionBackground": "#f1ebfd",
                },
            });

            const lines = code.split("\n").length;
            const computedHeight = Math.max(lines * 19 + 24, 60);

            editor = monaco.editor.create(editorContainer, {
                value: code,
                language,
                readOnly: true,
                theme: "blueprint-light",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 13,
                fontFamily: "Space Mono, ui-monospace, monospace",
                fontLigatures: false,
                lineNumbers: "on",
                renderLineHighlight: "none",
                overviewRulerBorder: false,
                scrollbar: {
                    vertical: "hidden",
                    horizontal: "auto",
                    alwaysConsumeMouseWheel: false,
                },
                padding: { top: 14, bottom: 14 },
                automaticLayout: true,
            });

            editor.layout({
                width: editorContainer.clientWidth,
                height: computedHeight,
            });

            monacoRef = monaco;
        });

        return () => {
            mounted = false;
        };
    });

    onDestroy(() => {
        editor?.dispose();
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

<figure class="code-block {className}">
    <figcaption class="code-block__head">
        <span class="code-block__lang">{language}</span>
        {#if filename}
            <span class="code-block__file">{filename}</span>
        {/if}
        <button
            class="code-block__copy"
            onclick={copyCode}
            aria-label="Copiar código"
            title="Copiar"
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
    <div bind:this={editorContainer} class="code-block__editor"></div>
</figure>

<style>
    .code-block {
        margin: 24px 0;
        border: 1px solid var(--ink);
        background: var(--surface-container-lowest);
    }

    .code-block__head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 14px;
        border-bottom: 1px solid var(--ink);
        background: var(--secondary-container);
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--on-secondary-container);
    }

    .code-block__lang {
        color: var(--ink);
        font-weight: 700;
    }

    .code-block__file {
        color: var(--on-secondary-container);
        opacity: 0.7;
    }

    .code-block__copy {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        background: transparent;
        border: 1px solid var(--outline-variant);
        color: var(--on-secondary-container);
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        cursor: pointer;
        transition: all 100ms ease;
    }

    .code-block__copy:hover {
        background: var(--ink);
        color: var(--color-on-ink, #fff);
        border-color: var(--ink);
    }

    .code-block__editor {
        width: 100%;
    }
</style>
