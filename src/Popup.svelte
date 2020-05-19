<script>
    import { onMount } from 'svelte';
    import Card from "./Components/Card.svelte";
    import Status from "./Components/Status.svelte";

    import API, {getData, buildings} from "./API.svelte";

    // For building selected check (raycasting)
    export let content;

    let visible = false;
    let data = {};
    let building = {};

    export async function refreshData() {
        data = await getData();
        console.log(data);
    }

    setInterval(async () => {
        // TODO check headers
        data = await getData(); console.log(data);
        console.log("UPDATED DATA");
    }, 900000); // 15 mins update

    // 
    const buildings3D = ["BUA", "EPS1", "EPS2", "EPS3", "Aulario2", "Aulario3", "Derecho", "GerBernacer"];
    $:{
        if(content){
            console.log("content is", content);
            let index = buildings3D.indexOf(content);
            building = data[buildings[index]];

            visible = true;
        }
        else{
            visible = false;
        }
    }
    
</script>

<Card {visible}>
    <h2>{building.name}</h2>
    <Status></Status>
    <p>{building.description}</p>
</Card>    

<style>
    h2{
        text-align: center;
    }

</style>




