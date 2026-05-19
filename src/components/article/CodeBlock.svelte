<script lang="ts">
    import * as monaco from 'monaco-editor';
    import { onMount, onDestroy } from 'svelte';

    let {
        code = '',
        language = 'javascript',
        height = 'auto',
        className = '',
    }: {
        code: string;
        language?: string;
        height?: string;
        className?: string;
    } = $props();

    let editorContainer: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;
    let isDark = $state(false);

    onMount(() => {
        const observer = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains('dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        isDark = document.documentElement.classList.contains('dark');

        const lines = code.split('\n').length;
        const computedHeight = height === 'auto'
            ? Math.max(lines * 22 + 20, 60)
            : parseInt(height);

        editor = monaco.editor.create(editorContainer, {
            value: code,
            language,
            readOnly: true,
            theme: isDark ? 'vs-dark' : 'vs',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: 'on',
            renderLineHighlight: 'none',
            overviewRulerBorder: false,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'auto',
                alwaysConsumeMouseWheel: false,
            },
            padding: { top: 10, bottom: 10 },
            automaticLayout: true,
            dimension: { width: 0, height: 0 },
        });

        editor.layout({ width: editorContainer.clientWidth, height: computedHeight });

        return () => observer.disconnect();
    });

    $effect(() => {
        if (editor) {
            monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
        }
    });

    onDestroy(() => {
        editor?.dispose();
    });
</script>

<div
    bind:this={editorContainer}
    class="rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 my-4 {className}"
></div>
