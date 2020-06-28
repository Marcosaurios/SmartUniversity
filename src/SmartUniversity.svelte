
<script>
    // Svelte 
    import {onMount} from 'svelte';
    import { fade } from "svelte/transition";

    // Components
    import Loading from './Components/Loading.svelte';
    import Popup from './Popup.svelte';
    import Menu from './Menu.svelte';
    import Help from './Help.svelte';
    import Settings from './Settings.svelte';
    import Cookies from './Services/Cookies.svelte';

    // internationalization
    import { _, setupi18n, isLoaded } from './Services/Internationalization.js';

    // Stores
    import { buildings_status } from './Stores/stores.js';
 
    import THREE_App from './Application/App.js';

     
    const DEBUG = process.env.prod != "prod";

    // ThreeJS APP
    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = new THREE_App();
    let selected = null;


    let popup;

    let promise = SmartUniversity_Instance.getAllLoadedItems();
    let progress = 0;

    SmartUniversity_Instance.on('progress', (value) => {
        // loading %
        progress = value;
    });


    // Init locale
    setupi18n({withLocale: 'en'});

    
    onMount(async () => {
        
        await popup.refreshData();
        
        // debugger
        await SmartUniversity_Instance.init({ canvas: canvasElement, window: { height, width }, doc: document , DEBUG, status: $buildings_status }); 

        setInterval(async () => {
            popup.refreshData();
            SmartUniversity_Instance.updateStatus($buildings_status);
            console.log($buildings_status);
        }, 15*60*1000); // 15 mins update
        // }, 900000); // 15 mins update

        // todo each hour update light

        
        // debug 
        // DEBUG ? document.body.appendChild( SmartUniversity_Instance.stats.domElement ) : 0;
        // DEBUG ? document.body.appendChild( SmartUniversity_Instance.renderstats ) : 0;

    })

    function clicked(event) {
        SmartUniversity_Instance.mouse.x = ( event.clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        // console.log("Svelte selected ", selected);
    }

    function touched(event) {
        SmartUniversity_Instance.mouse.x = ( event.touches[0].clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.touches[0].clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.getSelected();

        // console.log("Svelte selected ", selected);
    }

</script>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />

<Popup content={ selected } bind:this={popup}/>

{#await promise }
    <Loading {progress}></Loading>
{:then value}
    <Menu></Menu>
    <Help></Help>
    <Settings></Settings>
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

<Cookies></Cookies>


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




   


