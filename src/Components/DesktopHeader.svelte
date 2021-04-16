<script>
	import { fade } from 'svelte/transition';
	import { active } from 'tinro';

	import { searchOpen, results } from './../stores.js';

	let search_open_value;

	const unsubscribeSearchOpen = searchOpen.subscribe(value => {
		search_open_value = value;
	});

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	import Search from './../Graphics/Icons/Search.svelte';
	import Access from './../Graphics/Icons/Access.svelte';

	import HandbookSearch from './../Components/HandbookSearch.svelte';
	import ResultNavigator from './../Components/ResultNavigator.svelte';

	export let showSearch = false;

	function toggleSearch() {
		searchOpen.set(!search_open_value);

		dispatch('search-toggled');
	}
</script>

<nav>
	<aside>
		<a href="/">
			<Access width={'15rem'} />
		</a>
	</aside>
	<section class="top">
		{#if $searchOpen}
			<section class="search-area" in:fade="{{duration: 300}}">
				<HandbookSearch on:close-search={toggleSearch} />
			</section>
		{:else if !$searchOpen && $results.length > 0}
			<ResultNavigator />
		{:else}
			<section class="link-navigation-area">
				<ul>
					<li><a href="/" use:active exact>About</a></li>
					<li><a href="/handbook" use:active>Handbook</a></li>
					<li><a href="/documents" use:active>Documents</a></li>
					<li><a href="/help" use:active>Help</a></li>
				</ul>
				<button id="searchButton" on:click={toggleSearch}>
					<Search color={'#FFFFFF'} width={'25px'} height={'25px'} />
				</button>
			</section>
		{/if}
	</section>
</nav>

<style>
	nav {
		display: grid;
		height: 100px;
		width: 100%;
		grid-template-rows: .85fr 1fr;
		grid-template-areas: 
			"top"
			".";
		position: fixed;
		z-index: 6;
		top: 0;
		left: 0;
	}

	aside {
		position: fixed;
		top: 0;
		left: 2rem;
		background: var(--white);
		padding: 3rem;
		z-index: 7;
	}

	.top {
		grid-area: top;
		display: grid;
		align-items: center;
		z-index: 6;
		background: var(--brand);
		grid-template-columns: auto auto;
		grid-template-areas: ". navigationArea";
	}

	.link-navigation-area {
		grid-area: navigationArea;
		text-align: right;
		display: grid;
		align-items: center;
		grid-template-columns: 90% 2% 8%;
		grid-template-areas: "linkList . search";
	}

	.search-area {
		grid-area: navigationArea;
	}

	ul {
		grid-area: linkList;
	}

	li {
		display: inline-block;
		margin: 0 20px;
	}

	li a {
		font-size: 21px;
		padding: 0;
		color: var(--white);
		font-family: "Montserrat-Bold";
		text-transform: uppercase;
	}

	#searchButton {
		display: block;
		grid-area: search;
	}
</style>