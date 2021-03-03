<script>
	import {Route, router, active} from 'tinro';
	router.mode.hash();

	import About from './Views/About.svelte';
	import Handbook from './Views/Handbook.svelte';
	import Documents from './Views/Documents.svelte';
	import Help from './Views/Help.svelte';

	import MobileHeader from './Components/MobileHeader.svelte';

	let title;

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
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div id="app">
	<header>
		<!-- <a href="/" use:active exact>About</a>
		<a href="/handbook" use:active>Handbook</a>
		<a href="/documents" use:active>Documents</a>
		<a href="/help" use:active>Help</a> -->
		<MobileHeader />
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
	<footer>
		<h6>sponsored by the U.S. Department of State</h6>
	</footer>
</div>

<style>
	#app {
		height: 100%;
		display: grid;
		grid-template-rows: 15% auto 100px;
	}

	main {
		/*overflow: auto;*/
	}

	footer {
		display: grid;
		align-items: center;
		text-align: center;
		padding: 0 10px;
	}
</style>