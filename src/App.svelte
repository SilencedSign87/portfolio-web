<script lang="ts">
    import AppHeader from "./components/AppHeader.svelte";
    import Router from "svelte-spa-router";
    import Home from "./views/Home.svelte";
    import CuadernosIndex from "./views/cuadernos/CuadernosIndex.svelte";
    import { CurrentPageURL } from "./data/info";
    import ProjectsIndex from "./views/proyectos/ProjectsIndex.svelte";

    const routes = {
        "/": Home,
        "/cuadernos": CuadernosIndex,
        "/cuadernos/*": CuadernosIndex,
        "/proyectos": ProjectsIndex,
    };
</script>

<!-- Technical Margin: 1px line 20px from edge framing the content like a drafting sheet -->
<div class="technical-margin" aria-hidden="true"></div>

<div class="app">
    <AppHeader />
    <Router {routes} />
</div>

<footer class="app-footer">
    <div class="app-footer__inner">
        <span class="app-footer__cell">
            <span class="app-footer__label">DWG</span>
            {CurrentPageURL}
        </span>
        <span class="app-footer__cell">
            <span class="app-footer__label">REV</span>
            A · 2026
        </span>
        <span class="app-footer__cell app-footer__cell--right">
            <span class="app-footer__label">PAPEL</span>
            {new Date().toISOString().slice(0, 10)}
        </span>
    </div>
</footer>

<style>
    .technical-margin {
        position: fixed;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        border: 1px solid var(--outline-variant);
        pointer-events: none;
        z-index: 1;
    }

    .app {
        position: relative;
        z-index: 2;
        min-height: 100vh;
    }

    .app-footer {
        position: relative;
        z-index: 2;
        border-top: 1px solid var(--ink);
        background: var(--paper-bg);
    }

    .app-footer__inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 24px;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--outline);
    }

    .app-footer__cell {
        display: inline-flex;
        align-items: baseline;
        gap: 8px;
    }

    .app-footer__cell--right {
        margin-left: auto;
    }

    .app-footer__label {
        color: var(--ink);
        font-weight: 700;
    }
</style>
