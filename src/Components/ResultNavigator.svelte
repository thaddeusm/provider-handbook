<script>
	import { slide } from 'svelte/transition';
	import { search } from './../search.js';

	import Search from './../Graphics/Icons/Search.svelte';
	import RightArrow from './../Graphics/Icons/RightArrow.svelte';
	import LeftArrow from './../Graphics/Icons/LeftArrow.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	import { searchOpen, results, searchQuery, activeResult } from './../stores.js';

	let results_value;

	const unsubscribeResults = results.subscribe(value => {
		results_value = value;
	});

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	let active_result_value;

	const unsubscribeActiveResult = activeResult.subscribe(value => {
		active_result_value = value;
	});

	let input;

	function handleKeyup() {
		// open default search UI

		dispatch('open-search');
	}

	function incrementResult() {

	}

	function decrementResult() {

	}

	function closeSearch() {
		searchOpen.set(false);
		results.set([]);
		searchQuery.set('');
		activeResult.set({
			index: 0,
			section: ''
		});
	}
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input in:slide type="text" bind:this={input} bind:value={$searchQuery} placeholder="search the handbook" on:keyup={handleKeyup} />
		</section>
		<section id="arrowArea">
			<button on:click={decrementResult}>
				<LeftArrow width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
			<button on:click={incrementResult}>
				<RightArrow width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
		<section id="closeArea">
			<button on:click={closeSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
</aside>

<style>
	@media screen and (max-width: 450px) {
		
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		
	}

	@media screen and (min-width: 1101px) {
		aside {
			width: 100%;
			height: 85%;
			position: fixed;
			top: 0;
			right: 0;
			display: grid;
			grid-template-rows: 6% 94%;
		}

		#searchBox {
			display: grid;
			grid-template-columns: 1fr 565px 85px 85px;
			grid-template-areas: ". inputArea arrowArea closeArea";
			align-items: center;
			background: var(--brand);
		}

		#inputArea {
			border-radius: 1px;
			grid-area: inputArea;
			display: grid;
			grid-template-columns: 45px 50px 1fr;
			grid-template-areas: ". searchIcon input";
			align-items: center;
		}

		#arrowArea {
			grid-area: arrowArea;
			text-align: center;
		}

		#closeArea {
			grid-area: closeArea;
			text-align: center;
		}

		input {
			font-size: 21px;
			letter-spacing: 2px;
			font-family: "Montserrat-Bold";
			color: var(--white);
			padding-bottom: 5px;
			background: none;
			border: none;
			outline: none;
			display: block;
			width: 100%;
			grid-area: input;
			border-bottom: 3px solid var(--white);
		}

		input:focus {
			outline: none;
		}

		#searchIcon {
			grid-area: searchIcon;
		}
	}
</style>