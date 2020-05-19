<script>
    export let primary = false;
    export let secondary = false;
    export let listItem = false;
    export let active = false;
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
<!-- 
<button 
    class="btn" class:primary class:secondary class:listItem
    on:mouseenter={enter} on:mouseleave={leave}>
        <slot></slot>
</button>
-->
<button 
    class="btn" class:primary class:listItem class:active>
        <slot></slot>
</button>