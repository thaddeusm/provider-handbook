<script>
	import DesktopToC from './../Components/DesktopToC.svelte';
	import ResourceAvailable from './../Icons/ResourceAvailable.svelte';
	import Footer from './../Components/Footer.svelte';

	export let contentSource;
	export let path;
	export let activeId;
</script>

<div class="container">
	<aside>
		<DesktopToC sections={contentSource} {activeId} {path} />
	</aside>
	<div id="bodyContent">
		<slot></slot>
	</div>
	<footer>
		<Footer />
	</footer>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-columns: 0 1fr;
			grid-template-areas: 
				". bodyContent"
				". footer";
		}

		#bodyContent {
			padding: 0 1rem;
		}

		aside {
			display: none;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-columns: 0 1fr;
			grid-template-areas: 
				". bodyContent"
				". footer";
		}

		#bodyContent {
			padding: 0 2rem;
		}

		aside {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-columns: 410px auto;
			grid-template-areas: 
				". bodyContent"
				". footer";
			margin-top: -50px;
		}

		#bodyContent {
			max-width: 725px;
			margin: 0 auto;
			padding: 0 2rem;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 100px;
	}

	#bodyContent {
		grid-area: bodyContent;
		width: 100%;
	}

	aside {
		background: var(--brand-dark);
		position: fixed;
		height: 100%;
		margin-top: 10px;
		top: 0;
		width: 410px;
		overflow: auto;
		grid-area: links;
		z-index: 1;
	}

	footer {
		grid-area: footer;
	}
</style>