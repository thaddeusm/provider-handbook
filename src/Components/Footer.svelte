<script>
	import Access from './../Graphics/Icons/Access.svelte';
	import UpArrow from './../Graphics/Icons/UpArrow.svelte';
</script>

<div>
	<section class="logo">
		<Access width={'9rem'} />
	</section>
	<section class="button-area">
		<button class="up-button" on:click={() => {window.scrollTo(0, 0)}}>
			<UpArrow width={'1.5rem'} height={'1.5rem'} color={'#000000'} />
		</button>
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		div {
			display: grid;
			grid-template-rows: 1fr .75;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"logo"
				"button";
			margin-top: 3rem;
			height: 200px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		div {
			display: grid;
			grid-template-rows: 1fr .75;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"logo"
				"button";
			margin-top: 3rem;
			height: 200px;
		}
	}

	@media screen and (min-width: 1101px) {
		div {
			display: none;
		}
	}

	div {
		text-align: center;
		align-items: center;
	}

	.logo {
		grid-area: logo;
	}

	.button-area {
		grid-area: button;
	}
</style>