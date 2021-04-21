<script>
	import { search, clearResults, resetSearchQuery, openSearch, closeSearch, openResultNavigator, closeResultNavigator, incrementActiveResult, decrementActiveResult, resetSearch } from './../search.js';
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
			<button on:click={resetSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
</aside>

<style>
	@media screen and (max-width: 450px) {
		#searchBox {
			grid-template-columns: .08fr 1.4fr 65px;
		}

		#inputArea {
			grid-template-columns: 20% 80%;
		}

		aside {
			top: 0;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		#searchBox {
			grid-template-columns: 25px 1.4fr 100px;
		}

		#inputArea {
			grid-template-columns: 50px 1fr;
		}

		aside {
			top: 0;
		}
	}

	@media screen and (min-width: 1101px) {
		#inputArea {
			grid-template-columns: 45px 50px 1fr auto;
		}

		#searchBox {
			grid-template-columns: 1fr 550px 100px 85px;
			grid-template-areas: ". inputArea arrowArea closeArea";
			background: var(--brand);
		}

		input {
			padding-bottom: 5px;
			border-bottom: 3px solid var(--white)!important;
			color: var(--white);
		}

		#resultLocation {
			padding-bottom: 5px;
			border-bottom: 3px solid var(--white)!important;
			color: var(--gray);
		}
	}

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
		align-items: center;
	}

	#searchIcon {
		grid-area: searchIcon;
	}

	#inputArea {
		border-radius: 1px;
		grid-area: inputArea;
		display: grid;
		grid-template-areas: ". searchIcon input resultLocation";
		align-items: center;
	}

	#resultLocation {
		font-size: 21px;
		letter-spacing: 2px;
		font-family: "Montserrat-Bold";
		background: none;
		border: none;
		text-align: right;
		outline: none;
		display: block;
		width: 100%;
		grid-area: resultLocation;
	}

	input {
		font-size: 21px;
		letter-spacing: 2px;
		font-family: "Montserrat-Bold";
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

	#arrowArea {
		grid-area: arrowArea;
		text-align: center;
		align-self: center;
	}

	#closeArea {
		grid-area: closeArea;
		text-align: center;
	}
</style>