<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let result;

	function navigate(section) {
		dispatch('navigate', {section: section});
	}
</script>

<div class="result">
	<h3>
		{result.sectionTitle}
	</h3>
	<p>
		{@html result.textSample}
	</p>
	<button class="action-button" on:click={() => {navigate(result.sectionTitle.split(' ').join(''))}}>
		go
	</button>
</div>

<style>
	@media screen and (max-width: 450px) {
		
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.result {
			grid-template-rows: 50% 40% 10%;
			grid-template-columns: 10% 55% 20% 10%;
			grid-template-areas: 
				". heading heading ."
				". sample actionButton ."
				". . . .";
			height: 160px;
		}
	}

	@media screen and (min-width: 1101px) {
		.result {
			grid-template-rows: 55% 40% 5%;
			grid-template-columns: 80% 18% 2%;
			grid-template-areas: 
				"heading heading"
				"sample actionButton"
				". .";
			height: 140px;
		}
	}

	.result {
		display: grid;
		align-items: center;
		grid-column-gap: 10px;
	}

	.result > h3 {
		grid-area: heading;
		align-self: flex-start;
		margin: 0;
	}

	.result > p {
		background: var(--white);
		padding: 15px;
		grid-area: sample;
		height: 45px;
	}

	.result > .action-button {
		grid-area: actionButton;
		margin: 0;
		height: 74px;
	}
</style>