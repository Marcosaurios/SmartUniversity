<style>
.slidecontainer {
  width: 200px;
  margin: 10px 0;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin: 0;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
    border-radius: 50%;
    background: rgb(73, 121, 252);

  cursor: pointer;
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;

  width: 25px;
  height: 25px;

    background: rgb(73, 121, 252);

  cursor: pointer;
}


</style>

<script>

export let min = 0;
export let max = 100;
export let value = 50;
export let step = 1;

</script>

<div class="slidecontainer">
    <input type="range" min="{min}" max="{max}" step="{step}" class="slider" bind:value>
</div>