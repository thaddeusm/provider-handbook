<script>
	import UpArrow from './../Icons/UpArrow.svelte';
</script>

<div>
	<section class="button-area">
		<button class="up-button" on:click={() => {window.scrollTo(0, 0)}} aria-label="Scroll to Top">
			<UpArrow width={'1.5rem'} height={'1.5rem'} color={'#000000'} />
		</button>
	</section>
</div>

<style>
	@media screen and (min-width: 1101px) {
		div {
			display: none!important;
		}
	}

	div {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"button";
		margin-top: 2rem;
		height: 100px;
		text-align: center;
		align-items: center;
	}

	.button-area {
		grid-area: button;
	}
</style>