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
		.small-illustration {
			display: block!important;
		}

		.large-illustration {
			display: none!important;
		}

		section {
			padding: 0;
			margin: 0;
		}

		div {
			margin: .5rem 0;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.small-illustration {
			display: block!important;
		}

		.large-illustration {
			display: none!important;
		}

		section {
			background: var(--gray);
			padding: 2rem;
		}

		div {
			margin: 2rem 0;
		}
	}

	@media screen and (min-width: 1101px) {
		.small-illustration {
			display: none!important;
		}

		.large-illustration {
			display: block!important;
		}

		section {
			background: var(--gray);
			padding: 2rem;
		}

		div {
			margin: 2rem 0;
		}
	}

	div {
		text-align: center;
	}
</style>