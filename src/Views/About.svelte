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
	<p>
		a student-centered program that provides English language skills to underserved youth worldwide
	</p>
	<section class="action">
		<a class="action-button" href="/handbook">view handbook</a>
	</section>
	<footer>
		<Footer />
	</footer>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-rows: 250px 120px auto auto;
		}
	}

	@media screen and (min-width: 450px) and (max-width: 1000px) {
		.container {
			grid-template-rows: 350px 10% 20% 50px;
		}

		.action {
			align-self: center;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-rows: 425px 100px auto auto;
		}

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
		align-items: center;
		/*justify-content: center;*/
	}

	p {
		text-align: center;
		max-width: 500px;
		margin: 0 auto;
		align-self: flex-start;
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