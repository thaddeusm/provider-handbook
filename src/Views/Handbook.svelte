<script>
	import Handbook from './../Docs/Handbook.json';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';

	function openModal() {
		console.log('open the modal');
	}
</script>

<div class="container">
	<section id="handbook">
		<h2>
			Provider Handbook
		</h2>
		{#each Handbook.sections as handbookSection}
			{#each handbookSection as section}
				{#if section.style == "icon_subheading"}
					<div class="icon-subheading">
						<h3>
							{section.content}
						</h3>
						<button on:click={openModal}>
							<InteractiveAvailable width={'2rem'} height={'2rem'} />
						</button>
					</div>
				{:else if section.style == "subheading"}
					<h3>{section.content}</h3>
				{:else}
					<p>{section.content}</p>
				{/if}
			{/each}
		{/each}
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-columns: 15px 1fr 15px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		.container {
			grid-template-columns: 35px 1fr 35px;
		}
	}

	@media screen and (min-width: 801px) {
		.container {
			grid-template-columns: 150px 1fr 150px;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-areas: ". handbook ."
	}

	#handbook {
		grid-area: handbook;
	}
</style>