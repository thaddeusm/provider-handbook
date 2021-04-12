<script>
	import Footer from './../Components/Footer.svelte';

	let innerWidth = 0;
	let videoHeight = 0;
	let videoLoading = true;

	$: {
		if (innerWidth > 560) {
			videoHeight = 315;
		} else {
			videoHeight = innerWidth * .56;
		}
	}

	function handleLoad() {
		videoLoading = false;
	}
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="container">
	<section class="{videoLoading ? 'placeholder' : 'video-container'}">
		<iframe class="video" width={innerWidth} height={videoHeight} src="https://www.youtube-nocookie.com/embed/V1ZA4UG9XYk" title="Access Introduction Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen on:load={handleLoad}></iframe>
	</section>
	<section class="action">
		<a class="action-button" href="/handbook">view handbook</a>
	</section>
	<footer>
		<Footer />
	</footer>
</div>

<style>
	@media screen and (min-width: 1101px) {
		.video-container {
			align-self: flex-end;
		}

		.placeholder {
			align-self: flex-end;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 65% auto auto;
		align-items: center;
		/*justify-content: center;*/
	}

	.video-container {
		text-align: center;
		padding: 10px 0;
	}

	.placeholder {
		background: var(--gray);
		max-width: 560px;
		padding: 10px 0;
		margin: 0 auto;
	}

	.video {
		max-width: 560px;
		margin: 0 auto;
	}

	.action-button {
		display: block;
		max-width: 170px;
		margin: 0 auto;
	}
</style>