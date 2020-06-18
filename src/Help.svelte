<script>
import {fade} from 'svelte/transition';
    
import {setCookie } from './Components/setCookie.svelte';
import Button from './Components/Button.svelte';


import { help_toggle, firstVisit } from "./Stores/stores.js";

// Is first time?
firstVisit.set( setCookie("firstVisit", "true") );
help_toggle.set( $firstVisit );

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
