
<script>
    import {onMount} from 'svelte';

    import THREE_App from './Application/App.js';

    const DEBUG = true;

    let canvasElement;
    let height, width;
    let SmartUniversity_Instance = null;
    
    onMount(() => {
        var doc = DEBUG ? document : null;

        SmartUniversity_Instance = new THREE_App( { canvas: canvasElement, window: { height, width }, doc , DEBUG });        
        
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.stats.domElement ) : 0;
        DEBUG ? document.body.appendChild( SmartUniversity_Instance.renderstats ) : 0;
    })

    // Window resizing
    function handleResize() {
        SmartUniversity_Instance.resized(width, height);   
    }

    // Mouse movement raycaster updates
    function handleMouseMove(event) {
        event.preventDefault();
        SmartUniversity_Instance.mouse.x = ( event.clientX / width ) * 2 - 1;
        SmartUniversity_Instance.mouse.y = - ( event.clientY / height ) * 2 + 1;
    }

    function handleClick(event) {
        var buildingName = SmartUniversity_Instance.buildingSelected();
        if( buildingName ) buildingName = buildingName.replace("_wrapper", "");
        console.log("Selected " + buildingName);
    }

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={handleResize}/>

<canvas bind:this={canvasElement} on:mousemove={handleMouseMove} on:click={handleClick}></canvas>

<style>
canvas{
    width: 100%;
    height: 100%;
}
</style>