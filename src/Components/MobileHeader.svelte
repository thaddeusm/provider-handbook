<script>
	import Access from './../graphics/icons/Access.svelte';
	import DownArrow from './../graphics/icons/DownArrow.svelte';
	import UpArrow from './../graphics/icons/UpArrow.svelte';
	import Search from './../graphics/icons/Search.svelte';

	import HamburgerMenu from './../components/HamburgerMenu.svelte';
	import HandbookSearch from './../components/HandbookSearch.svelte';

	let showTagline = true;
	let showSub = false;
	let showSearch = false;

	function toggleLogo() {
		showTagline = !showTagline
	}

	function toggleSub() {
		showSub = !showSub
	}

	function toggleSearch() {
		showSearch = !showSearch
	}
</script>

<nav>
	<section class="left">
		<HamburgerMenu on:menu-toggled={toggleLogo}>
			<div class="tray">
				<ul class="primary-list">
					<li><a href="/">about</a></li>
					<li><a href="/handbook">handbook</a></li>
					<li class="sub">
						<a href="/documents">documents</a>
						<button on:click={toggleSub}>
							{#if showSub}
								<UpArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
							{:else}
								<DownArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
							{/if}
						</button>
						{#if showSub}
							<ul class="secondary-list">
								<li>
									<a>test</a>
								</li>
							</ul>
						{/if}
					</li>
					<li><a href="/help">help</a></li>
				</ul>
			</div>
		</HamburgerMenu>
	</section>
	<section class="center">
		<Access width={'90%'} {showTagline} />
	</section>
	<section class="right">
		{#if showSearch}
			<HandbookSearch on:close-search={toggleSearch} />
		{:else}
			<button on:click={toggleSearch}>
				<Search color={'#000000'} width={'2rem'} height={'2rem'} />
			</button>
		{/if}
	</section>
</nav>

<style>
	nav {
		display: grid;
		align-items: center;
		height: 100%;
		grid-template-columns: .5fr 1fr .5fr;
		grid-template-areas: "left center right";
	}

	.left {
		grid-area: left;
		text-align: center;
	}

	.center {
		grid-area: center;
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
		grid-template-columns: 80% 20%;
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
	}
</style>