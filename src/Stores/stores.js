import { writable, derived } from 'svelte/store';

export const firstVisit = writable(false);

export const cookiesUse = writable(false);

// Help toggle
export const help_toggle = writable(false);

// Buildings status
export const buildings_status = writable({value: null});

// Settings
export const settings_toggle = writable(false);
    