<script>
    import { slide } from "svelte/transition";

    export let visible = false;
</script>


<style>
  
    /* Mobile first */

    div:nth-child(1) {
        /* background-color: white; */
        position: absolute;

        top: 55vh;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;

        width: 94%;
        height: 30vh;
        
        max-width: 500px;  

        padding: 0 0px 7px 7px;
        /* overflow: scroll; */
        

        border-radius: 5px;
    }


    /* Desktop second */
    @media only screen and (min-width: 1200px)
    {
        div:nth-child(1) {
            width: 60%;
            /* overflow: hidden;   */
            /* max-width: 500px;   */
            max-width: 500px;  
            padding: 0 17px;
            transform: translate(5vw, -29vh);
        }
    }

    @media only screen and (min-height: 1200)
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