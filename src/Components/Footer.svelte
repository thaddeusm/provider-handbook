<script>
	import UpArrow from './../Icons/UpArrow.svelte';
</script>

<div>
	<h6 class="attribution">
		The English Access Microscholarship Program is sponsored by the U.S. Department of State with funding provided by the U.S. Government and administered by FHI 360.
	</h6>
	<section class="button-area">
		<button class="up-button" on:click={() => {window.scrollTo(0, 0)}} aria-label="Scroll to Top">
			<UpArrow width={'1.5rem'} height={'1.5rem'} color={'#000000'} />
		</button>
	</section>
</div>

<style>
	@media screen and (min-width: 1101px) {
		.button-area {
			display: none!important;
		}
	}

	div {
		display: grid;
		grid-template-rows: 70% 30%;
		grid-template-columns: 1fr;
		grid-template-areas: 
			"attribution"
			"button";
		height: 100%;
		width: 100%;
		text-align: center;
		align-items: center;
		padding: 1rem 0;
	}

	.attribution {
		grid-area: attribution;
		max-width: 750px;
		margin: 0 auto;
		align-self: flex-start;
	}

	.button-area {
		grid-area: button;
		align-self: flex-end;
	}
</style>