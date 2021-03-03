<script>
	import Introduction from './../docs/Introduction.svx';

	function displayInvitationToInteractive(e) {
		console.log(e.detail.data);
	}
</script>

<div class="container">
	<section id="handbook">
		<h2>
			Provider Handbook
		</h2>
		<Introduction on:open-modal={displayInvitationToInteractive} />
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-columns: 15px 1fr 15px;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		.container {
			grid-template-columns: 35px 1fr 35px;
		}
	}

	@media screen and (min-width: 801px) {
		.container {
			grid-template-columns: 150px 1fr 150px;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-areas: ". handbook ."
	}

	#handbook {
		grid-area: handbook;
	}
</style>