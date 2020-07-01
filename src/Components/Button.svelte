<script>
    import { createEventDispatcher } from 'svelte';
    import {onMount} from 'svelte';

    // Props
    export let id = null;
    export let primary = false;
    export let secondary = false;
    export let listItem = false;
    export let active = false;
    export let big = false;

    const dispatch = createEventDispatcher();

</script>

<style>
    .btn{
        display: flex;
        cursor: pointer;

        border-radius: 8px;

        background-color: var(--btn-white);
        border-color: var(--btn-white);

        margin: 5px;

        transition: background-color .5s, border-color .5s, box-shadow .5s;
    }

    .btn:hover{
        background-color: var(--btn-white);
        border-color: var(--btn-white);
        box-shadow: 0px 0px 15px lightslategrey;

    }

    .btn.primary:hover{
        background-color:var(--btn-primary);
    }

    .btn.listItem:hover{
        background-color: var(--btn-white);
    }

    .primary{ 
        background-color: var(--btn-primary);
        border-color: var(--btn-primary);
        color: white;
        font-size: 16px;
        padding: 1em;
    }

    .secondary{ 
        background-color: var(--btn-secondary);
        border-color: var(--btn-secondary);
    }

    .listItem { 
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

    .big {
        font-size: 1.5em;
    }


</style>

<button
    on:click={ () => dispatch('click')}
    id="{id}"
    class="btn" class:primary class:secondary class:listItem class:active class:big>
        <slot></slot>
</button>