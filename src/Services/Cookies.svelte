<script>

import { fade } from "svelte/transition";

import Button from "../Components/Button.svelte";
import { cookiesUse, firstVisit } from "../Stores/stores.js";

let cookiesConsent;
$: {cookiesConsent = $firstVisit;}

function saveCookies(status){
    cookiesUse.set(status);
    cookiesConsent = false;
}
</script>

<style>
    div.overlay{

        width: 80vw;
        max-width: 470px;
        height: auto;
        position: absolute;
        left: 50%;
        bottom: 10px;
        background-color: #333333;
        margin: 0 auto;
        transform: translateX(-50%);
        padding: 1em;
    }

    div.overlay div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
    }

    p {
        text-align: center;
        margin: 10px;
        color: white;
    }

</style>


{#if cookiesConsent}
    <div class="overlay" transition:fade>
        <p class="small">¿Quieres guardar tus preferencias para la siguiente visita? Usamos cookies para estadísticas y guardar tus ajustes</p>
        <div>
            <Button on:click={ () => { saveCookies(true)}}> Aceptar</Button>
            <Button on:click={ () => { saveCookies(false)}} secondary> Noup</Button>
        </div>
    </div>
{/if}