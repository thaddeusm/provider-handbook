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

		section {
			background: var(--gray);
			/*padding: 1rem;*/
		}
	}

	@media screen and (min-width: 1101px) {
		.small-icon {
			display: none!important;
		}

		.large-icon {
			display: block!important;
		}

		section {
			background: var(--gray);
			/*padding: 1rem;*/
		}
	}

	div {
		text-align: center;
	}
</style>