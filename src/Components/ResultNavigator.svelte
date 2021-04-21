<script>
	import { search, clearResults, resetSearchQuery, openSearch, closeSearch, openResultNavigator, closeResultNavigator, incrementActiveResult, decrementActiveResult } from './../search.js';
	import { onMount, onDestroy } from 'svelte';

	import Search from './../Graphics/Icons/Search.svelte';
	import RightArrow from './../Graphics/Icons/RightArrow.svelte';
	import LeftArrow from './../Graphics/Icons/LeftArrow.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

	import { navigatingResults, searchOpen, results, searchQuery, activeResult } from './../stores.js';

	let input;

	function handleKeyup() {
		openSearch();
		clearResults();
	}

	function handleCloseButtonClick() {
		closeSearch();
		closeResultNavigator();
		clearResults();
		resetSearchQuery();
	}

	onMount(() => {
		openResultNavigator();
	});

	onDestroy(() => {
		closeResultNavigator();
	});
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input type="text" bind:this={input} bind:value={$searchQuery} placeholder="search the handbook" on:keyup={handleKeyup} />
			<span id="resultLocation">
				{`${$activeResult.index + 1} of ${$results.length}`}
			</span>
		</section>
		<section id="arrowArea">
			<button on:click={decrementActiveResult}>
				<LeftArrow width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
			<button on:click={incrementActiveResult}>
				<RightArrow width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
		<section id="closeArea">
			<button on:click={handleCloseButtonClick}>
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
			height: 100px;
			position: fixed;
			right: 0;
			display: grid;
			grid-template-rows: 1fr;
			align-items: center;
		}

		#searchBox {
			display: grid;
			grid-template-columns: 1fr 550px 100px 85px;
			grid-template-areas: ". inputArea arrowArea closeArea";
			align-items: center;
			background: var(--brand);
		}

		#inputArea {
			border-radius: 1px;
			grid-area: inputArea;
			display: grid;
			grid-template-columns: 45px 50px 1fr auto;
			grid-template-areas: ". searchIcon input resultLocation";
			align-items: center;
		}

		#arrowArea {
			grid-area: arrowArea;
			text-align: center;
			align-self: center;
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

		#resultLocation {
			font-size: 21px;
			letter-spacing: 2px;
			font-family: "Montserrat-Bold";
			color: var(--gray);
			padding-bottom: 5px;
			background: none;
			border: none;
			text-align: right;
			outline: none;
			display: block;
			width: 100%;
			grid-area: resultLocation;
			border-bottom: 3px solid var(--white);
		}

		#searchIcon {
			grid-area: searchIcon;
		}
	}
</style>