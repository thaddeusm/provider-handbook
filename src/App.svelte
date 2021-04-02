<script>
	import { Route, router } from 'tinro';
	router.mode.hash();
	import { onMount } from 'svelte';

	import About from './Views/About.svelte';
	import Handbook from './Views/Handbook.svelte';
	import Documents from './Views/Documents.svelte';
	import Help from './Views/Help.svelte';

	import MobileHeader from './Components/MobileHeader.svelte';
	import DesktopHeader from './Components/DesktopHeader.svelte';

	let title;

	let activeHandbookSection;

	let showMobileHeader = false;

	$: {
		if ($router.path == '/') {
			title = 'Access - Provider Handbook';
		} else {
			let path = $router.path.split('/').join('');
			let firstLetter = path[0].toUpperCase();
			let revisedPathTitle = firstLetter + path.slice(1);

			title = 'Access - Provider Handbook | ' + revisedPathTitle;
		}
	}

	function toggleSearch() {
		searchOpen = !searchOpen;
	}

	function handleResize() {
		if (window.innerWidth < 1101) {
			showMobileHeader = true;
		} else {
			showMobileHeader = false;
		}
	}

	onMount(() => {
		handleResize();
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<svelte:window on:resize={handleResize} />

<div id="app">
	<header>
		{#if showMobileHeader}
			<MobileHeader />
		{:else}
			<DesktopHeader />
		{/if}
	</header>
	<main>
		<Route path="/">
			<About />
		</Route>
		<Route path="/handbook">
			<Handbook />
		</Route>
		<Route path="/documents">
			<Documents />
		</Route>
		<Route path="/help">
			<Help />
		</Route>
		<Route fallback>
			<About />
		</Route>
	</main>
</div>

<style>
	#app {
		height: 100%;
		display: grid;
		grid-template-rows: 100px auto;
	}

	main {
		/*overflow: auto;*/
	}
</style>