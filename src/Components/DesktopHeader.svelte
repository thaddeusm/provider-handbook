<script>
	import { fade } from 'svelte/transition';
	import { active } from 'tinro';
	import Search from './../graphics/icons/Search.svelte';
	import Access from './../graphics/icons/Access.svelte';

	import HandbookSearch from './../components/HandbookSearch.svelte';

	let showSearch = false;

	function toggleSearch() {
		showSearch = !showSearch;
	}
</script>

<nav>
	<aside>
		<a href="/">
			<Access width={'15rem'} />
		</a>
	</aside>
	<section class="top">
		{#if showSearch}
			<section class="search-area" in:fade="{{duration: 300}}">
				<HandbookSearch on:close-search={toggleSearch} />
			</section>
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
		height: 100%;
		grid-template-rows: .70fr 1fr;
		grid-template-areas: 
			"top"
			".";
	}

	aside {
		position: fixed;
		top: 0;
		left: 2rem;
		background: var(--white);
		padding: 3rem;
		z-index: 3;
	}

	.top {
		grid-area: top;
		display: grid;
		align-items: center;
		z-index: 2;
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