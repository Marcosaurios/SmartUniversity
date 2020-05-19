<script>
    import {onMount} from 'svelte';
    import { slide } from "svelte/transition";

    import Icon from '@iconify/svelte';
    import webIcon from '@iconify/icons-mdi/web';
    import helpCircleOutline from '@iconify/icons-mdi/help-circle-outline';

    import Button from "./Components/Button.svelte";
    
    let language = "esp";

    let div;
    let hovered = false;
    $: console.log("hovered", hovered);

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
        // console.log("dentro boton");
        hovered = true;
        // console.log(...Button);
        // debugger
            // if(div.contains(event.detail.e.target)){
            //     console.log("Inside box");
            //     hovered = true;
            // }
            // else{
            //     console.log("outside box");
            //     hovered = false;
            // }
    }
    
    function trigger(e){
        // console.log("triggered");
                        e.preventDefault();
                e.stopPropagation();
        hovered = !hovered;
    }

    function updateLanguage(lang){
        hovered = false;
        // TODO: separate language to component 
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

<div class="center">
    <div bind:this={div} on:mouseenter={trigger} on:mouseleave={trigger}>
        <Button id="lang" on:touched={handleTouch}>
            <Icon icon={webIcon} style="font-size: 2em"/>
        </Button>
        <ul class:visible="{hovered}" in:slide out:slide>
            <li><Button listItem active="{language=="eng"}" on:click={updateLanguage("eng")}>English</Button></li>
            <li><Button listItem active="{language=="esp"}" on:click={updateLanguage("esp")}>Español</Button></li>
        </ul>
    </div>
    <div>
        <Button>
            <Icon icon={helpCircleOutline} style="font-size: 2em"/>
        </Button>
    </div>
</div>