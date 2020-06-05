<script>
    import { createEventDispatcher } from 'svelte';
    import {onMount} from 'svelte';

    // Props
    export let id = null;
    export let primary = false;
    export let secondary = false;
    export let listItem = false;
    export let active = false;

    const dispatch = createEventDispatcher();
    // let button;

    function addEvent(node){
        if(node.id == "lang"){
            // Only emit event if button is language button
            node.addEventListener("touchend", (e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch("touched", true );
            });   
        }
    }

</script>

<style>
    .btn{
        display: flex;
        cursor: pointer;

        border-radius: 8px;

        background-color: var(--btn-white);
        border-color: var(--btn-white);

        margin: 5px;
    }

    .btn:hover{
        background-color: var(--btn-white);
        border-color: var(--btn-white);
    }

    .primary{ 
        background-color: var(--btn-primary);
        border-color: var(--btn-primary);
    }

    /* .secondary{  } */

    .listItem{ 
        width: 100%;
        margin: 0 0 5px 0;

        justify-content: center;
        background-color: var(--btn-secondary);
        border-color: var(--btn-secondary);
    }

    .active {
        background-color: var(--btn-white);
        border-color: var(--btn-white);

    }


</style>

<button use:addEvent on:click={ () => dispatch('click')}
    id="{id}"
    class="btn" class:primary class:secondary class:listItem class:active>
        <slot></slot>
</button>