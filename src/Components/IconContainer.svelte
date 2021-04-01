<script>
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';

	export let title;
</script>

<div>
	{#if title == "Interactive Available"}
		<section class="small-icon">
			<InteractiveAvailable width={'4rem'} />
		</section>
		<section class="large-icon">
			<InteractiveAvailable width={'5rem'} />
		</section>
	{/if}
</div>

<style>
	@media screen and (max-width: 450px) {
		.small-icon {
			display: block!important;
		}

		.large-icon {
			display: none!important;
		}

		div {
			margin: .5rem 0;
		}

		section {
			padding: 0;
			margin: 0;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.small-icon {
			display: block!important;
		}

		.large-icon {
			display: none!important;
		}

		div {
			margin: 2rem 0;
			padding: 2rem;
			background: var(--gray);
		}
	}

	@media screen and (min-width: 1101px) {
		.small-icon {
			display: none!important;
		}

		.large-icon {
			display: block!important;
		}

		div {
			margin: 2rem 0;
			padding: 1rem;
			background: var(--gray);
		}
	}

	div {
		text-align: center;
		max-height: 200px;
	}
</style>