<script>
    import {onMount} from 'svelte';

    import THREE_App from './Application/App.js';

    let canvasElement;

    let height, width;

    onMount(() => {
        let size = {height, width}
        let SmartUniversity_App = new THREE_App( { canvas: canvasElement, window: { height, width } });
        console.log(size);
        
    })
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<canvas bind:this={canvasElement}></canvas>

<style>
canvas{
    width: 100%;
    height: 100%;
}
</style>