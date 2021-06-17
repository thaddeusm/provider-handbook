<script>
	import { router } from 'tinro';
	import { onMount } from 'svelte';
	import { navigatingResults, searchOpen, results, searchQuery, activeResult } from './../stores.js';
	import { exportPDF } from './../exportHandbook.js';

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
	import HandbookDesktopToC from './../Components/HandbookDesktopToC.svelte';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';
	import ResourceAvailable from './../Graphics/Icons/ResourceAvailable.svelte';
	import Footer from './../Components/Footer.svelte';

	import Illustration from './../Components/IllustrationContainer.svelte';

	let activeId = "Introduction";
	let processedSections = {};

	$: currentId = activeId;

	function textWithMarkup(element, text, section, isActive, currentSection, area, index, listItem) {
		if (!isActive && processedSections.hasOwnProperty(area) && processedSections[area].hasOwnProperty(index) && processedSections[area][index].hasOwnProperty(listItem)) {
			return processedSections[area][index][listItem];
		} else {
			let glossary = Handbook.glossary;

			let terms = Object.keys(glossary);
			let defs = Object.values(glossary);

			let textWithTooltips = text;

			if (section.split(' ').join('') == currentSection) {
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
							textWithTooltips = textWithTooltips.replace(term, (match) => {
								return `<button class="glossary-term">${match}<aside class="tooltip"><div class="tooltip-body"><p><span class="term">${match} - </span><span class="definition">${defs[i].definition}</span> <span class="source">(Merriam-Webster)</span></p></div><div class="tooltip-footer"><a class="regular-button-small tooltip-close">close</a></div></aside></button>`;
							});
						} else {
							textWithTooltips = textWithTooltips.replace(term, (match) => {
								return `<button class="glossary-term">${match}<aside class="tooltip"><div class="tooltip-body"><p><span class="term">${match} - </span><span class="definition">${defs[i].definition}</span></p></div><div class="tooltip-footer"><a class="regular-button-small tooltip-close">close</a></div></aside></button>`;
							});
						}
					}
				}
			}

			// add search highlights
			let textWithHighlights;

			let query = new RegExp(search_query_value, 'i');

			if (navigating_results_value) {
				textWithHighlights = textWithTooltips.replace(query, (match) =>{ 
					return `<span class="bold-text">${match}</span>`
				});
			} else {
				textWithHighlights = textWithTooltips;
			}

			let finalText;

			if (isActive && text.search(query) !== -1) {
				finalText = `<${element} class="active-section">${textWithHighlights}</${element}>`;
			} else {
				finalText = `<${element}>${textWithHighlights}</${element}>`;
			}

			if (section.split(' ').join('') == currentSection) {
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
			activeId = router.hash;
		}
	});
</script>

