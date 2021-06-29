<script>
	import { router } from 'tinro';
	import { onMount, onDestroy } from 'svelte';

	import { search, resetSearch, closeSearch, openResultNavigator, clearResults } from './../search.js';

	import { navigatingResults, results, searchQuery, activeResult } from './../stores.js';

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	let results_value;

	const unsubscribeResults = results.subscribe(value => {
		results_value = value;
	});

	let active_result_value;

	const unsubscribeActiveResult = activeResult.subscribe(value => {
		active_result_value = value;
	});

	import ResultCard from './../Components/ResultCard.svelte';

	import Search from './../Icons/Search.svelte';
	import Close from './../Icons/Close.svelte';

	let input;
	let message = 'Enter a keyword to search the handbook.';

	function handleKeyup(e) {
		runSearch();
	}

	function runSearch() {
		if (search_query_value !== '') {
			results.set(search(search_query_value));
		} else {
			clearResults();
			message = 'Enter a keyword to search the handbook.';
		}

		if (results_value.length == 0 && search_query_value !== '') {
			message = 'Nothing found. Please try a different keyword.'
		}
	}

	function navigate(e) {
		let section = e.detail.section;
		let index = e.detail.index;

		activeResult.set({
			index: index,
			section: section
		});

		router.goto('/handbook');
		setTimeout(() => {
			jumpToId(section);
			openResultNavigator();
			closeSearch();
		}, 100, section);
	}

	onMount(() => {
		input.focus();
		runSearch();
	});
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input type="text" bind:this={input} bind:value={$searchQuery} placeholder="search the handbook" on:keyup={handleKeyup} />
		</section>
		<section id="closeArea">
			<button on:click={resetSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
	<section id="results">
		<ul id="resultList">
			{#each $results as result, i}
				<li>
					<ResultCard {result} index={i} on:navigate={navigate} />
				</li>
			{:else}
				<li>
					<h6>{message}</h6>
				</li>
			{/each}
		</ul>
	</section>
</aside>

<style>
	aside {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		display: grid;
		grid-template-rows: 50px 1fr;
	}

	#searchBox {
		display: grid;
		grid-template-columns: 1fr 650px 85px;
		grid-template-areas: ". inputArea closeArea";
		align-items: center;
		background: var(--brand);
	}

	#results {
		display: grid;
		grid-template-columns: 1fr 725px;
		grid-template-areas: ". resultList";
	}

	#resultList {
		grid-area: resultList;
		background: var(--white);
		margin: 0 85px 0 85px;
		height: 50%;
		max-height: 500px;
		overflow: auto;
		box-shadow: var(--shadow);
		list-style: none;
	}

	li > h6 {
		margin-top: 10px;
		text-align: center;
	}

	#resultList > li:first-child {
		margin-top: 25px;
	}

	#resultList > li {
		background: var(--gray);
		padding: 10px 20px 20px 20px;
		margin: 50px 0;
	}

	#inputArea {
		border-radius: 1px;
		grid-area: inputArea;
		display: grid;
		grid-template-columns: 45px 50px 1fr;
		grid-template-areas: ". searchIcon input";
		align-items: center;
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
</style>