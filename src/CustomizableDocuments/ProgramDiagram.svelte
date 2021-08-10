<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let customizationChoices;

	let svg;

	/*
		customization choices props:
		
		afterSchoolInstructionDays
		afterSchoolInstructionHours
		afterSchoolInstructionWeeks
		enhancementActivitiesNumber
		enhancementActivitiesHours
		intensiveSessionDays
		intensiveSessionHours
	*/

	let totalHours = 360;

	let newHours = 0;
	$: {
		newHours = (customizationChoices.afterSchoolInstructionHours * customizationChoices.afterSchoolInstructionDays * customizationChoices.afterSchoolInstructionWeeks) + (customizationChoices.enhancementActivitiesNumber * customizationChoices.enhancementActivitiesHours) + (customizationChoices.intensiveSessionDays * customizationChoices.intensiveSessionHours) * 2;

		console.log('actual hours: ', newHours);

		if (newHours > totalHours) {
			totalHours = newHours;
		}
	}

	$: ASI = customizationChoices.afterSchoolInstructionHours * customizationChoices.afterSchoolInstructionDays * customizationChoices.afterSchoolInstructionWeeks * 2;
	$: EA = customizationChoices.enhancementActivitiesNumber * customizationChoices.enhancementActivitiesHours * 2;
	$: IS = customizationChoices.intensiveSessionDays * customizationChoices.intensiveSessionHours * 2;

	$: ASIPercentage = ASI / totalHours * 100 || 0;
	$: EAPercentage = EA / totalHours * 100 || 0;
	$: ISPercentage = IS / totalHours * 100 || 0;

	$: EAOffset = 100 - ASIPercentage + 0;
	$: ISOffset = 100 - EAPercentage + EAOffset;

	$: {
		console.log('EAPercentage: ', EAPercentage)
		console.log('EAOffset: ', EAOffset)
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
	<svg width="100%" height="100%" viewBox="0 0 63 63">
		<circle 
			class="donut-hole" 
			cx="31.5" 
			cy="31.5" 
			r="15.91549430918954" 
			fill="#fff"
		>	
		</circle>
		<circle 
			class="donut-ring" 
			cx="31.5" 
			cy="31.5" 
			r="15.91549430918954" 
			fill="transparent" 
			stroke="#fff" 
			stroke-width="22"
		>
		</circle>
		<!-- ASI -->
		<circle 
			class="donut-segment" 
			cx="31.5" 
			cy="31.5" 
			r="15.91549430918954" 
			fill="transparent" 
			stroke="#002D62" 
			stroke-width="22" 
			stroke-dasharray={`${ASIPercentage} ${100-ASIPercentage}`} 
			stroke-dashoffset="0"
		>		
		</circle>
		{#if ASI > 120}
			<text 
				text-anchor="middle" 
				x={`${ASIPercentage >= 50 ? 50 : 50 + ((50 - ASIPercentage) / 1.5)}%`} 
				y={`${75}%`} 
				style="font-family:'NotoSans-Bold', 'Noto Sans', sans-serif;font-weight:700;font-size:5px;fill:#fff;"
			>
				{ASI} HOURS
			</text>
		{/if}
		<!-- EA -->
		<circle 
			class="donut-segment" 
			cx="31.5" 
			cy="31.5" 
			r="15.91549430918954" 
			fill="transparent" 
			stroke="#F5F5F5" 
			stroke-width="22" 
			stroke-dasharray={`${EAPercentage} ${100-EAPercentage}`} 
			stroke-dashoffset={EAOffset}
		>
		</circle>
		{#if EA > 0}
			<text 
				text-anchor="middle" 
				x={`25%`} 
				y={EAOffset - (EAPercentage / 1.14)} 
				style="font-family:'NotoSans-Bold', 'Noto Sans', sans-serif;font-weight:700;font-size:5px;"
			>
				{EA}
			</text>
		{/if}
		<!-- IS -->
		<circle 
			class="donut-segment" 
			cx="31.5" 
			cy="31.5" 
			r="15.91549430918954" 
			fill="transparent" 
			stroke="#D11242" 
			stroke-width="22" 
			stroke-dasharray={`${ISPercentage} ${100-ISPercentage}`} 
			stroke-dashoffset={ISOffset}
		>
		</circle>
		{#if IS > 0}
			<text 
				x="408.052px" 
				y="221.865px" 
				style="font-family:'NotoSans-Bold', 'Noto Sans', sans-serif;font-weight:700;font-size:66.667px;fill:#fff;"
			>
				40
			</text>
		{/if}
	</svg>
</div>