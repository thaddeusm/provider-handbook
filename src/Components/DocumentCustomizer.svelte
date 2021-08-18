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
	import StudentRecruitmentFlyer from './../CustomizableDocuments/StudentRecruitmentFlyer.svelte';

	const customizableDocuments = {
		"Access Logo": AccessLogo,
		"Facebook Cover Photo": FacebookCoverPhoto,
		"2-Year Program Diagram": ProgramDiagram,
		"Student Recruitment Flyer": StudentRecruitmentFlyer
	};

	export let documentToCustomize;

	let customizationChoices = {};
	let customizationIndex = 0;
	let customizedSVG;

	let error = false;
	let errorMessage = '';
	let focused = false;

	$: alert = errorMessage !== '';

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

	function makeSingular(unit) {
		if (unit.indexOf('ies') !== -1) {
			return unit.slice(0, -3) + 'y';
		} else {
			return unit.slice(0, -1);
		}
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

	function displayErrorMessage(e) {
		if (e.detail.interrupt) {
			error = true;
		}
		customizationIndex = e.detail.index;
		errorMessage = e.detail.message;
	}

	function hideErrorMessage() {
		error = false;
		errorMessage = '';
	}

	function handleFocus() {
		error = false;
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}

	function handleChange(e, name) {
		// customizationChoices[name] = e.target.files[0].name;

		let file = e.target.files[0];
		let reader  = new FileReader();
	    
	    reader.onload = function(e)  {
	    	customizationChoices[name] = e.target.result;
	    }
		
		reader.readAsDataURL(file);
	}

	onMount(() => {
		for (let i=0; i<documentToCustomize.customizations.length; i++) {
			if (documentToCustomize.customizations[i].format == 'number') {
				customizationChoices[documentToCustomize.customizations[i].name] = parseInt(documentToCustomize.customizations[i].min);
			} else {
				customizationChoices[documentToCustomize.customizations[i].name] = documentToCustomize.customizations[i].placeholder;
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
	<section class="error-section">
		{#if alert}
			<span class="error-text">{errorMessage}</span>
		{/if}
	</section>
	<p class="prompt">
		{customization.prompt}
	</p>
	<div class="preview">
		<svelte:component this={customizableDocuments[documentToCustomize.text]} {customizationChoices} on:document-updated={handleUpdate} on:input-error={displayErrorMessage} on:input-error-resolved={hideErrorMessage} step={customizationIndex} {focused} />
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
				on:focus={handleFocus}
				on:blur={handleBlur}
				class:alert
			/>
		{:else if customization.format == "number"}
			<section class="number-box" class:alert>
				<input 
					type="number" 
					name={customization.name} 
					min={customization.min}
					max={customization.max}
					bind:value={customizationChoices[customization.name]} 
					on:keyup={handleKeyup} 
					on:focus={handleFocus}
					on:blur={handleBlur}
				/>
				<span class="units">{customizationChoices[customization.name] == 1 ? makeSingular(customization.units) : customization.units}</span>
			</section>
		{:else if customization.format == "file"}
			<input 
				type="file" 
				id="fileInput" 
				name={customization.name} 
				accept={customization.accept} 
				on:change={(e) => {handleChange(e, customization.name)}}
			/>
			<label for="fileInput" class="regular-button-small file-button">select{customizationChoices[customization.name] == undefined ? ' ' : ' a different '}image</label>
		{:else if customization.format == "textarea"}
			<textarea 
				bind:value={customizationChoices[customization.name]} 
				maxlength={customization.characterLimit || 100}
			></textarea>
		{/if}
	</div>
	<div class="footer">
		{#if customizationIndex > 0 && documentToCustomize.customizations.length !== 1}
			<button enterkeyhint="back" class="regular-button-small" on:click={decrementCustomizationIndex}>
				back
			</button>
		{/if}
		{#if customizationIndex + 1 == documentToCustomize.customizations.length || documentToCustomize.customizations.length == 1}
			<button enterkeyhint="download" class="action-button-small" on:click={triggerDownload} disabled={error}>
				download
			</button>
		{:else}
			<button enterkeyhint="next" class="action-button-small" on:click={incrementCustomizationIndex} disabled={error}>
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
				"error"
				"inputArea"
				"footer";
			padding: 1rem .5rem;
			margin-left: 0;
			margin-right: 0;
		}

		.error-section {
			margin: -1rem auto -.5rem auto;
			text-align: center;
		}

		.step {
			margin-bottom: 1rem;
		}

		.number-box {
			margin: 1rem auto;
		}

		.prompt {
			margin: 0 auto .5rem auto;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-areas: 
				"step"
				"preview"
				"prompt"
				"error"
				"inputArea"
				"footer";
			padding: 1rem;
		}

		.error-section {
			margin: -.5rem auto -1.5rem auto;
		}

		.step {
			margin-bottom: 1rem;
		}

		.preview {
			padding: 0 15%;
			margin: 0 auto;
		}

		.number-box {
			margin: 1rem auto;
		}

		.prompt {
			margin: 1rem auto;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-areas: 
				"step"
				"prompt"
				"preview"
				"error"
				"inputArea"
				"footer";
			padding: 1rem;
		}

		.error-section {
			margin: 2rem auto -1.5rem auto;
		}

		.preview {
			/*padding: 0 20%;*/
			margin: 0 auto;
			background: var(--white);
		}

		.number-box {
			margin: 2rem auto;
		}

		.prompt {
			margin: 1rem auto;
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
		margin-bottom: 5rem;
		display: grid;
	}

	.step {
		text-align: center;
		grid-area: step;
	}

	p {
		margin: 0 auto;
		padding: 1rem 0;
		text-align: center;
	}

	.error-section {
		grid-area: error;
		min-height: 50px;
	}

	.error-text {
		color: var(--red);
	}

	.prompt {
		grid-area: prompt;
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

	input[type="file"] {
		opacity: 0;
  		width: 0.1px;
  		height: 0.1px;
  		position: absolute;
	}

	.file-button {
		margin: 2rem auto;
	}

	textarea {
		font-size: 16px;
		padding: 10px;
		color: var(--black);
		font-family: "NotoSans";
		background: var(--white);
		outline: none;
		margin: 2rem auto;
		border: 1px solid var(--brand);
		border-radius: var(--radius);
		width: 310px;
		height: 75px;
		display: block;
	}

	.number-box {
		font-size: 16px;
		padding: 10px;
		color: var(--black);
		font-family: "NotoSans";
		background: var(--white);
		outline: none;
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

	.alert {
		border: 1px solid var(--red);
	}

	.units {
		grid-area: units;
	}

	.footer {
		text-align: center;
		grid-area: footer;
	}
</style>