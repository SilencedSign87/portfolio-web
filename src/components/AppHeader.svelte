<script lang="ts">
    import { router } from "svelte-spa-router";
    import { Menu, X } from "@lucide/svelte/icons";
    import Anchor from "./Anchor.svelte";
    import Button from "./Button.svelte";
    import { CurrentPageURL } from "@/data/info";
    import GithubIcon from "./icons/GithubIcon.svelte";

    let isOpen = $state(false);

    const navItems = [
        { label: "Index", href: "/", match: "/" },
        { label: "Cuadernos", href: "/cuadernos", match: "/cuadernos" },
    ];

    function isActive(match: string) {
        if (match === "/") return router.location === "/";
        return router.location.startsWith(match);
    }
</script>

<header class="site-header">
    <div class="site-header__bar">
        <div class="site-header__bar-inner">
            <span class="site-header__field">
                <span class="site-header__field-label">Hoja</span>
                <span class="site-header__field-value">01 / 01</span>
            </span>
            <span class="site-header__field hidden md:inline-flex">
                <span class="site-header__field-label">Proyecto</span>
                <span class="site-header__field-value">{CurrentPageURL}</span>
            </span>
            <span class="site-header__field">
                <span class="site-header__field-label">Estado</span>
                <span class="site-header__field-value site-header__field-value--ok">
                    <span class="site-header__dot"></span>
                    En progreso
                </span>
            </span>
        </div>
    </div>

    <div class="site-header__main">
        <div class="site-header__main-inner">
            <span class="site-header__brand-wrap">
                <Anchor href="/" appearance="ghost" class="site-header__brand">
                    <span class="site-header__brand-mark" aria-hidden="true">
                        <svg viewBox="0 0 32 32" class="w-full h-full">
                            <rect x="2" y="2" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"/>
                            <line x1="2" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="1.5"/>
                            <line x1="2" y1="22" x2="30" y2="22" stroke="currentColor" stroke-width="1.5"/>
                            <line x1="10" y1="2" x2="10" y2="30" stroke="currentColor" stroke-width="1.5"/>
                            <line x1="22" y1="2" x2="22" y2="30" stroke="currentColor" stroke-width="1.5"/>
                            <circle cx="16" cy="16" r="3" fill="currentColor"/>
                        </svg>
                    </span>
                    <span class="site-header__brand-text">
                        <span class="site-header__brand-title">Bruno Diaz</span>
                        <span class="site-header__brand-sub">
                            // silencedsign87 — portfolio
                        </span>
                    </span>
                </Anchor>
            </span>

            <nav class="site-header__nav">
                {#each navItems as item (item.href)}
                    <Anchor
                        href={item.href}
                        appearance="ghost"
                        active={isActive(item.match)}
                        class="site-header__nav-link"
                    >
                        <span class="site-header__nav-prefix">/</span>
                        {item.label.toLowerCase()}
                    </Anchor>
                {/each}
                <a
                    href="https://github.com/silencedsign87"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="site-header__nav-link"
                >
                    <GithubIcon size={14} />
                    github
                </a>
            </nav>

            <div class="site-header__mobile-actions">
                <Button
                    appearance="outline"
                    size="icon"
                    onclick={() => (isOpen = !isOpen)}
                    aria-label="Menú"
                >
                    {#if isOpen}
                        <X size={18} />
                    {:else}
                        <Menu size={18} />
                    {/if}
                </Button>
            </div>
        </div>
    </div>

    {#if isOpen}
        <div class="site-header__mobile-menu">
            {#each navItems as item (item.href)}
                <Anchor
                    href={item.href}
                    appearance="ghost"
                    active={isActive(item.match)}
                    class="site-header__mobile-link"
                    onclick={() => (isOpen = false)}
                >
                    <span class="site-header__nav-prefix">/</span>
                    {item.label.toLowerCase()}
                </Anchor>
            {/each}
            <a
                href="https://github.com/silencedsign87"
                target="_blank"
                rel="noopener noreferrer"
                class="site-header__mobile-link"
            >
                <GithubIcon size={14} />
                github.com/silencedsign87
            </a>
        </div>
    {/if}
</header>

<style>
    .site-header {
        position: relative;
        background-color: var(--paper-bg);
        border-bottom: 1px solid var(--ink);
    }

    .site-header__bar {
        background-color: var(--ink);
        color: #ffffff;
        font-family: var(--font-mono);
    }

    .site-header__bar-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 6px 20px;
        display: flex;
        align-items: center;
        gap: 32px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .site-header__field {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        opacity: 0.85;
    }

    .site-header__field-label {
        opacity: 0.55;
    }

    .site-header__field-value {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .site-header__field-value--ok {
        color: #b6f3c4;
    }

    .site-header__dot {
        width: 6px;
        height: 6px;
        background: currentColor;
        display: inline-block;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }

    .site-header__main {
        position: relative;
    }

    .site-header__main-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }

    .site-header__brand-wrap {
        display: inline-flex;
        align-items: center;
    }

    .site-header :global(.site-header__brand) {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
        color: var(--on-surface);
    }

    .site-header__brand-mark {
        width: 40px;
        height: 40px;
        color: var(--ink);
        flex-shrink: 0;
        transition: transform 200ms ease;
    }

    .site-header :global(.site-header__brand:hover .site-header__brand-mark) {
        transform: rotate(45deg);
    }

    .site-header__brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
    }

    .site-header__brand-title {
        font-family: var(--font-display);
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--on-surface);
    }

    .site-header__brand-sub {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--outline);
        margin-top: 4px;
        letter-spacing: 0.04em;
    }

    .site-header__nav {
        display: none;
        align-items: center;
        gap: 4px;
    }

    @media (min-width: 768px) {
        .site-header__nav {
            display: flex;
        }
    }

    .site-header__nav-link {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 8px 12px;
        color: var(--on-surface);
        text-decoration: none;
        border: 1px solid transparent;
        transition: all 100ms ease;
        border-radius: 0;
    }

    .site-header__nav-link:hover {
        color: var(--ink);
        background-color: var(--secondary-container);
    }

    .site-header__nav-prefix {
        color: var(--ink);
    }

    .site-header__mobile-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    @media (min-width: 768px) {
        .site-header__mobile-actions {
            display: none;
        }
    }

    .site-header__mobile-menu {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--outline-variant);
        padding: 8px 0;
        background-color: var(--surface-container-low);
    }

    @media (min-width: 768px) {
        .site-header__mobile-menu {
            display: none;
        }
    }

    .site-header__mobile-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        font-family: var(--font-mono);
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--on-surface);
        text-decoration: none;
        border-bottom: 1px solid var(--outline-variant);
    }

    .site-header__mobile-link:last-child {
        border-bottom: none;
    }
</style>
