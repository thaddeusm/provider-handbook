<script>
	export let title;
</script>

<div>
	<img class="large-illustration" src={`Illustrations/${title.split(' ').join('').replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Desktop.svg`} alt={title} />
	<img class="small-illustration" src={`Illustrations/${title.split(' ').join('').replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Mobile.svg`} alt={title} />
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
			margin: 1rem 0;
			height: 250px;
		}

		img {
			min-height: 250px;
			width: 100%;
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
			padding: 2rem;
			background: var(--gray);
			height: 350px;
		}

		img {
			max-height: 350px;
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
			min-height: 200px;
		}

		img {
			max-height: 500px;
		}
	}

	div {
		text-align: center;
	}

	img {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		box-shadow: var(--shadow);
		border-radius: var(--radius);
	}
</style>