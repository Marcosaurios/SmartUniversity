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
    import { _, isLoaded, locale } from "./Services/internationalization.js";
    
    let language = "esp";

    let div;
    let hovered = false;

    onMount( ()=> {
        window.addEventListener("touchend", (e) => {
        //     console.log(e.target);
            if(!div.contains(e.target)){
                // console.log("fuera boton");
                e.preventDefault();
                e.stopPropagation();
                hovered = false;
            }
        })

    })

    function handleTouch(event){
        hovered = true;
    }
    
    function trigger(e){
        e.preventDefault();
        e.stopPropagation();
        hovered = !hovered;
    }

    function updateLanguage(lang){
        // hovered = false;
        console.log(lang);
        // TODO: separate language to component 
        if(typeof lang === 'string'){
            locale.set(lang);
        }
    }

</script>

<style>
    .center{
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;

        width: 100%;
        height: 0px;
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
        opacity: 0;
        /* display: none; */
        visibility: hidden;
        transition: 200ms;
    }
/* 
    div:hover ul {
        opacity: 1;
        visibility: visible;
        transition: 200ms;
    } */

    .visible{
        opacity: 1;
        visibility: visible;
        transition: 200ms;
    }


</style>

{#if isLoaded}
<div class="overlay center">
    <div bind:this={div} on:mouseenter={trigger} on:mouseleave={trigger}>
        <Button id="lang" on:touched={handleTouch}>
            <Icon icon={webIcon} style="font-size: 2em"/>
        </Button>
        <ul class:visible="{hovered}" in:slide out:slide>
            <li><Button listItem active="{$locale=="en"}" on:click={ () => updateLanguage("en") }>{$_('lang.en')}</Button></li>
            <li><Button listItem active="{$locale=="es"}" on:click={ () => updateLanguage("es") }>{$_('lang.es')}</Button></li>
            <li><Button listItem active="{$locale=="va"}" on:click={ () => updateLanguage("va") }>{$_('lang.va')}</Button></li>
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