<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let result;
	export let index;

	function navigate(section) {
		dispatch('navigate', {index: index, section: section});
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
		.result {
			grid-template-rows: 90px 110px;
			grid-template-columns: 75% 22% 3%;
			grid-template-areas: 
				"heading heading ."
				"sample actionButton .";
			min-height: 200px;
			align-items: center;
		}

		.result > p {
			padding: 10px;
			height: 80px;
			overflow: auto;
		}

		.result > .action-button {
			height: 100px;
		}

		.result > h3 {
			align-self: center;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.result {
			grid-template-rows: 35% 60% 5%;
			grid-template-columns: 60px 1fr .25fr 82px;
			grid-template-areas: 
				". heading heading ."
				". sample actionButton ."
				". . . .";
			min-height: 180px;
		}

		.result > p {
			padding: 15px;
		}

		.result > .action-button {
			height: 100%;
		}

		.result > h3 {
			align-self: center;
		}
	}

	@media screen and (min-width: 1101px) {
		.result {
			grid-template-rows: 70px 1fr;
			grid-template-columns: 80% 18%;
			grid-template-areas: 
				"heading heading"
				"sample actionButton";
			min-height: 180px;
		}

		.result > p {
			padding: 15px;
		}

		.result > .action-button {
			height: 100%;
		}

		.result > h3 {
			align-self: flex-start;
		}
	}

	.result {
		display: grid;
		grid-column-gap: 10px;
	}

	.result > h3 {
		grid-area: heading;
		margin: 0;
	}

	.result > p {
		background: var(--white);
		grid-area: sample;
		margin: 0;
	}

	.result > .action-button {
		grid-area: actionButton;
		margin: 0;
	}
</style>