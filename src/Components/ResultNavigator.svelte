<script>
	import { search, clearResults, resetSearchQuery, openSearch, closeSearch, openResultNavigator, closeResultNavigator, incrementActiveResult, decrementActiveResult, resetSearch } from './../search.js';

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
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<div class="small-icon">
					<Search color={'#000000'} width={'2rem'} height={'2rem'} />
				</div>
				<div class="large-icon">
					<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
				</div>
			</section>
			<input type="text" bind:this={input} bind:value={$searchQuery} placeholder="search the handbook" on:keyup={handleKeyup} />
			<span id="resultLocation">
				{`${$activeResult.index + 1} / ${$results.length}`}
			</span>
		</section>
		<section id="arrowArea">
			<button on:click={decrementActiveResult} disabled={$activeResult.index == 0}>
				<div class="small-icon">
					<LeftArrow color={'#000000'} width={'2rem'} height={'2rem'} />
				</div>
				<div class="large-icon">
					<LeftArrow color={'#FFFFFF'} width={'25px'} height={'25px'} />
				</div>
			</button>
			<button on:click={incrementActiveResult} disabled={$activeResult.index == $results.length - 1}>
				<div class="small-icon">
					<RightArrow color={'#000000'} width={'2rem'} height={'2rem'} />
				</div>
				<div class="large-icon">
					<RightArrow color={'#FFFFFF'} width={'25px'} height={'25px'} />
				</div>
			</button>
		</section>
		<section id="closeArea">
			<button on:click={resetSearch}>
				<div class="small-icon">
					<Close color={'#000000'} width={'2rem'} height={'2rem'} />
				</div>
				<div class="large-icon">
					<Close color={'#FFFFFF'} width={'25px'} height={'25px'} />
				</div>
			</button>
		</section>
	</section>
</aside>

<style>
	@media screen and (max-width: 450px) {
		#searchBox {
			grid-template-columns: .08fr .85fr .55fr 65px;
			grid-template-areas: ". inputArea arrowArea closeArea";
		}

		#inputArea {
			grid-template-columns: 45px 1fr;
			grid-template-areas: "searchIcon input";
			border: 1px solid var(--brand)!important;
			border-radius: 1px;
			padding: 10px 5px 8px 5px;
		}

		aside {
			height: 100px;
			background: var(--white);
			align-items: center;
		}

		input {
			color: var(--black);
		}

		#resultLocation {
			display: none!important;
		}

		#arrowArea {
			text-align: right;
			align-self: center;
		}

		.large-icon {
			display: none;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		#searchBox {
			grid-template-columns: 25px 1fr 100px 100px;
			grid-template-areas: ". inputArea arrowArea closeArea";
		}

		#inputArea {
			grid-template-columns: 50px .5fr .5fr;
			grid-template-areas: "searchIcon input resultLocation";
			border: 1px solid var(--brand);
			border-radius: 1px;
			padding: 10px 15px 8px 5px;
		}

		aside {
			height: 100px;
			background: var(--white);
			align-items: center;
		}

		input {
			color: var(--black);
		}

		#resultLocation {
			color: var(--dark-gray);
			font-size: 15px;
		}

		#arrowArea {
			text-align: right;
		}

		.large-icon {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		aside {
			height: 50px;
		}

		#inputArea {
			grid-template-columns: 45px 50px 1fr auto;
			grid-template-areas: ". searchIcon input resultLocation";
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
			font-size: 21px;
		}

		#arrowArea {
			text-align: center;
			align-self: center;
		}

		.small-icon {
			display: none;
		}
	}

	aside {
		width: 100%;
		position: fixed;
		right: 0;
		top: 0;
		display: grid;
		grid-template-rows: 1fr;
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
		align-items: center;
	}

	#resultLocation {
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
	}

	#closeArea {
		grid-area: closeArea;
		text-align: center;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: .2;
	}
</style>