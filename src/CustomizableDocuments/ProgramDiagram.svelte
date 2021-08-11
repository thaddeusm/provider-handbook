<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let customizationChoices;

	let svg;

	let chartData = [{degrees: 0}, {degrees: 0}, {degrees: 0}];
	let colors = ["#002D62", "#F5F5F5", "#D11242"];
	let textColors = ["#FFFFFF", "#000000", "#FFFFFF"];
	let transforms = [];
	let cx = 200;
	let cy = 200;
	let radius = 120;
	let strokeWidth = 150;
	let angleOffset = -90;

	$: circumference = 2 * Math.PI * radius;

	$: ASI = customizationChoices.afterSchoolInstructionHours * customizationChoices.afterSchoolInstructionDays * customizationChoices.afterSchoolInstructionWeeks * 2;
	$: EA = customizationChoices.enhancementActivitiesNumber * customizationChoices.enhancementActivitiesHours * 2;
	$: IS = customizationChoices.intensiveSessionDays * customizationChoices.intensiveSessionHours * 2;

	$: values = [ASI, EA, IS];

	$: dataTotal = values.reduce((acc, val) => acc + val);

	function calculateChartData() {
 		chartData = [];

 		values.forEach((dataVal, index) => {
	    	const { x, y } = calculateTextCoords(dataVal, angleOffset)        
    		const data = {
      			degrees: angleOffset,
      			textX: x,
      			textY: y
    		}

			chartData.push(data);
    		angleOffset = dataPercentage(dataVal) * 360 + angleOffset;
  		});

  		chartData = chartData;
	}

	function dataPercentage(dataVal) {
	    return dataVal / dataTotal;
	}

	function calculateStrokeDashOffset(dataVal, circumference) {
		const strokeDiff = dataPercentage(dataVal) * circumference;
		return circumference - strokeDiff;
	}

	function getTransform(index) {
		return `rotate(${chartData[index].degrees}, ${cx}, ${cy})`;
	}

	function degreesToRadians(angle) {
		return angle * (Math.PI / 180);
	}

	function calculateTextCoords(dataVal, angleOffset) {
		const angle = (dataPercentage(dataVal) * 360) / 2 + angleOffset
		const radians = degreesToRadians(angle)

		const textCoords = {
			x: (radius * Math.cos(radians) + cx),
			y: (radius * Math.sin(radians) + cy)
		}

		return textCoords;
	}

	function segmentBigEnough(dataVal) {
  		return Math.round(dataPercentage(dataVal) * 100) > 5
	}

	$: if (dataTotal) {
		calculateChartData();
		console.log('total: ', dataTotal);
		console.log('data: ', chartData);

		transforms[0] = `rotate(${chartData[0].degrees}, ${cx}, ${cy})`;
		transforms[1] = `rotate(${chartData[1].degrees}, ${cx}, ${cy})`;
		transforms[2] = `rotate(${chartData[2].degrees}, ${cx}, ${cy})`;
	}

	$: {
		dispatch('document-updated', {
			svg: svg
		});
	}

	onMount(() => {
		dispatch('document-updated', {
			svg: svg
		});
	})
</script>

<style>
	div {
		background: var(--white);
	}

	svg {
		max-width: 100%;
		height: auto;
	}
</style>

<div>
	<svg bind:this={svg} height="400" width="400" viewBox="0 0 400 400">
	    {#each values as value, index}
		    <g>
		    	<circle {cx} {cy} r={radius} fill="transparent" stroke={colors[index]} stroke-width={strokeWidth} stroke-dasharray={circumference} stroke-dashoffset={calculateStrokeDashOffset(value, circumference)} transform={transforms[index]}></circle>
		    	{#if segmentBigEnough(value)}
			    	{#if index == 0}
			    		<text 
				    		text-anchor="middle" 
				    		dy="3px" 
				    		x="50%"
				    		y="77%"
				    		style={`font-family:'NotoSans-Bold', 'Noto Sans', sans-serif;font-weight:700;font-size:21px;fill:${textColors[index]}`}
				    	>
				    		{ `${value} HOURS` } 
				    	</text>
			    	{:else}
			    		<text 
				    		text-anchor="middle" 
				    		dy="3px" 
				    		x={chartData[index].textX} 
				    		y={chartData[index].textY}
				    		style={`font-family:'NotoSans-Bold', 'Noto Sans', sans-serif;font-weight:700;font-size:21px;fill:${textColors[index]}`}
				    	>
				    		{ value } 
				    	</text>
			    	{/if}
		    	{/if}
		    </g>
		{/each}
	</svg>
</div>