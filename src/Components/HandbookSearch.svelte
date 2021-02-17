<script>
	import Search from './../graphics/icons/Search.svelte';
	import Close from './../graphics/icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let query = '';

	function closeSearch() {
		dispatch('close-search');
	}
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#000000'} width={'2rem'} height={'2rem'} />
			</section>
			<input type="text" bind:value={query}>
		</section>
		<section id="closeArea">
			<button on:click={closeSearch}>
				<Close width={'2rem'} height={'2rem'}  />
			</button>
		</section>
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
		grid-template-rows: 15% 85%;
	}

	#searchBox {
		display: grid;
		grid-template-columns: .1fr 1.4fr .5fr;
		grid-template-areas: ". inputArea closeArea";
		align-items: center;
	}

	#inputArea {
		border: 1px solid var(--brand);
		border-radius: 1px;
		padding: 10px 5px;
		grid-area: inputArea;
		display: grid;
		grid-template-columns: 20% 80%;
		grid-template-areas: "searchIcon input";
		align-items: center;
	}

	#closeArea {
		grid-area: closeArea;
		text-align: center;
	}

	input {
		font-size: 21px;
		letter-spacing: 2px;
		text-transform: uppercase;
		font-family: "Montserrat-Bold";
		background: none;
		border: none;
		outline: none;
		display: block;
		max-width: 180px;
		grid-area: input;
	}

	input:focus {
		outline: none;
	}

	#searchIcon {
		grid-area: searchIcon;
	}
</style>