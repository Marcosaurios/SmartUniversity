<script>
    import {onMount} from 'svelte';

    import THREE_App from './Application/App.js';

    let canvasElement;
    let height, width;

    let SmartUniversity_App = null;
    onMount(() => {
        SmartUniversity_App = new THREE_App( { canvas: canvasElement, window: { height, width }, debug: true });        
        
    })

    function handleResize() {
        SmartUniversity_App.resized(width, height);   
    }

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={handleResize}/>

<canvas bind:this={canvasElement}></canvas>

<style>
canvas{
    width: 100%;
    height: 100%;
}
</style>