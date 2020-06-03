
<script>
    import {onMount} from 'svelte';
    import Popup from './Popup.svelte';
    import Menu from './Menu.svelte';
 
    import THREE_App from './Application/App.js';

     
    const DEBUG = process.env.prod != "prod";

    // ThreeJS APP
    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = null;
    let selected = null;

    // TODO subscribe to popup events -> on update, call SmartUniversity update values of building stats
    let popup;

    let promise;
    let progress = 0;

    
    onMount(async () => {

        SmartUniversity_Instance = new THREE_App( { canvas: canvasElement, window: { height, width }, doc: document , DEBUG }); 

        promise = SmartUniversity_Instance.getAllLoadedItems();

        SmartUniversity_Instance.on('progress', (value) => {
            // loading %
            progress = value;
        })
        
        popup.refreshData();
        
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

    .loading {
        position: relative;
        z-index: 1;
    }
</style>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />


{#await promise}
	<p class="overlay">{progress}</p>
{:then value}
    <Menu></Menu>
{/await}

<Popup content={ selected } bind:this={popup}/>
   
<div>
    <canvas 
        bind:this={canvasElement}
        on:click={ clicked }
        on:touchstart={ touched }
        id="app"
    ></canvas>
</div>

