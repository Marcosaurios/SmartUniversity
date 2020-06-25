<script>
    export let progress = 0.5;
    export let name;
    export let reverse = false;
    export let data;

    console.log(name, " has ", data);

    let value = Math.min(progress, 1)*100;
    let color = value;

    if(reverse){
        color = 100 - value;
    }


</script>

    <div class="wrap">
        <label for="{name}">
            <slot></slot> <span>{value + '%' }</span>
        </label>
        <div class="progress">
            <div class="progress-value" style="width: { value }%; background: hsl({ color }, 80%, 68%)">
            {#if data} {data} {/if}
            </div>
        </div>
    </div>



<style>
.wrap{
    display: flex;
    align-items: center;
    justify-content: left;
}

label {
    margin-right: 15px;
}

.progress {
    background: rgba(132,132,132,0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    position: relative;
    padding: 0 5px;
    display: flex;
    height: 20px;
    width: 50%;
}

.progress-value {
    animation: load 3s normal forwards;
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: #fff;
    height: 10px;
    width: 0;
    font-size: 9px;
    text-align: center;
}
</style>
