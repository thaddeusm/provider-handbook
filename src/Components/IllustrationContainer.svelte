<script>
	export let title;
	export let altText;
</script>

<div>
	<img class="large-illustration" src={`Illustrations/${title.split(' ').join('').replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Desktop.svg`} alt={altText} {title} />
	<img class="small-illustration" src={`Illustrations/${title.split(' ').join('').replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Mobile.svg`} alt={altText} {title} />
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
			margin: 1.5rem 0;
			min-height: 250px;
		}

		img {
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
			margin: 1.5rem 0;
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
		}

		img {
			width: 100%;
		}
	}

	div {
		text-align: center;
	}

	img {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		color: #000000;
	}
</style>