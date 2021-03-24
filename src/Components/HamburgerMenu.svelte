<script>
	import { router } from 'tinro';

	import Hamburger from './../Graphics/Icons/Hamburger.svelte';
	import Close from './../Graphics/Icons/Close.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: if ($router.path) {
		closeMenu();
	}

	let menuOpen = false;

	function openMenu() {
		document.body.style.overflow = 'hidden';
		window.scrollTo(0, 0);
		menuOpen = true;
		dispatch('menu-toggled');
	}

	function closeMenu() {
		document.body.style.overflow = 'auto';
		menuOpen = false;
		dispatch('menu-toggled');
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