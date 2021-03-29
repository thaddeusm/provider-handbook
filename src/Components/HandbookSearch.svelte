<script>
	import { router } from 'tinro';
	import { slide } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';

	import { search } from './../search.js';

	import { results, searchQuery } from './../stores.js';

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	let results_value;

	const unsubscribeResults = results.subscribe(value => {
		results_value = value;
	});

	import ResultCard from './../Components/ResultCard.svelte';

	import Search from './../Graphics/Icons/Search.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	let message = 'Enter a keyword to search the handbook.';
	let input;

	function closeSearch() {
		dispatch('close-search');
		searchQuery.set('');
		results.set([]);
	}

	function handleKeyup(e) {
		searchQuery.set(input.value);

		if (e.keyCode == 13 || e.keyCode == 32) {
			results.set(search(search_query_value));

			if (results_value.length == 0) {
				message = 'Nothing found. Please try a different keyword.'
			}
		}
	}

	function navigate(e) {
		let section = e.detail.section;
		router.goto('/handbook');
		setTimeout(() => {
			jumpToId(section);
			closeSearch();
		}, 100, section);
	}

	onMount(() => {
		input.focus();
	});
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input in:slide type="text" bind:this={input} bind:value={$searchQuery} placeholder="Search Handbook" on:keyup={handleKeyup} autocomplete="off">
		</section>
		<section id="closeArea">
			<button on:click={closeSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
	<section id="results">
		<ul id="resultList">
			{#if $results.length > 0}
				{#each $results as result}
					<li>
						<ResultCard {result} on:navigate={navigate} />
					</li>
				{/each}
			{:else}
				<li>
					<h6>{message}</h6>
				</li>
			{/if}
		</ul>
	</section>
</aside>

<style>
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
		grid-template-columns: 1fr 675px 75px;
		grid-template-areas: ". inputArea closeArea";
		align-items: center;
		background: var(--brand);
	}

	#results {
		display: grid;
		grid-template-columns: 1fr 750px;
		grid-template-areas: ". resultList";
	}

	#resultList {
		grid-area: resultList;
		background: var(--white);
		margin: 0 75px 0 95px;
		height: 50%;
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

	#resultList > li > h3 {
		margin-top: 0!important;
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
		text-transform: uppercase;
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