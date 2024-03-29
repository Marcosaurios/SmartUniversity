import { writable, derived } from 'svelte/store';

export const firstVisit = writable(false);

export const cookiesUse = writable(false);

// Phone or desktop
export const isMobile = writable(false);


// Help toggle
export const help_toggle = writable(false);

// Buildings status
export const buildings_status = writable({value: null});

// Settings
export const settings_toggle = writable(false);

// Weights

export const weights = writable({
    wifid: 0.25,
    wifiu: 0.25,
    energy: 0.25,
    weather: 0.25
})

    