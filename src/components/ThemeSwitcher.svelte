<script lang="ts">
    import { Sun, Moon, Monitor } from "@lucide/svelte/icons";
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import IconButton from "./IconButton.svelte";

    type Theme = "system" | "light" | "dark";

    let container: HTMLUListElement;
    let currentTheme: Theme = "system";
    let isOpen = false;
    let isDark = false;

    const STORAGE_KEY = "theme-preference";

    function getSystemTheme(): "light" | "dark" {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
        return "light";
    }

    function applyTheme(theme: Theme) {
        const html = document.documentElement;

        if (theme === "system") {
            isDark = getSystemTheme() === "dark";
        } else {
            isDark = theme === "dark";
        }

        if (isDark) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }

    function setTheme(theme: Theme) {
        currentTheme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
        isOpen = false;
    }

    onMount(() => {
        // Cargar preferencia guardada o usar "system" por defecto
        const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
        currentTheme = savedTheme || "system";

        // Aplicar el tema
        applyTheme(currentTheme);

        // Escuchar cambios en el tema del sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (currentTheme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        document.addEventListener("pointerdown", (event) => {
            if (
                isOpen &&
                container &&
                !container.contains(event.target as Node)
            ) {
                isOpen = false;
            }
        });

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    });

    function getCurrentThemeLabel(): string {
        if (currentTheme === "system") return "Sistema";
        return currentTheme === "light" ? "Claro" : "Oscuro";
    }

    function getCurrentThemeIcon() {
        if (currentTheme === "system") return Monitor;
        return currentTheme === "light" ? Sun : Moon;
    }
</script>

<div class="relative w-8 h-8">
    <Button
        appearance="subtle"
        on:click={() => (isOpen = !isOpen)}
        title={getCurrentThemeLabel()}
        class="p-0 h-full w-full"
    >
        <svelte:component this={getCurrentThemeIcon()} size={18} />
    </Button>

    {#if isOpen}
        <ul
            bind:this={container}
            class="absolute top-0 right-0 flex flex-col rounded shadow-2xl bg-white dark:bg-neutral-800 border border-black/20 dark:border-white/5 overflow-hidden mt-1 z-50"
        >
            <li>
                <IconButton
                    appearance="subtle"
                    on:click={() => setTheme("system")}
                    active={currentTheme === "system"}
                    class="w-full rounded-none"
                >
                    <span slot="icon">
                        <Monitor size={16} />
                    </span>
                    <span slot="text">Sistema</span>
                </IconButton>
            </li>
            <li>
                <IconButton
                    appearance="subtle"
                    on:click={() => setTheme("light")}
                    active={currentTheme === "light"}
                    class="w-full rounded-none"
                >
                    <span slot="icon">
                        <Sun size={16} />
                    </span>
                    <span slot="text">Claro</span>
                </IconButton>
            </li>
            <li>
                <IconButton
                    appearance="subtle"
                    on:click={() => setTheme("dark")}
                    active={currentTheme === "dark"}
                    class="w-full rounded-none"
                >
                    <span slot="icon">
                        <Moon size={16} />
                    </span>
                    <span slot="text">Oscuro</span>
                </IconButton>
            </li>
        </ul>
    {/if}
</div>
