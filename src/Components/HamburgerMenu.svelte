<script>
	import { router } from 'tinro';

	import Hamburger from './../Icons/Hamburger.svelte';
	import Close from './../Icons/Close.svelte';

	export let menuOpen = false;

	$: if ($router.path) {
		closeMenu();
	}

	function openMenu() {
		document.body.style.overflow = 'hidden';
		window.scrollTo(0, 0);
		menuOpen = true;
	}

	function closeMenu() {
		document.body.style.overflow = 'auto';
		menuOpen = false;
	}
</script>

{#if menuOpen}
	<div class="button-container">
		<button on:click={closeMenu} aria-label="Close Navigation Menu">
			<Close width={'2rem'} height={'2rem'}  />
		</button>
		<slot>

		</slot>
	</div>
{:else}
	<div class="button-container">
		<button on:click={openMenu} aria-label="Open Navigation Menu">
			<Hamburger width={'2rem'} height={'2rem'}  />
		</button>
	</div>
{/if}

<style>
	.button-container {
		height: 100%;
		width: 100%;
		z-index: 200;
	}
</style>