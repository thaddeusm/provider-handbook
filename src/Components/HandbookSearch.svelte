<script>
	import Search from './../graphics/icons/Search.svelte';
	import Close from './../graphics/icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let query = '';
</script>

<aside>
	<section id="searchBox">
		<input type="text" bind:value={query}>
	</section>
	<section id="results">
		
	</section>
</aside>

<style>
	aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: var(--white);
		z-index: 3000;
		display: grid;
		align-items: center;
		grid-template-rows: 25% 75%;
	}

	input {
		border: 1px solid var(--brand);
		border-radius: 1px;
		padding: 15px;
		font-size: 21px;
		letter-spacing: 2px;
		text-transform: uppercase;
		font-family: "Montserrat-Bold";
	}
</style>