<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let customizationChoices;
	export let step;

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

	function checkInputs() {
		console.log('checking...')

		let errorMessage = null;
		let interrupt = false;
		let errorIndex = null;

		// there is at least one day of ASI
		if (step < 3 && customizationChoices.afterSchoolInstructionDays == 0) {	
			errorMessage = 'Programs must include After School Instruction.';
			interrupt = true;
			errorIndex = 0;

		// a single ASI session does not exceed 6 hours
		} else if (step < 3 && customizationChoices.afterSchoolInstructionHours > 6) {
			errorMessage = 'After School Instruction sessions should not exceed 6 hours.';
			interrupt = true;
			errorIndex = 1;

		// total ASI for a week does not exceed 10 hours
		} else if (step < 3 && customizationChoices.afterSchoolInstructionDays * customizationChoices.afterSchoolInstructionHours > 10) {
			errorMessage = 'Programs should not include more than 10 hours of After School Instruction in a week without clear justification in the proposal.';
			errorIndex = 2;

		// there are at least 2 EAs per year
		} else if (step > 2 && customizationChoices.enhancementActivitiesNumber < 3) {
			errorMessage = 'There should be at least one Enhancement Activity per reporting period.';
			interrupt = true;
			errorIndex = 3;

		// IS days include at least 3 hours of instruction
		} else if (step > 4 && customizationChoices.intensiveSessionHours < 3) {
			errorMessage = 'Each day of an Intensive Session should include more than 3 hours of instruction.';
			interrupt = true;
			errorIndex = 4;

		// IS days do not exceed 8 hours of instruction
		} else if (step > 4 && customizationChoices.intensiveSessionHours > 8) {
			errorMessage = 'Each day of an Intensive Session should not exceed 8 hours of instruction.';
			interrupt = true;
			errorIndex = 5;

		// total IS hours do not exceed 30% of 360 hours
		} else if (step > 4 && (customizationChoices.intensiveSessionsNumber * customizationChoices.intensiveSessionHours * 2) / dataTotal > .30) {
			errorMessage = 'Intensive Session hours should not exceed 30% of the total program hours';
			interrupt = true;
			errorIndex = 6;
		}

		if (errorMessage) {
			displayError(errorMessage, interrupt, errorIndex);
		} else {
			resolveError();
		}
	}

	function displayError(message, interrupt, errorIndex) {
		dispatch('input-error', {message: message, interrupt: interrupt, index: errorIndex});
	}

	function resolveError() {
		dispatch('input-error-resolved');
	}

	$: if (step) {
		checkInputs();
	}

	$: if (dataTotal) {
		calculateChartData();

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
	@media screen and (max-width: 1100px) {
		div {
			grid-template-rows: auto 1fr;
			grid-template-columns: .1fr 1fr .1fr;
			grid-template-areas: 
				"legend legend legend"
				". chart .";
		}

		li {
			display: inline-block;
			margin: .5rem;
		}
	}

	@media screen and (min-width: 1101px) {
		div {
			min-height: 400px;
			grid-template-columns: .1fr 1fr 1fr .1fr;
			grid-template-areas: 
				". legend chart .";
			align-items: center;
		}

		li {
			text-align: left;
			margin-top: 2rem;
		}
	}

	div {
		background: var(--white);
		width: 100%;
		height: 100%;
		display: grid;
	}

	ul {
		list-style: none;
		grid-area: legend;
	}

	li {
		font-size: 12px;
		color: var(--black);
		font-family: "NotoSans-Bold";
	}

	svg {
		max-width: 100%;
		height: auto;
		grid-area: chart;
		margin: 0 auto;
	}

	.blue::before {
		vertical-align: middle;
		margin-right: .5rem;
		content: '';
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: var(--brand);
		border: 1px solid black;
	}

	.gray::before {
		vertical-align: middle;
		margin-right: .5rem;
		content: '';
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: #F5F5F5;
		border: 1px solid black;
	}

	.red::before {
		vertical-align: middle;
		margin-right: .5rem;
		content: '';
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: var(--red);
		border: 1px solid black;
	}
</style>

<div>
	<ul>
		<li class="blue">
			after school instruction
		</li>
		<li class="gray">
			enhancement activities
		</li>
		<li class="red">
			intensive sessions
		</li>
	</ul>
	<svg bind:this={svg} height="400" width="400" viewBox="0 0 400 400">
	    {#each values as value, index}
		    <g>
		    	<circle {cx} {cy} r={radius} fill="transparent" stroke={colors[index]} stroke-width={strokeWidth} stroke-dasharray={circumference} stroke-dashoffset={calculateStrokeDashOffset(value, circumference)} transform={transforms[index]}></circle>
		    	{#if segmentBigEnough(value)}
			    	{#if index == 0}
			    		<text 
				    		text-anchor="middle" 
				    		dy="3px" 
				    		x={chartData[index].textX} 
				    		y={chartData[index].textY}
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