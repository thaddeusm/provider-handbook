<script>
	import { router } from 'tinro';
	import { search, closeSearch, openResultNavigator, clearResults } from './../search.js';

	import { navigatingResults, results, searchQuery, activeResult } from './../stores.js';

	let results_value;

	const unsubscribeResults = results.subscribe(value => {
		results_value = value;
	});

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	import ResultCard from './../Components/ResultCard.svelte';

	import Search from './../Icons/Search.svelte';
	import Close from './../Icons/Close.svelte';

	import { onMount, onDestroy } from 'svelte';

	let input;

	let message = 'Enter a keyword to search the handbook.';

	function handleKeyup(e) {
		runSearch();
	}

	function runSearch() {
		if (search_query_value !== '') {
			results.set(search(search_query_value));
		} else {
			message = 'Enter a keyword to search the handbook.';
			clearResults();
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
			jumpToId(section, '/handbook');
			openResultNavigator();
			closeSearch();
		}, 100, section);
	}

	onMount(() => {
		input.focus();
		document.body.style.overflow = 'hidden';
		runSearch();
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#000000'} width={'2rem'} height={'2rem'} />
			</section>
			<input type="text" bind:this={input} bind:value={$searchQuery} on:keyup={handleKeyup} />
		</section>
		<section id="closeArea">
			<button on:click={closeSearch} aria-label="Close Search">
				<Close width={'2rem'} height={'2rem'}  />
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
	@media screen and (max-width: 450px) {
		#searchBox {
			grid-template-columns: .08fr 1.4fr 65px;
		}

		#inputArea {
			grid-template-columns: 45px 1fr;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		#searchBox {
			grid-template-columns: 25px 1.4fr 100px;
		}

		#inputArea {
			grid-template-columns: 50px 1fr;
		}
	}

	aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: var(--white);
		z-index: 3000;
		display: grid;
		grid-template-rows: 100px 1fr;
		overflow: auto;
	}

	#searchBox {
		display: grid;
		grid-template-areas: ". inputArea closeArea";
		align-items: center;
	}

	#inputArea {
		border: 1px solid var(--brand);
		border-radius: var(--radius);
		padding: 10px 5px 8px 5px;
		grid-area: inputArea;
		display: grid;
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
		font-family: "NotoSans-Bold";
		background: none;
		border: none;
		outline: none;
		display: block;
		width: 100%;
		grid-area: input;
	}

	input:focus {
		outline: none;
	}

	#searchIcon {
		grid-area: searchIcon;
	}

	#results {
		text-align: left;
	}

	#resultList {
		grid-area: resultList;
		background: var(--white);
		width: 100%;
		height: 100%;
		overflow: auto;
		list-style: none;
	}

	li > h6 {
		margin-top: 10px;
		text-align: center;
	}

	#resultList > li {
		background: var(--gray);
		padding: 10px 10px 20px 10px;
		margin: 30px 0;
	}
</style>