
<script>
import {fade} from 'svelte/transition';
import { settings_toggle } from "./Stores/stores.js";
import Button from './Components/Button.svelte';

function saveAndExit(){
    console.log("bye");
}


</script>

{#if $settings_toggle}
    <div class="overlay settings" transition:fade>
        <p>Esto son los ajustes</p>
        <div>
            <Button on:click={ () => { saveAndExit(); settings_toggle.set(false); }}>Guardar y salir</Button>
            <Button on:click={ () => { settings_toggle.set(false) }}>Salir</Button>
        </div>
    </div>
{/if}


<style>
    div.settings{
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 0.85;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 5;
    }
</style>