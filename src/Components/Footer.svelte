<script>
	import DOS from './../Graphics/Icons/DoS.svelte';
	import Access from './../Graphics/Icons/Access.svelte';
</script>

<div>
	<section class="logo">
		<Access width={'9rem'} />
	</section>
	<h6>Sponsored by the U.S. Department of State.</h6>
</div>

<style>
	@media screen and (max-width: 450px) {
		div {
			display: grid;
			grid-template-rows: .5fr 1fr;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"copyright"
				"logo";
			margin-top: 4rem;
			height: 300px;
		}

		h6 {
			align-self: flex-end;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		div {
			display: grid;
			grid-template-rows: .5fr 1fr;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"copyright"
				"logo";
			margin-top: 4rem;
			height: 300px;
		}

		h6 {
			align-self: flex-end;
		}
	}

	@media screen and (min-width: 1101px) {
		div {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-areas: "copyright";
			margin-top: 4rem;
			height: 100px;
		}

		.logo {
			display: none;
		}
	}

	div {
		text-align: center;
		align-items: center;
	}

	.logo {
		padding-top: .5rem;
		grid-area: logo;
	}

	h6 {
		grid-area: copyright;
	}
</style>