<script>
	import EnhancementActivityMobile from './../Graphics/Illustrations/EnhancementActivityMobile.svelte';
	import EnhancementActivityDesktop from './../Graphics/Illustrations/EnhancementActivityDesktop.svelte';

	export let title;
</script>

<div>
	{#if title == "Enhancement Activity"}
		<section class="small-illustration">
			<EnhancementActivityMobile />
		</section>
		<section class="large-illustration">
			<EnhancementActivityDesktop />
		</section>
	{/if}
</div>

<style>
	@media screen and (max-width: 450px) {
		.large-illustration {
			display: none!important;
		}

		div {
			margin: 1rem auto;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.small-illustration {
			display: none!important;
		}

		section {
			background: var(--gray);
			padding: 1rem;
		}

		div {
			margin: 2rem auto;
		}
	}

	@media screen and (min-width: 1101px) {
		.small-illustration {
			display: none!important;
		}

		section {
			background: var(--gray);
			padding: 1rem;
		}

		div {
			margin: 2rem auto;
		}
	}

	div {
		text-align: center;
	}
</style>