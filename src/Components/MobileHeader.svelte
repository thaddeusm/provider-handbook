<script>
	import Access from './../graphics/icons/Access.svelte';
	import HamburgerMenu from './../components/HamburgerMenu.svelte';

	let showTagline = true;

	function toggleLogo() {
		showTagline = !showTagline
	}
</script>

<nav>
	<section class="left">
		<HamburgerMenu on:menu-toggled={toggleLogo}>
			<div class="tray">
				<ul>
					<li><a href="/">about</a></li>
					<li><a href="/handbook">handbook</a></li>
					<li><a href="/documents">documents</a></li>
					<li><a href="/help">help</a></li>
				</ul>
			</div>
		</HamburgerMenu>
	</section>
	<section class="center">
		<Access width={'90%'} {showTagline} />
	</section>
	<section class="right"></section>
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

	ul {
		list-style: none;
		background: var(--brand);
		display: grid;
		height: 85%;
		align-items: center;
	}

	li {
		text-align: left;
		padding-left: 30px;
	}

	li > a {
		color: var(--white);
		font-size: 21px;
		font-family: "Montserrat-Bold";
		text-transform: uppercase;
	}
</style>