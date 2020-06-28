<script>
    // Svelte
    import {onMount} from 'svelte';
    import { slide } from "svelte/transition";
    import { help_toggle, settings_toggle } from "./Stores/stores.js";

    // Icons
    import Icon from '@iconify/svelte';
    import webIcon from '@iconify/icons-mdi/web';
    import helpCircleOutline from '@iconify/icons-mdi/help-circle-outline';
    import cogOutline from '@iconify/icons-mdi/cog-outline';

    // Components
    import Button from "./Components/Button.svelte";

    // Locale
    import { _, isLoaded, locale } from "./Services/Internationalization.js";
    
    let language = "esp";

    let ul, div;
    let displayingDropdown = false;
 

    function updateLanguage(lang){
        // hovered = false;
        console.log(lang);
        if(typeof lang === 'string'){
            locale.set(lang);
        }
        toggles();
    }

    function toggles(){
        ul.classList.toggle('hidden');
        ul.classList.toggle('visible');
    }
    

</script>



{#if isLoaded}
    <div class="overlay center">
        <div id="dropdown">
            <Button id="lang" on:click={() => toggles()}>
                <Icon icon={webIcon} style="font-size: 2em"/>
            </Button>
                <ul bind:this={ul} class="hidden" in:slide out:slide>
                    <li><Button listItem active="{$locale=="en"}" on:click={ () => updateLanguage("en") } >{$_('lang.en')}</Button></li>
                    <li><Button listItem active="{$locale=="es"}" on:click={ () => updateLanguage("es") } >{$_('lang.es')}</Button></li>
                    <li><Button listItem active="{$locale=="va"}" on:click={ () => updateLanguage("va") } >{$_('lang.va')}</Button></li>
                </ul>
        </div>
        <div>
            <Button on:click={ () => help_toggle.set(true)}>
                <Icon icon={helpCircleOutline} style="font-size: 2em"/>
            </Button>
        </div>
        <div>
            <Button on:click={ () => settings_toggle.set(true)}>
                <Icon icon={cogOutline} style="font-size: 2em"></Icon>
            </Button>
        </div>
    </div>
{/if}

<style>
    .center{
        position: fixed;
        z-index: 1;
        display: flex;
        justify-content: center;

        width: 100%;
        height: min-content;
        margin: auto;
    }

    .center div{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        height: 46.78px;
    }

    ul {
        margin: 0px;
        list-style: none;
        padding: 0px;
        transition: 200ms;
    }

    /* #dropdown:hover ul {
        opacity: 1;
        visibility: visible;
        transition: 200ms;    
    } */


    :global(.hidden){
        opacity: 0;
        /* display: none; */
        visibility: hidden;
    }

    :global(.visible){
        opacity: 1;
        visibility: visible;
        transition: 200ms;
    }


</style>