<script>
	import Footer from './../Components/Footer.svelte';
</script>

<div class="container">
	<h2></h2>
	<p></p>
	<footer>
		<Footer />
	</footer>
</div>

<style>
	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 65% auto 100px;
		align-items: center;
	}
</style>