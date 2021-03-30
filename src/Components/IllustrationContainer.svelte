<script>
	export let title;
</script>

<div>
	<img class="large-illustration" src={`Illustrations/${title.split(' ').join('')}Desktop.svg`} alt={title} />
	<img class="small-illustration" src={`Illustrations/${title.split(' ').join('')}Mobile.svg`} alt={title} />
</div>

<style>
	@media screen and (max-width: 450px) {
		.small-illustration {
			display: block!important;
		}

		.large-illustration {
			display: none!important;
		}

		div {
			margin: .5rem 0;
		}

		img {
			max-height: 500px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.small-illustration {
			display: block!important;
		}

		.large-illustration {
			display: none!important;
		}

		div {
			margin: 2rem 0;
			padding: 1rem;
			background: var(--gray);
		}

		img {
			max-height: 700px;
		}
	}

	@media screen and (min-width: 1101px) {
		.small-illustration {
			display: none!important;
		}

		.large-illustration {
			display: block!important;
		}

		div {
			margin: 2rem 0;
			padding: 1rem;
			background: var(--gray);
		}

		img {
			max-height: 800px;
		}
	}

	div {
		text-align: center;
	}

	img {
		display: block;
		margin: 0 auto;
		max-width: 100%
	}
</style>