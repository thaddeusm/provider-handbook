<script>
	import { slide } from 'svelte/transition';
	import { router } from 'tinro';

	import { searchOpen, results, navigatingResults } from './../stores.js';

	import { closeSearch, openSearch } from './../search.js';

	import { onMount } from 'svelte';

	import Handbook from './../Docs/Handbook.json';

	import Access from './../Icons/Access.svelte';
	import DownArrow from './../Icons/DownArrow.svelte';
	import UpArrow from './../Icons/UpArrow.svelte';
	import Search from './../Icons/Search.svelte';

	import HamburgerMenu from './../Components/HamburgerMenu.svelte';
	import MobileHandbookSearch from './../Components/MobileHandbookSearch.svelte';
	import ResultNavigator from './../Components/ResultNavigator.svelte';

	let showSecondaryList = false;
	let menuOpen = false;
	let scrolled = false;;

	$: {
		if ($router.path == '/handbook') {
			showSecondaryList = true;
		} else {
			showSecondaryList = false;
		}
	}

	function toggleSecondaryList() {
		showSecondaryList = !showSecondaryList;
	}

	function navigate(sectionId) {	
		menuOpen = false;
		document.body.style.overflow = 'auto';
		router.goto('/handbook');
		setTimeout(() => {
			jumpToId(sectionId);
		}, 100, sectionId);
	}

	function handleScroll(e) {
		let position = window.scrollY;

		if (position > 50) {
			scrolled = true;
		} else {
			scrolled = false;
		}
	}
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<nav>
	<section class="left">
		{#if !$navigatingResults}
			<HamburgerMenu {menuOpen}>
				<div class="tray">
					<ul class="primary-list">
						<li><a href="/">about</a></li>
						<li class="secondary-list-item">
							<a href="/handbook">handbook</a>
							<button on:click={toggleSecondaryList}>
								{#if showSecondaryList}
									<UpArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
								{:else}
									<DownArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
								{/if}
							</button>
							{#if showSecondaryList}
								<ul class="secondary-list" in:slide="{{duration: 200}}">
									{#each Handbook.sections as handbookSection, i}
										{#each handbookSection as section, j}
											{#if section.style.includes('heading')}
												<li class={section.style.includes('subheading') ? 'subheading' : ''}>
													<button on:click={() => {navigate(section.text.split(' ').join(''))}}>
														{section.text}
													</button>
												</li>
											{/if}
										{/each}
									{/each}
								</ul>
							{/if}
						</li>
						<!-- <li><a href="/documents">documents</a></li> -->
					</ul>
				</div>
			</HamburgerMenu>
		{/if}
	</section>
	<section class="center">
		{#if !$navigatingResults}
			<a href="/">
				<Access width={'9rem'} />
			</a>
		{/if}
	</section>
	<section class="right">
		{#if $searchOpen}
			<MobileHandbookSearch on:close-search={closeSearch} />
		{:else if $navigatingResults}
			<ResultNavigator />
		{:else}
			<button id="searchButton" class:scrolled on:click={openSearch}>
				<Search color={'#000000'} width={'2rem'} height={'2rem'} />
			</button>
		{/if}
	</section>
</nav>

<style>
	@media screen and (max-width: 450px) {
		nav {
			grid-template-columns: 65px 1fr 65px;
		}

		.secondary-list-item {
			grid-template-columns: 80% 20%;
		}

		.secondary-list {
			max-height: 300px;
			overflow: auto;
		}

		#searchButton {
			width: 70px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		nav {
			grid-template-columns: 100px 1fr 100px;
		}

		.secondary-list-item {
			grid-template-columns: 90% 10%;
		}

		.secondary-list {
			max-height: 300px;
			overflow: auto;
		}

		#searchButton {
			width: 100px;
		}
	}

	nav {
		display: grid;
		align-items: center;
		height: 100px;
		width: 100%;
		background: var(--white);
		grid-template-areas: "left center right";
		top: 0;
		left: 0;
	}

	.left {
		grid-area: left;
		text-align: center;
	}

	.center {
		grid-area: center;
		text-align: center;
	}

	.right {
		grid-area: right;
		text-align: center;
	}

	.tray {
		position: absolute;
		left: 0;
		top: 100px;
		width: 100%;
		height: 100%;
		overflow: auto!important;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-areas: 
			"primaryList";
		z-index: 100;
	}

	.primary-list {
		list-style: none;
		background: var(--brand);
		grid-area: primaryList;
		text-align: left;
	}

	.primary-list > li {
		text-align: left;
		padding-left: 30px;
		margin: 40px 0;
	}

	.primary-list > li > a {
		color: var(--white);
		font-size: 21px;
		font-family: "Montserrat-Bold";
		text-transform: uppercase;
	}

	.secondary-list-item {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-areas: 
			"link btn"
			"subList subList";
		align-items: center;
	}

	.secondary-list-item > a {
		grid-area: link;
	}

	.secondary-list-item > button {
		grid-area: btn;
	}

	.secondary-list {
		grid-area: subList;
		background: var(--brand-dark);
		margin-top: 10px;
		margin-left: -30px;
	}

	.secondary-list > li {
		text-align: left;
		padding-left: 30px;
		margin: 15px 0;
	}

	.secondary-list > li > button {
		color: var(--white);
		font-size: 16px;
		font-family: "Montserrat";
		cursor: pointer;
		text-align: left;
	}

	.subheading {
		padding-left: 3rem!important;
	}

	#searchButton {
		position: fixed;
		top: 0;
		right: 0;
		height: 50px;
		margin-top: 20px;
		padding-top: 5px;
		margin-bottom: 30px;
	}

	.scrolled {
		background: var(--white);
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		box-shadow: var(--shadow);
	}
</style>