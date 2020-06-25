<script>
  
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name;
  export let checked = false;
</script>

<div>
  <label class="switch" for="{name}">
    <input id="{name}" type="checkbox" {checked} on:change={ () => dispatch('change')}>
    <span class="slider"></span>  
  </label>
  <label for="{name}">
    <p>{name}</p>
  </label>
</div>

<style>
label:hover{
  cursor: pointer;
}
div{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
p{
  font-size: 1em;
  /* margin-top: 25px; */
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 17px;
  
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}


</style>