<script>
	import DOS from './../Graphics/Icons/DOS.svelte';
	import Access from './../Graphics/Icons/Access.svelte';
</script>

<div>
	<section class="left">
		<Access width={'6rem'} showTagline={false} />
	</section>
	<h6>sponsored by the U.S. Department of State</h6>
	<section class="right">
		<DOS width={'5rem'} height={'5rem'} />
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		div {
			grid-column-gap: 5px;
			display: grid;
			grid-template-rows: .5fr 1fr 1fr;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"center"
				"left"
				"right";
			margin-top: 2rem;
		}
	}

	@media screen and (min-width: 450px) and (max-width: 1000px) {
		div {
			grid-column-gap: 5px;
			display: grid;
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 
				"center center"
				"left right";
			margin-top: 4rem;
		}
	}

	@media screen and (min-width: 1101px) {
		div {
			grid-column-gap: 10px;
			display: grid;
			grid-template-columns: .5fr 1fr .5fr;
			grid-template-areas: "left center right";
			margin-top: 4rem;
		}
	}

	div {
		text-align: center;
		align-items: center;
	}

	.left {
		padding-top: .5rem;
		grid-area: left;
	}

	.right {
		grid-area: right;
	}

	h6 {
		grid-area: center;
	}
</style>