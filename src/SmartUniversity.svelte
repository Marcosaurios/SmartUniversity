<script>
    import {onMount} from 'svelte';

    import THREE_App from './Application/App.js';

    let canvasElement;
    let height, width;

    let SmartUniversity_Instance = null;
    onMount(() => {
        SmartUniversity_Instance = new THREE_App( { canvas: canvasElement, window: { height, width }, debug: true });        
        document.body.appendChild( SmartUniversity_Instance.stats.domElement );
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

        // console.log(SmartUniversity_Instance.mouse.x , SmartUniversity_Instance.mouse.y )
    }

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={handleResize}/>

<canvas bind:this={canvasElement} on:mousemove={handleMouseMove}></canvas>

<style>
canvas{
    width: 100%;
    height: 100%;
}
</style>