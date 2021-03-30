<script>
	import { slide } from 'svelte/transition';
	import { router } from 'tinro';

	import { searchOpen } from './../stores.js';

	let search_open_value;

	const unsubscribeSearchOpen = searchOpen.subscribe(value => {
		search_open_value = value;
	});

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	import Handbook from './../Docs/Handbook.json';

	import Access from './../Graphics/Icons/Access.svelte';
	import DownArrow from './../Graphics/Icons/DownArrow.svelte';
	import UpArrow from './../Graphics/Icons/UpArrow.svelte';
	import Search from './../Graphics/Icons/Search.svelte';

	import HamburgerMenu from './../Components/HamburgerMenu.svelte';
	import MobileHandbookSearch from './../Components/MobileHandbookSearch.svelte';

	let showSub = false;
	let menuOpen = false;

	$: {
		if ($router.path == '/handbook') {
			showSub = true;
		} else {
			showSub = false;
		}
	}

	function toggleSub() {
		showSub = !showSub;
	}

	function toggleSearch() {
		searchOpen.set(!search_open_value);

		dispatch('search-toggled');
	}

	function navigate(sectionId) {	
		menuOpen = false;
		document.body.style.overflow = 'auto';
		router.goto('/handbook');
		setTimeout(() => {
			jumpToId(sectionId);
		}, 100, sectionId);
	}
</script>

<nav>
	<section class="left">
		<HamburgerMenu {menuOpen}>
			<div class="tray">
				<ul class="primary-list">
					<li><a href="/">about</a></li>
					<li class="sub">
						<a href="/handbook">handbook</a>
						<button on:click={toggleSub}>
							{#if showSub}
								<UpArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
							{:else}
								<DownArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
							{/if}
						</button>
						{#if showSub}
							<ul class="secondary-list" in:slide="{{duration: 200}}">
								{#each Handbook.sections as handbookSection, i}
									{#each handbookSection as section, j}
										{#if section.style.includes('heading')}
											<li class={section.style.includes('subheading') ? 'subheading' : ''}>
												<a on:click={() => {navigate(section.content.split(' ').join(''))}}>
													{section.content}
												</a>
											</li>
										{/if}
									{/each}
								{/each}
							</ul>
						{/if}
					</li>
					<li><a href="/documents">documents</a></li>
					<li><a href="/help">help</a></li>
				</ul>
			</div>
		</HamburgerMenu>
	</section>
	<section class="center">
		<a href="/">
			<Access width={'9rem'} />
		</a>
	</section>
	<section class="right">
		{#if $searchOpen}
			<MobileHandbookSearch on:close-search={toggleSearch} />
		{:else}
			<button on:click={toggleSearch}>
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

		.sub {
			grid-template-columns: 80% 20%;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		nav {
			grid-template-columns: 100px 1fr 100px;
		}

		.sub {
			grid-template-columns: 90% 10%;
		}
	}

	nav {
		display: grid;
		align-items: center;
		height: 100%;
		grid-template-areas: "left center right";
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
		top: 14%;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--brand);
		z-index: 100!important;
	}

	.primary-list {
		list-style: none;
		background: var(--brand);
		/*display: grid;
		height: 85%;
		align-items: center;*/
	}

	.primary-list > li {
		text-align: left;
		padding-left: 30px;
		margin: 50px 0;
	}

	.primary-list > li > a {
		color: var(--white);
		font-size: 21px;
		font-family: "Montserrat-Bold";
		text-transform: uppercase;
	}

	.sub {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-areas: 
			"link btn"
			"subList subList";
		align-items: center;
	}

	.sub > a {
		grid-area: link;
	}

	.sub > button {
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

	.secondary-list > li > a {
		color: var(--white);
		font-size: 15px;
		font-family: "Montserrat";
		cursor: pointer;
	}

	.subheading {
		padding-left: 3rem!important;
	}
</style>