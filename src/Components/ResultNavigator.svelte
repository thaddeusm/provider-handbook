<script>
	import { results, searchQuery, activeResult } from './../stores.js';

	let results_value;

	const unsubscribeResults = results.subscribe(value => {
		results_value = value;
	});

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	let active_result_value;

	const unsubscribeActiveResult = activeResult.subscribe(value => {
		active_result_value = value;
	});
</script>

<div class="container">
	<h1>test</h1>
</div>

<style>
	@media screen and (max-width: 450px) {
		
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		
	}

	@media screen and (min-width: 1101px) {
		
	}
</style>