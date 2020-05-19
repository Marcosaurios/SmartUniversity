<script>
    import { slide } from "svelte/transition";

    export let visible = false;
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

        padding: 7px;
        overflow: hidden;
        

        border-radius: 5px;
    }

    h2 {
        text-align: center;
        color:red;
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
            padding: 17px;
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
        <slot></slot>    
    </div>
{/if}