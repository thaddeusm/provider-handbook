<script>
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<div class="overlay" in:fade="{{duration: 100}}">
	<div class="modal">
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
			grid-template-rows: 75% 25%;
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
			grid-template-rows: 80% 20%;
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
		background: rgba(0, 0, 0, .5);
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