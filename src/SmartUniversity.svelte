
<script>
    import {onMount} from 'svelte';
    import { fade } from "svelte/transition";

    import Popup from './Popup.svelte';
    import Menu from './Menu.svelte';
    import Loading from './Components/Loading.svelte';
    import Help from './Help.svelte';
 
    import THREE_App from './Application/App.js';

     
    const DEBUG = process.env.prod != "prod";

    // ThreeJS APP
    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = new THREE_App();
    let selected = null;

    // TODO subscribe to popup events -> on update, call SmartUniversity update values of building stats
    let popup;

    let promise = SmartUniversity_Instance.getAllLoadedItems();
    let progress = 0;

    SmartUniversity_Instance.on('progress', (value) => {
        // loading %
        progress = value;
    })

    
    onMount(async () => {


        console.log("canvas:", canvasElement);
        SmartUniversity_Instance.init({ canvas: canvasElement, window: { height, width }, doc: document , DEBUG }); 

        popup.refreshData();
        
        // debug 
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.stats.domElement ) : 0;
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.renderstats ) : 0;

    })

    function clicked(event) {
        SmartUniversity_Instance.mouse.x = ( event.clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        console.log("Svelte selected ", selected);
    }

    function touched(event) {
        SmartUniversity_Instance.mouse.x = ( event.touches[0].clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.touches[0].clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        console.log("Svelte selected ", selected);
    }

</script>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />

<Popup content={ selected } bind:this={popup}/>

{#await promise}
    <Loading {progress}></Loading>
{:then value}
    <Menu></Menu>
    <Help></Help>
{/await}

<div transition:fade>
    <canvas 
        bind:this={canvasElement}
        on:click={ clicked }
        on:touchstart={ touched }
        id="app"
        in:fade
    ></canvas>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
    div :global(.has-pointer) {
        cursor: pointer;
    }

    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    p{
        color: aliceblue;
    }

</style>




   


