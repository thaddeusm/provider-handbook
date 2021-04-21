<script>
	import PreviewModal from './../Components/PreviewModal.svelte';
	import Footer from './../Components/Footer.svelte';
	import Play from './../Graphics/Icons/Play.svelte';

	let showVideo = false;

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
	<section class="video-button-area">
		<button on:click={() => {showVideo = true}}>
			<Play width={'5rem'} height={'5rem'} />
		</button>
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

{#if showVideo}
	<PreviewModal allowClose={true} background={'none'} on:close={() => {showVideo = false}}>
		<div slot="body" class="modal-body">
			<!-- <section class="{videoLoading ? 'placeholder' : 'video-container'}">
				<iframe class="video" width={innerWidth} height={videoHeight} src="https://www.youtube-nocookie.com/embed/V1ZA4UG9XYk" title="Access Introduction Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen on:load={handleLoad}></iframe>
			</section> -->
			<video 
				controls
				src="https://res.cloudinary.com/dhomo4ksd/video/upload/v1600369229/Writing%20Toolkit%20Tutorials/What%20is%20a%20writing%20project.mp4"
			>		
			</video>
		</div>
		<!-- <div slot="footer" class="modal-footer">
			<div class="actions">
				<button class="regular-button-small" on:click={() => {showVideo = false}}>close</button>
			</div>
		</div> -->
	</PreviewModal>
{/if}

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-rows: 250px 120px auto auto;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-rows: 350px 100px 50px auto;
		}

		.action {
			align-self: center;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-rows: 1.5fr .5fr .5fr auto;
		}

		.video-container {
			align-self: flex-end;
		}

		.placeholder {
			align-self: flex-end;
		}
	}

	.container {
		display: grid;
		align-items: center;
		height: 90%;
	}

	p {
		text-align: center;
		max-width: 500px;
		margin: 0 auto;
		padding: 0 .5rem;
		align-self: flex-start;
	}

	.video-button-area {
		text-align: center;
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

	video {
		width: 100%;
		max-width: 1150px;
		height: auto;
		margin: 0 auto;
		display: block;
		background: var(--gray);
	}

	.action-button {
		display: block;
		max-width: 170px;
		margin: 0 auto;
	}
</style>