<script>
	import { Route, router } from 'tinro';
	router.mode.hash();

	import About from './Views/About.svelte';
	import Handbook from './Views/Handbook.svelte';
	import Documents from './Views/Documents.svelte';
	import Help from './Views/Help.svelte';

	import MobileHeader from './Components/MobileHeader.svelte';
	import DesktopHeader from './Components/DesktopHeader.svelte';

	let title;

	let activeHandbookSection;

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
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div id="app">
	<header id="mobileHeader">
		<MobileHeader />
	</header>
	<header id="desktopHeader">
		<DesktopHeader />
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
	@media screen and (max-width: 1100px) {
		#mobileHeader {
			display: block;
		}

		#desktopHeader {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		#mobileHeader {
			display: none;
		}

		#desktopHeader {
			display: block;
		}
	}

	#app {
		height: 100%;
		display: grid;
		grid-template-rows: 100px auto;
	}

	main {
		/*overflow: auto;*/
	}
</style>