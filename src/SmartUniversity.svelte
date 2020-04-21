
<script>
    import {onMount} from 'svelte';
    import Popup from './Popup.svelte';

    import { eventstart, eventend, eventmove, eventcancel } from '@composi/gestures';

    import THREE_App from './Application/App.js';

    const DEBUG = false;

    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = null;
    let selected = null;

    let popup;
    
    onMount(async () => {

        SmartUniversity_Instance = new THREE_App( { canvas: canvasElement, window: { height, width }, doc: document , DEBUG }); 
        
        popup.refreshData();
        
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.stats.domElement ) : 0;
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.renderstats ) : 0;

    })

    function clicked(event) {
        SmartUniversity_Instance.mouse.x = ( event.clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.SELECTED;

        // console.log("Svelte selected ", selected);
    }

    function touched(event) {
        SmartUniversity_Instance.mouse.x = ( event.touches[0].clientX / SmartUniversity_Instance.viewportWidth ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.touches[0].clientY  / SmartUniversity_Instance.viewportHeight ) * 2 + 1;

        SmartUniversity_Instance.calculateIntersections();
        selected = SmartUniversity_Instance.SELECTED;

        // console.log("Svelte selected ", selected);
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
</style>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />

<Popup content={ selected } bind:this={popup}/>

<div>
    <canvas 
        bind:this={canvasElement}
        on:click={ clicked }
        on:touchstart={ touched }
    ></canvas>
</div>
