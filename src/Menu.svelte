<script>
    import { slide } from "svelte/transition";

    import Icon from '@iconify/svelte';
    import webIcon from '@iconify/icons-mdi/web';
    import helpCircleOutline from '@iconify/icons-mdi/help-circle-outline';

    import Button from "./Components/Button.svelte";

    let hovered = false;

    let language = "esp";

    function trigger(){
        hovered = !hovered;
    }

    function updateLanguage(lang){
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

    ul{
        margin: 0px;
        list-style: none;
        padding: 0px;
        opacity: 0;
        transition: 200ms;

    }

    .visible{
        transition: 200ms;
        opacity: 1;
    }
</style>

<div class="center">
    <div on:mouseenter={trigger} on:mouseleave={trigger}>
        <Button >
            <Icon icon={webIcon} style="font-size: 2em"/>
        </Button>
        <ul class:visible="{hovered}" in:slide out:slide>
            <li><Button listItem active="{language=="eng"}" on:click={updateLanguage("eng")}>english</Button></li>
            <li><Button listItem active="{language=="esp"}" on:click={updateLanguage("esp")}>español</Button></li>
        </ul>
    </div>
    <div>
        <Button>
            <Icon icon={helpCircleOutline} style="font-size: 2em"/>
        </Button>
    </div>
</div>