<div class="container">
	<aside>
		<HandbookDesktopToC sections={Handbook.sections} {activeId} />
	</aside>
	<div id="handbook">
		<button id="pdfExportButton" class="action-button-small" on:click={exportPDF}>download PDF</button>
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
 						{#if section.markup}
 							{#each section.markup as item, listItemNumber}
	 							{#if $activeResult.section == section.section.split(' ').join('')}
			 						{@html textWithMarkup('li', item, section.section, true, currentId, area, index, listItemNumber)}
			 					{:else}
									{@html textWithMarkup('li', item, section.section, false, currentId, area, index, listItemNumber)}
			 					{/if}
	 						{/each}
 						{:else}
	 						{#each section.text as item, listItemNumber}
	 							{#if $activeResult.section == section.section.split(' ').join('')}
			 						{@html textWithMarkup('li', item, section.section, true, currentId, area, index, listItemNumber)}
			 					{:else}
									{@html textWithMarkup('li', item, section.section, false, currentId, area, index, listItemNumber)}
			 					{/if}
	 						{/each}
	 					{/if}
 					</ol>
 				{:else if section.style == "unordered_list"}
 					<ul>
 						{#if section.markup}
 							{#each section.markup as item, listItemNumber}
	 							{#if $activeResult.section == section.section.split(' ').join('')}
			 						{@html textWithMarkup('li', item, section.section, true, currentId, area, index, listItemNumber)}
			 					{:else}
									{@html textWithMarkup('li', item, section.section, false, currentId, area, index, listItemNumber)}
			 					{/if}
	 						{/each}
 						{:else}
	 						{#each section.text as item, listItemNumber}
	 							{#if $activeResult.section == section.section.split(' ').join('')}
			 						{@html textWithMarkup('li', item, section.section, true, currentId, area, index, listItemNumber)}
			 					{:else}
									{@html textWithMarkup('li', item, section.section, false, currentId, area, index, listItemNumber)}
			 					{/if}
	 						{/each}
	 					{/if}
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
 					{#if $activeResult.section == section.section.split(' ').join('')}
 						{@html 
 							section.markup ? 
 								textWithMarkup('p', section.markup, section.section, true, currentId, area, index, 0)
 									:
 								textWithMarkup('p', section.text, section.section, true, currentId, area, index, 0)
 							}
 					{:else}
						{@html 
							section.markup ? 
								textWithMarkup('p', section.markup, section.section, false, currentId, area, index, 0) :
								textWithMarkup('p', section.text, section.section, false, currentId, area, index, 0)
						}
 					{/if}
 				{/if}
 			{/each}
 		{/each}
	</div>
	<footer>
		<Footer />
	</footer>
</div>

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-columns: 0 1fr;
			grid-template-areas: 
				". handbook"
				". footer";
		}

		#handbook {
			padding: 0 1rem;
		}

		aside {
			display: none;
		}

		.handbook-content-list {
			padding: 0 15px 0 0;
		}

		:global(.tooltip) {
			height: 35%;
			width: 100%;
			left: 0;
			text-align: left;
		}

		:global(.tooltip)::before {
			height: 65%;
			left: 0;
			top: 0;
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
		.container {
			grid-template-columns: 0 1fr;
			grid-template-areas: 
				". handbook"
				". footer";
		}

		#handbook {
			padding: 0 2rem;
		}

		aside {
			display: none;
		}

		.handbook-content-list {
			padding: 0 35px 0 0;
		}

		:global(.tooltip) {
			height: 25%;
			width: 100%;
			left: 0;
			text-align: left;
		}

		:global(.tooltip)::before {
			height: 75%;
			left: 0;
			top: 0;
		}

		:global(.tooltip-body) {
			padding: 0 32px;
		}

		:global(.term) {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-columns: 410px auto;
			grid-template-areas: 
				". handbook"
				". footer";
			margin-top: -50px;
		}

		#handbook {
			max-width: 725px;
			margin: 0 auto;
		}

		:global(.tooltip) {
			height: 20%;
			left: 410px;
			right: 0;
			text-align: center;
		}

		:global(.tooltip)::before {
			height: calc(80% - 50px);
			left: 410px;
			top: 50px;
		}

		:global(.tooltip-body) {
			max-width: 725px;
			margin: 0 auto;
		}

		:global(.tooltip-footer) {
			display: none;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 100px;
	}

	#handbook {
		grid-area: handbook;
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
		font-family: "Montserrat";
	}

	:global(ul li):first-child {
		margin-top: -.5rem;
	}

	:global(ul li) {
		margin: 1rem 0;
		font-size: 16px;
		line-height: 1.5;
		color: var(--black);
		font-family: "Montserrat";
	}

	aside {
		background: var(--brand-dark);
		position: fixed;
		height: 100%;
		margin-top: 10px;
		top: 0;
		width: 410px;
		overflow: auto;
		grid-area: links;
		z-index: 1;
	}

	.inactive {
		border-bottom: 3px solid var(--brand-dark);
	}

	footer {
		grid-area: footer;
	}

	.description {
		margin: 0;
		padding: 0;
	}

	.modal-body {
		align-self: center;
	}

	.modal-footer {
		display: grid;
		grid-template-rows: 40% 60%;
		align-items: center;
		height: 100%;
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
		align-items: flex-start;
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
		margin-top: 3px;
	}

	:global(.glossary-term:hover .tooltip) {
		visibility: visible;
	}

	:global(.tooltip-close, .tooltip-link) {
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

	:global(.tooltip)::before {
		content: " ";
		position: fixed;
		width: 100%;
		background: rgba(0, 0, 0, .2);
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

	#pdfExportButton {
		margin-top: 50px;
	}
</style>