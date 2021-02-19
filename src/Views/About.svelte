<script>
	let innerWidth = 0;
	let videoHeight = 0;

	$: {
		if (innerWidth > 560) {
			videoHeight = 315;
		} else {
			videoHeight = innerWidth * .56;
		}
	}
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="container">
	<section class="video-container">
		<iframe class="video" width={innerWidth} height={videoHeight} src="https://www.youtube-nocookie.com/embed/V1ZA4UG9XYk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</section>
	<section class="action">
		<a class="action-button" href="/handbook">view handbook</a>
	</section>
</div>

<style>
	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 60% 40%;
		align-items: center;
		justify-content: center;
	}

	.video-container {
		text-align: center;
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