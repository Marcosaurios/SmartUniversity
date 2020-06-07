<script>
import {fade} from 'svelte/transition';
    
import {setCookie} from './Components/setCookie.svelte';
import Button from './Components/Button.svelte';


import { help_toggle } from "./Stores/stores.js";

help_toggle.set( setCookie("showHelp", "true") );

</script>

<style>
    div{
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 0.6;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>

{#if $help_toggle}
<div class="overlay" transition:fade>
    <p>esta es la ayuda</p>
    <Button on:click={ () => help_toggle.set(false)}>SALIR DE AQUI PORFA</Button>
</div>
{/if}
