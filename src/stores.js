import { writable } from 'svelte/store';

export const searchOpen = writable(false);

export const navigatingResults = writable(false);

export const searchQuery = writable('');

export const results = writable([]);

export const activeResult = writable({
	index: 0,
	section: ''
});