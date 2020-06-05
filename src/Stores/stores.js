import { writable } from 'svelte/store';

// Help toggle
export const help_toggle = writable(
    false,
    function start(){
        console.log("first one subscribed");
    },
    function stop(){
        console.log("last one subscribed");
    }
);

// Buildings status
export const buildings_status = writable({value: null});

    