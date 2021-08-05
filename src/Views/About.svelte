<script>
	import Footer from './../Components/Footer.svelte';
	import PreviewModal from './../Components/PreviewModal.svelte';
	import Play from './../Icons/Play.svelte';

	let showVideo = false;
</script>

<div class="container">
	<section class="video-button-area">
		<button on:click={() => {showVideo = true}} class="animated">
			<Play width={'5rem'} height={'5rem'} />
		</button>
	</section>
	<p>
		<span class="touch-message">Touch</span><span class="click-message">Click</span> the icon above to learn about this new presentation of the provider handbook.
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
			<video
				preload
				controls
				src="https://res.cloudinary.com/dhomo4ksd/video/upload/v1623936975/Access/Consultant_Intro_ht3icc.mp4"
			>		
			</video>
		</div>
	</PreviewModal>
{/if}

<style>
	/* touch devices */
	@media (pointer: coarse), (hover: none) {
		.click-message {
			display: none;
		}
	}

	/* devices with a mouse */
	@media (hover: hover) {
		.touch-message {
			display: none;
		}
	}

	@media screen and (max-width: 450px) {
		.container {
			grid-template-rows: 250px 120px 70px 200px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-rows: 400px 100px 200px 200px;
		}

		.action {
			align-self: center;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-rows: 1.5fr .5fr 1fr 100px;
		}
	}

	.container {
		height: 100%;
		width: 100%;
		display: grid;
		align-items: center;
	}

	footer {
		align-self: flex-end;
	}

	p {
		text-align: center;
		max-width: 750px;
		margin: 0 auto;
		padding: 0 1rem;
		align-self: flex-start;
	}

	.video-button-area {
		text-align: center;
		background: var(--gray);
		width: 320px;
		height: 165px;
		margin: 0 auto;
		border-radius: var(--radius);
		display: grid;
		align-items: center;
	}

	video {
		width: 100%;
		max-width: 800px;
		height: auto;
		margin: 0 auto;
		display: block;
		background: var(--white);
	}

	video::-webkit-media-controls-fullscreen-button {
	    display: none;
	}

	.action-button {
		display: block;
		max-width: 170px;
		margin: 0 auto;
	}

	@keyframes pulse {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.1);
		}
	}

	.animated {
		animation-name: pulse;
		animation-direction: alternate;
		animation-duration: .5s;
		animation-iteration-count: 2;
		animation-timing-function: ease;
		z-index: 0;
	}
</style>