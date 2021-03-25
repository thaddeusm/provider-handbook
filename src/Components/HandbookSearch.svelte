<script>
	import { slide } from 'svelte/transition';
	import { search } from './../search.js';

	import Search from './../Graphics/Icons/Search.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	let query = '';
	let results = [];

	function closeSearch() {
		dispatch('close-search');
	}

	function handleKeyup(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			results = search(query);

			console.log(results);
		}
	}
</script>

<aside>
	<section id="searchBox">
		<section id="inputArea">
			<section id="searchIcon">
				<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
			</section>
			<input in:slide type="text" bind:value={query} placeholder="Search Handbook" on:keyup={handleKeyup}>
		</section>
		<section id="closeArea">
			<button on:click={closeSearch}>
				<Close width={'25px'} height={'25px'} color={'#FFFFFF'} />
			</button>
		</section>
	</section>
	<section id="results">
		<ul id="resultList">
			{#each results as result}
				<li>
					<h3>
						{result.sectionTitle}
					</h3>
					<p>
						{@html result.textSample}
					</p>
				</li>
			{/each}
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
		grid-template-columns: 1fr 655px 95px;
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
		margin: 0 95px;
		height: 50%;
		overflow: auto;
		box-shadow: var(--shadow);
		list-style: none;
	}

	#resultList > li {
		background: var(--gray);
		padding: 20px;
		margin: 20px 0;
	}

	#resultList > li > p {
		background: var(--white);
		padding: 5px 10px;
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