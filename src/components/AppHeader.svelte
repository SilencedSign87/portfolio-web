<script lang="ts">
    import { router } from "svelte-spa-router";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import logo from "../assets/logo.png";
    import Anchor from "./Anchor.svelte";

</script>

<header class="flex items-center justify-between p-4">
    <div>
        <div class="flex items-center justify-center">
            <Anchor class="p-0 m-0 mr-2" appearance="transparent" href="/">
                <img src={logo} alt="Logo" class="w-10 h-10 rounded" />
            </Anchor>
            <h1>My Portfolio</h1>
        </div>
    </div>

    <nav class="flex items-center justify-end">
        <Anchor appearance="transparent" href="/cuadernos" active={router.location.startsWith('/cuadernos')}>Cuadernos</Anchor>
        <ThemeSwitcher />
    </nav>
</header>
