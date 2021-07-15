<script>
	import download from 'downloadjs';
	import { onMount } from 'svelte';

	let SVGToImage;

	import('./../exportSVGToPNG.js').then(module => {
  		SVGToImage = module.SVGToImage
	});

	import AccessLogo from './../CustomizableDocuments/AccessLogo.svelte';

	const customizableDocuments = {
		"Access Logo": AccessLogo
	};

	export let documentToCustomize;

	let customizationChoices = [];
	let customizedSVGString = '';

	async function svg2img(svg) {
	    let svg64 = btoa(unescape(encodeURIComponent(svg)));
    	let b64start = 'data:image/png;base64,';
    	let image64 = b64start + svg64;

	    return await image64;
	}

	async function prepareDocumentDownload() {
		SVGToImage({
			svg: `${customizedSVGString}`,
			mimetype: 'image/jpeg'
		}).then((output) => {
			download(output, 'test', 'image/jpeg')
		}).catch(error => {console.log(error)})
	}

	function handleUpdate(e) {
		customizedSVGString = e.detail.svg;
	}

	onMount(() => {
		for (let i=0; i<documentToCustomize.customizations.length; i++) {
			customizationChoices.push({
				"customization": "",
				"choice": ""
			});
		}
	});
</script>

<div class="arrow"></div>
<div class="container">
	{#each documentToCustomize.customizations as customization, i}
		<p class="prompt">
			{customization.prompt}
		</p>
		<div class="preview">
			<svelte:component this={customizableDocuments[documentToCustomize.text]} width={'50%'} {customizationChoices} on:document-updated={handleUpdate} />
		</div>
		<div class="input-area">
			{#if customization.format == "text"}
				<input type="text" name={customization.name} placeholder={customization.placeholder} bind:value={customizationChoices[customization.name]} maxlength={customization.characterLimit} />
			{/if}
		</div>
		<div class="footer">
			<button class="action-button-small" on:click={prepareDocumentDownload}>
				download
			</button>
		</div>
	{/each}
</div>

<style>
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
	}

	p {
		margin: 0 auto;
		padding: 2rem 0;
		text-align: center;
	}

	.preview {
		text-align: center;
	}

	input {
		font-size: 16px;
		padding: 10px;
		color: var(--black);
		font-family: "NotoSans";
		background: var(--white);
		outline: none;
		display: block;
		width: 50%;
		margin: 1rem auto;
		border: 1px solid var(--brand);
		border-radius: var(--radius);
	}

	.footer {
		text-align: center;
	}
</style>