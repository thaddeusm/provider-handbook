<script>
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let allowClose = false;
	export let background = '#ffffff';

	let style = `background: ${background}`;

	function handleClick(e) {
		if (allowClose && e.target.tagName !== 'VIDEO') {
			dispatch('close');
		}
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<div class="overlay" in:fade="{{duration: 100}}" on:click={handleClick}>
	<div class="modal" style={style}>
		<slot name="body"></slot>
		<slot name="footer"></slot>
	</div>
</div>

<style>
	@media screen and (max-width: 450px) {
		.overlay {
			grid-template-rows: 70px 1fr 70px;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"."
				"modal"
				".";
		}

		.modal {
			height: 90%;
			width: 100%;
			grid-template-rows: 65% 35%;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.overlay {
			grid-template-rows: 70px 1fr 70px;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"."
				"modal"
				".";
		}

		.modal {
			height: 90%;
			width: 100%;
			grid-template-rows: 1fr auto;
		}
	}

	@media screen and (min-width: 1101px) {
		.overlay {
			grid-template-rows: 5% 1fr 5%;
			grid-template-columns: 5% 1fr 5%;
			grid-template-areas: 
				". . ."
				". modal ."
				". . .";
		}

		.modal {
			height: 90%;
			width: 90%;
			grid-template-rows: 1fr auto;
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: grid;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .9);
		z-index: 3000;
	}

	.modal {
		background: var(--white);
		overflow: auto!important;
		margin: 0 auto;
		border-radius: .2rem;
		grid-area: modal;
		display: grid;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
</style>