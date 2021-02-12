<script>
	import {Route, active} from 'tinro'; 

	import About from './Views/About.svelte';
	import Handbook from './Views/Handbook.svelte';
	import Documents from './Views/Documents.svelte';
	import Help from './Views/Help.svelte';
</script>

<div id="app">
	<header>
		<a href="/" use:active exact>About</a>
		<a href="/handbook" use:active>Handbook</a>
		<a href="/documents" use:active>Documents</a>
		<a href="/help" use:active>Help</a>
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
	@media screen and (max-width: 800px) {

	}

	@media screen and (min-width: 801px) {
		
	}
</style>