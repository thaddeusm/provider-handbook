<script>
	import { router } from 'tinro';

	import { onMount } from 'svelte';
	import { navigatingResults, searchOpen, results, searchQuery, activeResult } from './../stores.js';

	export let meta;

	let exportPDF;

	import('./../exportHandbook.js').then(module => {
  		exportPDF = module.exportPDF
	});

	let search_query_value;

	const unsubscribeSeachQuery = searchQuery.subscribe(value => {
		search_query_value = value;
	});

	let active_result_value;

	const unsubscribeActiveResult = activeResult.subscribe(value => {
		active_result_value = value;
	});

	let navigating_results_value;

	const unsubscribeNavigatingResults = navigatingResults.subscribe(value => {
		navigating_results_value = value;
	});

	import Handbook from './../Docs/Handbook.json';

	import Expanded from './../ViewTemplates/Expanded.svelte';
	import InteractiveAvailable from './../Icons/InteractiveAvailable.svelte';
	import ResourceAvailable from './../Icons/ResourceAvailable.svelte';
	import Illustration from './../Components/IllustrationContainer.svelte';

	let activeId = "Introduction";

	let processedSections = {};

	let exportingPDF = false;

	async function handlePDFExport() {
		exportingPDF = true;

		setTimeout(() => {
			exportPDF(() => {
				exportingPDF = false;
			});
		}, 500)
	}

	function textWithMarkup(element, text, section, area, index, listItem, isActive) {
		if (navigating_results_value == true) {
			return textWithSearchHighlights(element, text, section, area, index, listItem, isActive);
		} else {
			return textWithGlossary(element, text, section, area, index, listItem, isActive);
		}
	}

	function textWithGlossary(element, textSample, section, area, index, listItem, isActive, isActiveResult) {
		if (processedSections.hasOwnProperty(area) && processedSections[area].hasOwnProperty(index) && processedSections[area][index].hasOwnProperty(listItem)) {
			return processedSections[area][index][listItem];
		} else {
			let text;

			if (section.markup) {
				if (element == 'li') {
					text = section.markup[listItem];
				} else {
					text = section.markup;
				}
			} else {
				text = textSample;
			}

			let glossary = Handbook.glossary;

			let terms = Object.keys(glossary);
			let defs = Object.values(glossary);

			if (isActive) {
				// add tooltips
				for (let i=0; i<terms.length; i++) {
					let term;

					if (defs[i].form !== 'acronym') {
						term = new RegExp(terms[i], 'i', 'g');
					} else {
						term = new RegExp(terms[i], 'g');
					}

					let termText = terms[i];

					if (section !== termText) {
						if (defs[i].form == 'word') {
							if (defs[i].source !== '') {
								text = text.replace(term, (match) => {
									return `<button class="glossary-term">${match}<aside class="tooltip"><div class="tooltip-body"><p><span class="term">${match} - </span><span class="definition">${defs[i].definition}</span> <span class="source">(${defs[i].source})</span></p></div><div class="tooltip-footer"><a class="regular-button-small tooltip-close">close</a></div></aside></button>`;
								});
							} else {
								text = text.replace(term, (match) => {
									return `<button class="glossary-term">${match}<aside class="tooltip"><div class="tooltip-body"><p><span class="term">${match} - </span><span class="definition">${defs[i].definition}</span></p></div><div class="tooltip-footer"><a class="regular-button-small tooltip-close">close</a></div></aside></button>`;
								});
							}
						} else {
							text = text.replace(term, (match) => {
								return `<button class="glossary-term">${match}<aside class="tooltip"><div class="tooltip-body"><p><span class="term">${match} - </span><span class="definition">${defs[i].definition}</span></p></div><div class="tooltip-footer"><a class="regular-button-small tooltip-close">close</a></div></aside></button>`;
							});
						}
					}
				}
			}

			let finalText = `<${element}>${text}</${element}>`;

			if (isActive) {
				if (!processedSections.hasOwnProperty(area)) {
					processedSections[area] = {};
				}

				if (!processedSections[area].hasOwnProperty(index)) {
					processedSections[area][index] = {};
				}

				processedSections[area][index][listItem] = finalText;
			}

			return finalText;
		}
	}

	function textWithSearchHighlights(element, textSample, section, area, index, listItem, isActive, isActiveResult) {
		let text = textSample;

		let query = new RegExp(search_query_value, 'i');

		if (navigating_results_value) {
			text = text.replace(query, (match) =>{
				return `<span class="bold-text">${match}</span>`
			});
		}

		let finalText;

		if (active_result_value.section == section.section.split(' ').join('') && text.search(query) !== -1) {
			finalText = `<${element} class="active-section">${text}</${element}>`;
		} else {
			finalText = `<${element}>${text}</${element}>`;
		}

		return finalText;
	}

	onMount(async () => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					if (activeId !== entry.target.getAttribute('id')) {
						activeId = entry.target.getAttribute('id');
					}
				}
			});
		}, {threshold: .57});

		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});

		document.querySelectorAll('span[id]').forEach((section) => {
			observer.observe(section);
		});

		if ($router.hash.length > 1) {
			activeId = $router.hash;
		}
	});
