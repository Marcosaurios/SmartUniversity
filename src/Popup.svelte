<script>

    import { slide } from "svelte/transition";

    export let content = "void";

    let visible = false;

    $: content ? visible = true : visible = false;
    $: console.log(content);
    
</script>

<style>
  

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

    @media only screen and (min-width: 500px)
    {
        div:nth-child(1) {
            width: 60%;
            overflow: hidden;    
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
        <h2>{ content }</h2>
        <div class="wrapper">
            <p>WiFi bajada: 23mb/s</p>
            <p>WiFi subida: 23mb/s</p>
            <p>Temperatura: 23ºC</p>
            <p>Consumo: 24kW</p>
        </div>
    </div>
{/if}
