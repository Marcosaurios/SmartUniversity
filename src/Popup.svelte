<script>
  import { onMount } from "svelte";
  import Card from "./Components/Card.svelte";
  import Status from "./Components/Status.svelte";
  import Gauge from "./Components/Gauge.svelte";
  import Switch from "./Components/Switch.svelte";
  import { CONSTANTS } from "./Components/Icons.js";
  
  import { _, isLoaded, locale } from "./Services/internationalization.js";
  

  import { buildings_status } from "./Stores/stores.js";

  import API, { getData, buildings } from "./API.svelte";

  // For building selected check (raycasting)
  export let content;

  export async function refreshData() {
    data = await getData();
    // debugger
    buildings_status.set(data);
  }

  // 3D models name (in same order as API.svelte)
  const buildings3D = [
    "BUA",
    "EPS1",
    "EPS2",
    "EPS3",
    "Aulario2",
    "Aulario3",
    "Derecho",
    "GerBernacer"
  ];

  let visible = false;
  let data = {};
  let building = {};

  let time='14:00';
  let temp_icon;
  let energy_icon;
  let wifid_icon;
  let wifiu_icon;

  $: {
    if (content) {
      // console.log("content is", content);
      // let index = buildings3D.indexOf(content);
      building = data[buildings[ buildings3D.indexOf(content) ]];

      // console.log(building);

      visible = true;
    } else {
      visible = false;
    }

    temp_icon = CONSTANTS.WEATHER(
      Math.min(building.temperature_status * 100, 100)
    );
    energy_icon = CONSTANTS.ENERGY(
      Math.min(building.energia_activa_status * 100, 100)
    );
    wifid_icon = CONSTANTS.WIFIUP(Math.min(building.wifi_up_status * 100, 100));
    wifiu_icon = CONSTANTS.WIFIDOWN(
      Math.min(building.wifi_down_status * 100, 100)
    );

  }

  const updateValues = function(param){
    
    building[param] = !building[param];
    data[building.name] = building;
    
    buildings_status.set(data);
  }

</script>

<style>
  p{
    font-size: 1em;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tabs {
    display: flex;
  }

  .tab {
    cursor: pointer;
    width: 100%;
    padding: 10px 20px;
    margin: 0 5px;
    background: #000;
    display: inline-block;
    color: #fffffff6;
    border-radius: 3px 3px 0px 0px;
    text-align: center;
  }

  .panels {
    background: #fffffff6;
    box-shadow: 0 2rem 2rem #00000080;
    min-height: 200px;
    width: 100%;
    max-width: 500px;
    border-radius: 3px;
    overflow: hidden;
  }
  .panel {
    display: none;
    animation: fadein 0.8s;
    padding: 20px;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .panel-title {
    font-size: 1.5em;
    font-weight: bold;
  }
  .radio {
    display: none;
  }
  #one:checked ~ .panels #one-panel,
  #two:checked ~ .panels #two-panel,
  #three:checked ~ .panels #three-panel {
    display: block;
  }
  #one:checked ~ .tabs #one-tab,
  #two:checked ~ .tabs #two-tab,
  #three:checked ~ .tabs #three-tab {
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    background: #fffffff6;
    color: #000;
  }
  /* Status */
  div.status {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: rgba(169, 169, 169, 0.493); */
    padding: 5px;
    border-radius: 3px;
  }

  div.status div {
    display: flex;
    flex-direction: column;
    justify-items: center;
    margin: 10px;
  }

  span.icon,
  span.icon + span {
    text-align: center;
  }

  div.container{
    padding: 10px;
  }

  div.container.toggles{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: left;

    margin-bottom: 10px;
  }
  .bg{
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  p.time{
    text-align: center;
  }
  p.time span {
    background-color: var(--btn-primary);
    padding: 3px;
    border-radius: 3px;
    color: white;
  }

  p.time span:hover{
    cursor: pointer;
  }

</style>

<Card {visible}>
  <div class="wrapper">
    <input class="radio" id="one" name="group" type="radio" checked />
    <input class="radio" id="two" name="group" type="radio" />
    <input class="radio" id="three" name="group" type="radio" />
    <div class="tabs">
      <label class="tab" id="one-tab" for="one">{$_('popup.general.name')}</label>
      <label class="tab" id="two-tab" for="two">{$_('popup.rooms.name')}</label>
      <label class="tab" id="three-tab" for="three">{$_('popup.alarms.name')}</label>
    </div>
    <div class="panels">
      <div class="panel" id="one-panel">
        <h2>{building.name}</h2>
        <div class="status">
          <div>
            <span class="icon">
              {@html energy_icon}
            </span>
            <span>{building.energia_activa} KJ</span>
          </div>
          <div>
            <span class="icon">
              {@html wifid_icon}
            </span>
            <span>{building.wifi_down} mb/s</span>
          </div>
          <div>
            <span class="icon">
              {@html wifiu_icon}
            </span>
            <span>{building.wifi_up} mb/s</span>
          </div>
          <div>
            <span class="icon">
              {@html temp_icon}
            </span>
            <span>{building.temperature} ºC</span>
          </div>
        </div>

        <div class="container">
          <Gauge progress={building.conexiones_status} data={building.conexiones} reverse={true} name="capacity">{$_('popup.general.devices')}: </Gauge>
        </div>
        <div class="container toggles">
          <Switch name={ $_('popup.general.doors') } checked={building.doors} on:change={ ()=> updateValues("doors") }></Switch>
          <Switch name={ $_('popup.general.wifi') } checked={building.wifi} on:change={ ()=> updateValues("wifi") }></Switch>
          <Switch name={ $_('popup.general.lights')} checked={building.lights} on:change={ ()=> updateValues("lights") }></Switch>
        </div>
        
      </div>
      <div class="panel" id="two-panel">

        {#if building.isOffice}
        <div class="container bg">
          <h2>{$_('popup.rooms.offices')}</h2>
          <p>{$_('popup.rooms.capacity')} {building.aforo}</p>
          <Gauge progress={building.despachos_status} data={building.estancias} name="fulloffices">{$_('popup.rooms.fulloffices')} </Gauge>
          <p>{$_('popup.rooms.meters')} {building.superficie} m<sup>2</sup></p>
        </div>
        {/if}
        {#if building.isClassroom}
        <div class="container bg">
          <h2>{$_('popup.rooms.classes')}</h2>
          <p class="time">{$_('popup.rooms.eta')} <span>{time}</span></p>
          <Gauge progress={building.estudiantes_status} data={building.estudiantes} name="estudiantes">{$_('popup.rooms.students')}: </Gauge>
          <Gauge progress={building.classroom_status} data={building.classroom} name="aulas">{$_('popup.rooms.classesFull')}: </Gauge>
        </div>
        {/if}

      </div>
      <div class="panel" id="three-panel">
        <div class="panel-title">Note on Prerequisites</div>
        <p>We recommend that you complete Learn HTML before learning CSS.</p>
      </div>
    </div>
  </div>

</Card>
