<script>
	import { slide } from 'svelte/transition';

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
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input in:slide type="text" bind:value={query} placeholder="Search Handbook">
		</section>
		<section id="closeArea">
			<button on:click={closeSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
	<section id="results">
		
	</section>
</aside>

<style>
	aside {
		width: 55%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		display: grid;
		grid-template-rows: 6% 94%;
	}

	#searchBox {
		display: grid;
		grid-template-columns: 90% 2% 8%;
		grid-template-areas: "inputArea . closeArea";
		align-items: center;
	}

	#results {
		background: var(--white);
		height: 50%;
		margin: 0 10% 0 9%;
		overflow: auto;
		box-shadow: var(--shadow);
	}

	#inputArea {
		border-radius: 1px;
		grid-area: inputArea;
		display: grid;
		grid-template-columns: 10% 90%;
		grid-template-areas: "searchIcon input";
		align-items: center;
	}

	#closeArea {
		grid-area: closeArea;
	}

	input {
		font-size: 21px;
		letter-spacing: 2px;
		text-transform: uppercase;
		font-family: "Montserrat-Bold";
		color: var(--white);
		padding-bottom: 5px;
		padding-left: 5%;
		background: none;
		border: none;
		outline: none;
		display: block;
		width: 95%;
		grid-area: input;
		border-bottom: 3px solid var(--white);
	}

	input:focus {
		outline: none;
	}

	#searchIcon {
		grid-area: searchIcon;
	}
</style>