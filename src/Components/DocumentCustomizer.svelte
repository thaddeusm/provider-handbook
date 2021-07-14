<script>
	import { onMount } from 'svelte';

	export let documentToCustomize;

	let customizationChoices = [];

	onMount(() => {
		for (let i=0; i<documentToCustomize.customizations.length; i++) {
			customizationChoices.push({
				"customization": "",
				"choice": ""
			});
		}
	});
</script>

<div class="arrow"></div>
<div class="container">
	{#each documentToCustomize.customizations as customization, i}
		<p class="prompt">
			{customization.prompt}
		</p>
		<div class="preview">
			<!-- <svelte:component this={} /> -->
		</div>
		<div class="input-area">
			{#if customization.format == "text"}
				<input type="text" name={customization.name} placeholder={customization.placeholder} />
			{/if}
		</div>
		<div class="footer">
			
		</div>
	{/each}
</div>

<style>
	.arrow {
		width: 0; 
  		height: 0; 
  		border-left: 30px solid transparent;
  		border-right: 30px solid transparent;
  		border-bottom: 20px solid var(--gray);
  		margin: 0 auto;
	}

	.container {
		background: var(--gray);
	}

	p {
		margin: 0 auto;
		padding: 2rem 0;
		text-align: center;
	}
</style>