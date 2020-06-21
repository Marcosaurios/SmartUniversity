<script>
    import { onMount } from 'svelte';
    import Card from "./Components/Card.svelte";
    import Status from "./Components/Status.svelte";

    import { buildings_status } from './Stores/stores.js';

    import API, {getData, buildings} from "./API.svelte";
    import {CONSTANTS} from "./Components/Icons.js";

    // bulma
    // import { Tab, Tabs } from "svelma";

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

    let temp_icon;
    let energy_icon;
    let wifid_icon;
    let wifiu_icon;

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
    
        temp_icon = CONSTANTS.WEATHER( Math.min(building.temperature_status * 100, 100) );
        energy_icon = CONSTANTS.ENERGY( Math.min(building.energia_activa_status * 100, 100) );
        wifid_icon = CONSTANTS.WIFIUP( Math.min(building.wifi_up_status * 100, 100) );
        wifiu_icon = CONSTANTS.WIFIDOWN( Math.min(building.wifi_down_status * 100, 100) );
    }
    
</script>

<Card {visible}>
    <!-- <Tabs style="is-boxed">
        <Tab label="General"> -->
            <h2>{building.name}</h2>
            <div>
                <div>
                    <span>{@html energy_icon}</span>
                    <span>{building.energia_activa} KJ</span>

                </div>
                <div>
                    <span>{@html wifid_icon}</span>
                    <span>{building.wifi_down} mb/s</span>

                </div>
                <div>
                    <span>{@html wifiu_icon}</span>
                    <span>{building.wifi_up} mb/s</span>

                </div>
                <div>
                    <span>{@html temp_icon}</span>
                    <span>{building.temperature} ºC</span>

                </div>
            </div>
        <!-- </Tab>
        <Tab label="Lol">
            <p>Jjfdskjnfdk</p>
        </Tab>
        <Tab label="Things"></Tab>
    </Tabs> -->
</Card>    

<style>
    h2{
        text-align: center;
    }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        padding: 5px;
    }

    div div{
        display: flex;
        flex-direction: column;

        margin: 5px;
    }
</style>




