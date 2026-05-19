<script lang="ts">
  import AppHeader from "./components/AppHeader.svelte";
  import Router from 'svelte-spa-router'
  import Home from './views/Home.svelte';
    import CuadernosIndex from "./views/cuadernos/CuadernosIndex.svelte";

  const routes = {
    "/": Home,
    "/cuadernos": CuadernosIndex,
    "/cuadernos/*": CuadernosIndex,
  };

</script>

<AppHeader />

<Router {routes} />