<script>
	import { router } from 'tinro';

	import Hamburger from './../Graphics/Icons/Hamburger.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

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

<style>
	.button-container {
		height: 100%;
		width: 100%;
		z-index: 200;
	}
</style>
{#if menuOpen}
	<div class="button-container">
		<button on:click={closeMenu}>
			<Close width={'2rem'} height={'2rem'}  />
		</button>
		<slot>

		</slot>
	</div>
{:else}
	<div class="button-container">
		<button on:click={openMenu}>
			<Hamburger width={'2rem'} height={'2rem'}  />
		</button>
	</div>
{/if}