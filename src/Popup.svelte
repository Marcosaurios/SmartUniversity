<script>
    import { onMount } from 'svelte';
    import Card from "./Components/Card.svelte";
    import Status from "./Components/Status.svelte";

    import { buildings_status } from './Stores/stores.js';

    import API, {getData, buildings} from "./API.svelte";

    // For building selected check (raycasting)
    export let content;

    export async function refreshData() {
        data = await getData();
        // debugger
        buildings_status.set(data);
    }
    
    // 3D models name (in same order as API.svelte)
    const buildings3D = ["BUA", "EPS1", "EPS2", "EPS3", "Aulario2", "Aulario3", "Derecho", "GerBernacer"];

    let visible = false;
    let data = {};
    let building = {};

    $:{
        if(content){
            console.log("content is", content);
            let index = buildings3D.indexOf(content);
            building = data[buildings[index]];

            console.log(building);

            visible = true;
        }
        else{
            visible = false;
        }
    }
    
</script>

<Card {visible}>
    <h2>{building.name}</h2>
    <Status building></Status>
    <p>{building.description}</p>
</Card>    

<style>
    h2{
        text-align: center;
    }
</style>




