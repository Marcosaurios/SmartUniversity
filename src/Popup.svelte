<script>
    import { onMount } from 'svelte';
    import { slide } from "svelte/transition";

    import API, {getData, buildings} from "./API.svelte";

    // For building selected check (raycasting)
    export let content = "void";

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
    }, 60000);

    // 
    const buildings3D = ["BUA", "Politecnica1", "Politecnica2", "Politecnica3", "Aulario2", "Aulario3", "Derecho", "GermanBernacer"];
    $:{
        if(content){
            // TODO parse data from DATA to this frontend
            let index = buildings3D.indexOf(content);
            building = data[buildings[index]];

            visible = true;
        }
        else{
            visible = false;
        }
    }
    
</script>

<style>
  
    /* Mobile first */

    div:nth-child(1) {
        background-color: white;
        position: absolute;

        top: 59vh;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;

        width: 83%;
        height: 30vh;

        padding: 17px;
        overflow: hidden;
        

        border-radius: 5px;
    }

    h2 {
        text-align: center;
    }

    .wrapper p {
        text-align: center;
    }

    /* Desktop second */
    @media only screen and (min-width: 500px)
    {
        div:nth-child(1) {
            width: 60%;
            overflow: hidden;  
            max-width: 400px;  
        }

        .wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .wrapper p {
            flex: 50%;
        }
    }

    @media only screen and (min-height: 600px) 
    {
        div:nth-child(1) {
            top: 63vh;
        }
    }

</style>

{#if visible}
    <div in:slide out:slide>
        <h2>{ building.name }</h2>
        <div class="wrapper">
            <p>WiFi bajada: { building.wifi_down ? (building.wifi_down + " mb/s") : "Offline" } </p>
            <p>WiFi subida: { building.wifi_up ? (building.wifi_up + " mb/s") : "Offline" } </p>
            <p>Temperatura: { building.temperature ? (building.temperature + " ºC") : "Offline"} </p>
            <p>Consumo: { building.energia_activa ? (building.energia_activa + " Kw") : "Offline" } </p>
        </div>
    </div>
{/if}
