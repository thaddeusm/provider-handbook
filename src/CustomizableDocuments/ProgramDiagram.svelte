<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let customizationChoices;

	let svg;

	$: {
		dispatch('document-updated', {
			svg: svg
		});
	}

	onMount(() => {
		dispatch('document-updated', {
			svg: svg
		});
	})
</script>

<style>
	div {
		background: var(--white);
	}

	svg {
		max-width: 100%;
		height: auto;
	}
</style>

<div>
	
</div>