</script>

<Expanded contentSource={Handbook.sections} {activeId} path={meta.match}>
	<button
		id="pdfExportButton"
		class="action-button-small"
		on:click={handlePDFExport} disabled={exportingPDF}
	>
		{#if exportingPDF}
			Loading PDF...
		{:else}
			Download PDF
		{/if}
	</button>
	{#each Handbook.sections as handbookSection, area}
		{#each handbookSection as section, index}
			{#if section.style == "heading"}
				<section id="{section.text.split(' ').join('')}">
					<h2>
						{section.text}
					</h2>
				</section>
			{:else if section.style == "subheading"}
				<section id="{section.text.split(' ').join('')}">
					<h3>
						{section.text}
					</h3>
				</section>
			{:else if section.style == "ordered_list"}
				<ol>
					{#each section.text as item, listItemNumber}
						{@html textWithMarkup('li', item, section, area, index, listItemNumber, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
					{/each}
				</ol>
			{:else if section.style == "unordered_list"}
				<ul>
					{#each section.text as item, listItemNumber}
						{@html textWithMarkup('li', item, section, area, index, listItemNumber, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
					{/each}
				</ul>
			{:else if section.style == "graphic"}
				<Illustration title={section.title} altText={section.text} />
			{:else if section.style == "external_link"}
				<p class="external-link-block">
					<span class="external-link-icon" title="External Link">
						<InteractiveAvailable width={'2rem'} height={'2rem'} />
					</span>
					{#if section.url == ''}
						<span class="coming-soon">
							{section.text} (coming soon)
						</span>
					{:else}
						<a class="external-link" href="{section.url}" target="_blank">
							{section.text}
						</a>
					{/if}
				</p>
			{:else if section.style == "external_resource"}
				<p class="external-link-block">
					<span class="external-link-icon" title="Resource Available">
						<ResourceAvailable width={'2rem'} height={'2rem'} color={'#D11242'} />
					</span>
					{#if section.url == ''}
						<span class="coming-soon">
							{section.text} (coming soon)
						</span>
					{:else}
						<a class="external-link" href="{section.url}" target="_blank">
							{section.text}
						</a>
					{/if}
				</p>
			{:else}
				{@html textWithMarkup('p', section.text, section, area, index, null, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
			{/if}
		{/each}
	{/each}
</Expanded>

<style>
	@media screen and (max-width: 450px) {
		:global(.tooltip) {
			height: 35%;
			width: 100%;
			left: 0;
			text-align: left;
		}

		:global(.tooltip)::after {
			height: 65%;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, .2)!important;
		}

		:global(.tooltip-body) {
			padding: 0 15px;
		}

		:global(.tooltip-footer) {
			align-self: flex-start;
		}

		:global(.term) {
			display: none;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		:global(.tooltip) {
			height: 25%;
			width: 100%;
			left: 0;
			text-align: left;
		}

		:global(.tooltip)::after {
			height: 75%;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, .2)!important;
		}

		:global(.tooltip-body) {
			padding: 0 32px;
		}

		:global(.term) {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		:global(.tooltip) {
			height: 20%;
			left: 410px;
			right: 0;
			text-align: center;
		}

		:global(.tooltip)::after {
			height: calc(80% - 50px);
			left: 410px;
			top: 50px;
			background: rgba(0, 0, 0, .2)!important;
		}

		:global(.tooltip-body) {
			max-width: 725px;
			margin: 0 auto;
		}

		:global(.tooltip-footer) {
			display: none;
		}
	}

	ol, ul {
		list-style-position: inside;
		margin: 1rem 0 3rem 0;
	}

	:global(ol li):first-child {
		margin-top: -.5rem;
	}

	:global(ol li) {
		margin: 1rem 0;
		font-size: 16px;
		line-height: 1.5;
		color: var(--black);
		font-family: "NotoSans";
	}

	:global(ul li):first-child {
		margin-top: -.5rem;
	}

	:global(ul li) {
		margin: 1rem 0;
		font-size: 16px;
		line-height: 1.5;
		color: var(--black);
		font-family: "NotoSans";
	}

	:global(.glossary-term) {
		cursor: default;
		font-size: 16px;
		font-weight: inherit;
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 2px;
		text-decoration-color: var(--brand);
		text-decoration-skip-ink: none!important;
		text-decoration-skip: none!important;
	}

	:global(.tooltip-footer) {
		text-align: center;
	}

	:global(.tooltip-footer > a) {
		cursor: pointer;
	}

	[id]::before {
		display: inline-block;
		content: " ";
		margin-top: -300px;
		height: 300px;
		visibility: hidden;
		pointer-events: none;
	}

	.external-link-block {
		display: grid;
		grid-template-columns: 3rem auto 1fr;
		grid-template-areas: "icon link .";
		height: 50px;
		align-items: center;
		justify-content: center;
		margin: 40px 0;
	}

	.external-link-icon {
		grid-area: icon;
	}

	.external-link {
		font-size: 16px;
		text-decoration: underline;
		text-decoration-color: var(--brand-light);
		text-decoration-thickness: 3px;
		text-decoration-skip-ink: none!important;
		text-decoration-skip: none!important;
		grid-area: link;
	}

	.coming-soon {
		font-size: 16px;
		grid-area: link;
	}

	:global(.glossary-term:hover .tooltip) {
		visibility: visible;
	}

	:global(.tooltip-close) {
		pointer-events: auto!important;
	}

	:global(.tooltip-link) {
		pointer-events: auto!important;
	}

	:global(.tooltip:hover) {
		visibility: hidden!important;
	}

	:global(.tooltip) {
		position: fixed;
		background: var(--white);
		bottom: 0;
		z-index: 1000;
		box-shadow: var(--shadow);
		display: grid;
		visibility: hidden;
		align-items: center;
		pointer-events: none;
		transition: visibility .05s;
		-webkit-transition: visibility .05s;
		transition-delay: .05s;
		-webkit-transition-delay: .05s;
	}

	:global(.tooltip)::after {
		content: " ";
		position: fixed;
		z-index: 1;
		width: 100%;
	}

	:global(.tooltip-close) {
		margin-left: 10px;
	}

	:global(.term) {
		font-weight: 800;
	}

	:global(.definition) {
		font-weight: 400;
	}

	:global(.source) {
		font-style: italic;
	}

	:global(.embedded-link) {
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-decoration-color: #3470B7;
		text-decoration-skip-ink: none;
		text-decoration-skip: none;
	}

	#pdfExportButton {
		margin-top: 50px;
	}
</style>
