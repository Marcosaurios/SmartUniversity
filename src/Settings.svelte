
<script>
import {fade} from 'svelte/transition';
import { settings_toggle, weights, buildings_status, cookiesUse } from "./Stores/stores.js";
import Button from './Components/Button.svelte';
import Slider from './Components/Slider.svelte';
import Switch from './Components/Switch.svelte';
import {setCookie, removeCookie} from './Components/setCookie.svelte';
import API, {getData} from "./API.svelte";

import { _, isLoaded, locale } from "./Services/Internationalization.js";

let wifiDownSettings = $weights.wifid;
let wifiUpSettings = $weights.wifiu;
let energySettings = $weights.energy;
let weatherSettings = $weights.weather;
let cookies = $cookiesUse;

// $: cookies = $cookiesUse; // initialise to store
// $: console.log("checked value", cookies);
$: if($cookiesUse) cookies = $cookiesUse;

export let smartUniversityInstance = null;

async function saveAndExit(){

    weights.set({
        wifid: wifiDownSettings,
        wifiu: wifiUpSettings,
        energy: energySettings,
        weather: weatherSettings
    })

    cookiesUse.set(cookies);
    setCookie("cookiesUse", $cookiesUse);

    if(cookies){
        setCookie("data", JSON.stringify($weights));
        setCookie("lang", $locale);
    }
    else{
        removeCookie("data");
        removeCookie("lang");
    }

    let data = await getData($weights);
    buildings_status.set(data);

    smartUniversityInstance.updateStatus($buildings_status);
}


</script>

{#if $settings_toggle && isLoaded}
    <div class="overlay settings align" transition:fade>
        <h2>{$_('settings.name')}</h2>
        <div class="container">
            <p class="subtitle">{$_('settings.description')}</p>
            <div class="align">
                <h3>{$_('settings.wifiup')}</h3>
                <div class="value">
                    <Slider min={0} max={1} bind:value={wifiUpSettings} step={0.01}></Slider>
                    <p>{wifiUpSettings}</p>
                </div>
            </div>
            
            <div class="align">
                <h3>{$_('settings.wifidown')}</h3>
                <div class="value">
                    <Slider min={0} max={1} bind:value={wifiDownSettings} step={0.01}></Slider>
                    <p>{wifiDownSettings}</p>
                </div>
            </div>            
            
            <div class="align">
                <h3>{$_('settings.energy')}</h3>
                <div class="value">
                    <Slider min={0} max={1} bind:value={energySettings} step={0.01}></Slider>
                    <p>{energySettings}</p>
                </div>
            </div>

            <div class="align">
                <h3>{$_('settings.weather')}</h3>
                <div class="value">
                    <Slider min={0} max={1} bind:value={weatherSettings} step={0.01}></Slider>
                    <p>{weatherSettings}</p>
                </div>
            </div>
            
            <div class="align">
                <div class="value">
                    <Switch bind:checked={cookies} name={$_('settings.cookies')} horizontal={true}></Switch>
                </div>
            </div>                 

        
        </div>
        <div class="value">
            <Button big on:click={ () => { saveAndExit(); settings_toggle.set(false); }}>{$_('settings.save')}</Button>
            <Button big on:click={ () => { settings_toggle.set(false); removeCookie("data") }} secondary>{$_('settings.exit')}</Button>
        </div>
    </div>
{/if}


<style>
    h2, h3{
        color: white;
        margin-bottom: 0;
    }

    p{
        font-size: 1em;
        color: white;
    }

    .container {
        padding: 15px;
    }

    .align {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .align p {
        margin: 0 10px;
        font-weight: 350;
    }

    .subtitle {
        font-weight: 500;
        padding: 1em;
        margin: 0;
    }

    .value{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }


    .value p:last-child{
        width: 100px;
        text-align: center;
        /* height: 4_ */
    }

    div.settings{
        width: 100vw;
        height: -webkit-fill-available;
        background-color: black;
        opacity: 0.85;

        z-index: 5;

        margin: 0;
        padding-top: 70px;
    }
</style>