<script>
  import { onMount } from "svelte";
  import { slide } from 'svelte/transition';
  import Card from "./Components/Card.svelte";
  import Status from "./Components/Status.svelte";
  import Gauge from "./Components/Gauge.svelte";
  import Switch from "./Components/Switch.svelte";
  import Dropdown from "./Components/Dropdown.svelte";
  import Button from "./Components/Button.svelte";
  import { CONSTANTS } from "./Components/Icons.js";
  
  import { _, isLoaded, locale } from "./Services/Internationalization.js";
  

  import { buildings_status, isMobile } from "./Stores/stores.js";

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

  // General
  let temp_icon;
  let energy_icon;
  let wifid_icon;
  let wifiu_icon;

  // Rooms
  let time='14:00';

  // Alarms
  let alarm_type = 'ENERGY';
  let alarm_operator = 'fewer';
  let alarm_value = 0;
  let alarm_id = 0;
  let map = new Map();
  map.set('ENERGY', 'Kj');
  map.set('WIFIUP', 'mb/s');
  map.set('WIFIDOWN', 'mb/s');
  map.set('WEATHER', 'ºC');

  const saveAlarm = function() {
    
    building.alarms.push({
      "id": alarm_id++,
      "type": alarm_type,
      "value": alarm_value,
      "operator": alarm_operator
    })
    
    updateStores();
  }

  $: {
    if (content) {
      // console.log("content is", content);
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
    updateStores();
  }

  const updateStores = function() {
    data[building.name] = building;
    buildings_status.set(data);
  }
   
  const deleteAlarm = function(alarmId){ 
    building.alarms = building.alarms.filter( (el) => el.id != alarmId);
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
    padding: 8px;
  }

  span.information{
    margin-left: 6px;
  }

  span.icon,
  span.icon + span {
    text-align: center;
    display: inline-block;
  }

  div.container{
    padding: 10px;
    margin-bottom: 8px;
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

  .selections div{
    border-radius: 8px;
    transition: all .3s;
  }

  .selections div:hover{
    cursor: pointer;
    background: grey;
  }

  .active {
    background: grey;
  }

  .horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    width: 73%;
    margin: 0 auto;
  }

  select{
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: white;
    background: grey;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    margin-right: 5px;
    max-width: 50%;
    box-sizing: border-box;
    /* margin: 0; */
    border: 1px solid #aaa;
    box-shadow: 0px 0px 0px black; /*1px 0 1px rgba(0,0,0,.04);*/
    border-radius: .5em;
    transition: all .3s;
  }
  select:hover{
    border-color: grey;
    box-shadow: 0px 0px 15px grey;
    cursor: pointer;
  }

  input {
    padding: .6em 0.4em .5em .8em;
    border-radius: 6px;
    width: 35%;
    transition: all .3s;
  }

  input:hover{
    border-color: grey;
    box-shadow: 0px 0px 15px grey;
  }
  
  #uds{
    margin-left: 5px;
  }

  .close{
    margin-left:20px;
  }

  .close:hover svg path{
    fill: red;
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
        <div class="container bg">
          <div class="status selections">
              <div 
                on:click={()=> alarm_type = 'ENERGY'}
                class:active={alarm_type == 'ENERGY'}>
                <span class="icon">
                  {@html CONSTANTS.ENERGY('#ccc', '#f00')}
                </span></div>
              <div
                on:click={()=> alarm_type = 'WIFIDOWN'}
                class:active={alarm_type == 'WIFIDOWN'}>
                <span class="icon">
                  {@html CONSTANTS.WIFIDOWN('#ccc')}
                </span></div>
              <div
                on:click={()=> alarm_type = 'WIFIUP'}
                class:active={alarm_type == 'WIFIUP'}>
                <span class="icon">
                  {@html CONSTANTS.WIFIUP('#ccc')}
                </span>        </div>
              <div
                on:click={()=> alarm_type = 'WEATHER'}
                class:active={alarm_type == 'WEATHER'}>
                <span class="icon">
                  {@html CONSTANTS.WEATHER('#ccc')}
                </span>        </div>
          </div>

          <div class="horizontal"> 
            <select name="rule" id="rule" bind:value={alarm_operator}>
              <option value="greater" selected={alarm_operator == 'greater'}>{$_('popup.alarms.greater')}</option>
              <option value="fewer" selected={alarm_operator == 'fewer'}>{$_('popup.alarms.fewer')}</option>
            </select>
            <input type="number" id="alarm_value" bind:value={alarm_value}>  
            <span id="uds">{map.get(alarm_type)}</span>        
          </div>
          <div class="horizontal">
            <Button primary on:click={ () => saveAlarm() }>{$_('popup.alarms.create')}</Button>        
          </div>

        </div>
        <h2>{$_('popup.alarms.alarms')}</h2>
        {#each building.alarms as alarm (alarm.id)}
          <div transition:slide class="container bg horizontal">
            <span class="icon">{@html CONSTANTS[alarm.type]('#ccc')}</span> 
            <span>{$_(`popup.alarms.${alarm.operator}`)}</span>
            <span class="information">{alarm.value} {map.get(alarm.type)}</span>
            <span class="icon close" on:click={deleteAlarm(alarm.id)}>{@html CONSTANTS.CROSS('#ccc','#f00')}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

</Card>
