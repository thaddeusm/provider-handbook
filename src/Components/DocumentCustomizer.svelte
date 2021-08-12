<script>
	import download from 'downloadjs';
	import { onMount } from 'svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let SVGToImage;

	import('./../exportSVGToPNG.js').then(module => {
  		SVGToImage = module.SVGToImage
	});

	import AccessLogo from './../CustomizableDocuments/AccessLogo.svelte';
	import FacebookCoverPhoto from './../CustomizableDocuments/FacebookCoverPhoto.svelte';
	import ProgramDiagram from './../CustomizableDocuments/ProgramDiagram.svelte';

	const customizableDocuments = {
		"Access Logo": AccessLogo,
		"Facebook Cover Photo": FacebookCoverPhoto,
		"2-Year Program Diagram": ProgramDiagram
	};

	export let documentToCustomize;

	let customizationChoices = {};
	let customizationIndex = 0;
	let customizedSVG;

	$: customization = documentToCustomize.customizations[customizationIndex];

	async function prepareDocumentDownload(callback) {
		SVGToImage({
			svg: customizedSVG,
			mimetype: "image/jpeg"
		}).then((output) => {
			download(output, documentToCustomize.text, 'image/jpeg');

			if (callback) {
				callback();
			}
		})
	}

	function handleUpdate(e) {
		customizedSVG = e.detail.svg;
	}

	function handleKeyup(e) {
		if (e.keyCode == 13 && customizationIndex + 1 == documentToCustomize.customizations.length) {
			prepareDocumentDownload();
		}
	}

	async function triggerDownload() {
		await prepareDocumentDownload(close());
	}

	function incrementCustomizationIndex() {
		if (customizationIndex !== documentToCustomize.customizations.length) {
			customizationIndex++;
		}
	}

	function decrementCustomizationIndex() {
		if (customizationIndex !== 0) {
			customizationIndex--;
		}
	}

	function close() {
		dispatch('close-panel');
	}

	onMount(() => {
		for (let i=0; i<documentToCustomize.customizations.length; i++) {
			if (documentToCustomize.customizations[i].format == 'number') {
				customizationChoices[documentToCustomize.customizations[i].name] = 0;
			} else {
				customizationChoices[documentToCustomize.customizations[i].name] = '';
			}
		}
	});
</script>

<div class="arrow"></div>
<div class="container">
	{#if documentToCustomize.customizations.length > 1}
		<h6 class="step">
			Step {customizationIndex + 1} of {documentToCustomize.customizations.length}
		</h6>
	{/if}
	<p class="prompt">
		{customization.prompt}
	</p>
	<div class="preview">
		<svelte:component this={customizableDocuments[documentToCustomize.text]} {customizationChoices} on:document-updated={handleUpdate} />
	</div>
	<div class="input-area">
		{#if customization.format == "text"}
			<input 
				type="text" 
				name={customization.name} 
				placeholder={customization.placeholder || ''} 
				bind:value={customizationChoices[customization.name]} 
				maxlength={customization.characterLimit || 50} 
				on:keyup={handleKeyup} 
			/>
		{:else if customization.format == "number"}
			<section class="number-box">
				<input 
					type="number" 
					name={customization.name} 
					min={customization.min}
					max={customization.max}
					bind:value={customizationChoices[customization.name]} 
					on:keyup={handleKeyup} 
				/>
				<span class="units">{customization.units}</span>
			</section>
		{/if}
	</div>
	<div class="footer">
		{#if customizationIndex > 0 && documentToCustomize.customizations.length !== 1}
			<button enterkeyhint="back" class="regular-button-small" on:click={decrementCustomizationIndex}>
				back
			</button>
		{/if}
		{#if customizationIndex + 1 == documentToCustomize.customizations.length || documentToCustomize.customizations.length == 1}
			<button enterkeyhint="download" class="action-button-small" on:click={triggerDownload}>
				download
			</button>
		{:else}
			<button enterkeyhint="next" class="action-button-small" on:click={incrementCustomizationIndex}>
				next
			</button>
		{/if}
	</div>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-areas: 
				"step"
				"preview"
				"prompt"
				"inputArea"
				"footer";
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-areas: 
				"step"
				"preview"
				"prompt"
				"inputArea"
				"footer";
		}

		.preview {
			padding: 0 15%;
			margin: 0 auto;
			background: var(--white);
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-areas: 
				"step"
				"prompt"
				"preview"
				"inputArea"
				"footer";
		}

		.preview {
			/*padding: 0 20%;*/
			margin: 0 auto;
			background: var(--white);
		}
	}

	.arrow {
		width: 0; 
  		height: 0; 
  		border-left: 30px solid transparent;
  		border-right: 30px solid transparent;
  		border-bottom: 20px solid var(--gray);
  		margin: 0 auto;
	}

	.container {
		background: var(--gray);
		padding: 1rem;
		margin-bottom: 5rem;
		display: grid;
	}

	.step {
		text-align: center;
		margin-bottom: 1rem;
		grid-area: step;
	}

	p {
		margin: 0 auto;
		padding: 1rem 0;
		text-align: center;
	}

	.prompt {
		grid-area: prompt;
		margin: 1rem auto;
	}

	.preview {
		text-align: center;
		grid-area: preview;
	}

	.input-area {
		text-align: center;
		grid-area: inputArea;
	}

	input[type="text"] {
		font-size: 16px;
		padding: 10px;
		color: var(--black);
		font-family: "NotoSans";
		background: var(--white);
		outline: none;
		margin: 2rem auto;
		border: 1px solid var(--brand);
		border-radius: var(--radius);
		width: 270px;
		display: block;
	}

	.number-box {
		font-size: 16px;
		padding: 10px;
		color: var(--black);
		font-family: "NotoSans";
		background: var(--white);
		outline: none;
		margin: 0 auto 2rem auto;
		border: 1px solid var(--brand);
		border-radius: var(--radius);
		width: 150px;
		display: grid;
		grid-template-columns: 50px 100px;
		grid-template-areas: "numberInput units";
	}

	input[type="number"] {
		width: 50px;
		font-size: 16px;
		grid-area: numberInput;
		outline: none;
		border: none;
	}

	.units {
		grid-area: units;
	}

	.footer {
		text-align: center;
		grid-area: footer;
	}
</style>