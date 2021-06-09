<script>
	import { onMount } from 'svelte';
	import { navigatingResults, searchOpen, results, searchQuery, activeResult } from './../stores.js';

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
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';
	import PreviewModal from './../Components/PreviewModal.svelte';
	import Footer from './../Components/Footer.svelte';

	import Illustration from './../Components/IllustrationContainer.svelte';

	let activeId = "Introduction";
	let showPreview = false;
	
	let previewSection;
	let previewURL;
	let previewDescription;
	let previewImage;

	function openPreview(previewImageTitle, link, description) {
		showPreview = !showPreview;
		
		previewSection = previewImageTitle;
		previewURL = link;
		previewDescription = description;
	}

	function textWithMarkup(element, text, section, isActive) {
		let glossary = Handbook.glossary;

		let terms = Object.keys(glossary);
		let defs = Object.values(glossary);

		let textWithTooltips;

		// add tooltips
		for (let i=0; i<terms.length; i++) {
			let term = new RegExp(terms[i], 'i');
			let termText = terms[i];

			if (section !== termText) {
				textWithTooltips = text.replace(term, `<button class="glossary-term"><u>${termText}</u><aside class="tooltip"><div class="tooltip-body"><p>${defs[i].definition}</p></div><div class="tooltip-footer"><a class="action-button-small tooltip-link" onclick="jumpToId('${defs[i].reference}')">read more</a><a class="regular-button-small tooltip-close">close</a></div></aside></button>`);
			} else {
				textWithTooltips = text;
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

		return finalText;
	}

	function handleJump(section) {
		jumpToId(section);

		setTimeout(() => {
			activeId = section;
		}, 20, section);
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
		}, {threshold: .60});

		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});

		document.querySelectorAll('span[id]').forEach((section) => {
			observer.observe(section);
		});
	});
</script>

<div class="container">
	<aside>
		<ul>
			{#each Handbook.sections as handbookSection, i}
				{#each handbookSection as section, j}
					{#if section.style.includes('heading')}
						<li class={section.style.includes('subheading') ? 'subheading' : ''}>
							<a 
								class={activeId == section.text.split(' ').join('') ? 'active': 'inactive'}
								on:click={() => {handleJump(section.text.split(' ').join(''))}}
							>
								{section.text}
							</a>
						</li>
					{/if}
				{/each}
			{/each}
		</ul>
	</aside>
	<div id="handbook">
		{#each Handbook.sections as handbookSection}
 			{#each handbookSection as section}
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
 						{#each section.text as item}
 							{#if $activeResult.section == section.section.split(' ').join('')}
		 						{@html textWithMarkup('li', item, true, $navigatingResults)}
		 					{:else}
								{@html textWithMarkup('li', item, false, $navigatingResults)}
		 					{/if}
 						{/each}
 					</ol>
 				{:else if section.style == "unordered_list"}
 					<ul>
 						{#each section.text as item}
 							{#if $activeResult.section == section.section.split(' ').join('')}
		 						{@html textWithMarkup('li', item, true, $navigatingResults)}
		 					{:else}
								{@html textWithMarkup('li', item, false, $navigatingResults)}
		 					{/if}
 						{/each}
 					</ul>
 				{:else if section.style == "graphic"}
 					<Illustration title={section.title} altText={section.text} />
 				{:else if section.style == "external_link"}
 					<p class="external-link-block">
 						<span class="external-link-icon">
 							<InteractiveAvailable width={'2rem'} height={'2rem'} />
 						</span>
 						<a class="external-link" href="{section.url}" target="_blank">{section.text}</a>
 					</p>
 				{:else}
 					{#if $activeResult.section == section.section.split(' ').join('')}
 						{@html textWithMarkup('p', section.text, section.section, true, $navigatingResults)}
 					{:else}
						{@html 
							section.markup ? 
								textWithMarkup('p', section.markup, section.section, false, $navigatingResults) :
								textWithMarkup('p', section.text, section.section, false, $navigatingResults)
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

{#if showPreview}
	<PreviewModal>
		<div slot="body" class="modal-body">
			{#if previewSection}
				<img class="large-preview-image" src={`/PreviewImages/${previewSection.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Large.png`} />
				<img class="small-preview-image" src={`/PreviewImages/${previewSection.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")}Small.png`} />
			{/if}
		</div>
		<div slot="footer" class="modal-footer">
			<p class="description">
				{previewDescription}
			</p>
			<div class="actions">
				<button class="regular-button-small" on:click={() => {showPreview = false}}>close</button>
				<a class="action-button-small" href="{previewURL}" target="_blank">go</a>
			</div>
		</div>
	</PreviewModal>
{/if}

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
			height: 40%;
		}

		:global(.tooltip)::before {
			height: 60%;
		}

		:global(.tooltip-body) {
			padding: 0 15px;
		}

		:global(.tooltip-footer) {
			align-self: flex-start;
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
		}

		:global(.tooltip)::before {
			height: 75%;
		}

		:global(.tooltip-body) {
			padding: 0 32px;
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
			max-width: 750px;
			margin: 0 auto;
		}
	}

	/* touch devices */
	@media (pointer: coarse), (hover: none) {
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
			left: 0;
			z-index: 1000;
			box-shadow: var(--shadow);
			text-align: left;
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
			top: 0;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, .2);
		}

		:global(.tooltip-close) {
			margin-left: 10px;
		}
	}

	/* devices with a mouse */
	@media (hover: hover) {
		:global(.glossary-term:hover .tooltip) {
			visibility: visible;
		}

		:global(.tooltip::before:hover) {
			visibility: visible;
		}

		:global(.tooltip-close) {
			display: none;
		}

		:global(.tooltip) {
			visibility: hidden;
			position: absolute;
			background: var(--white);
			padding: 10px 25px;
			width: 260px;
			margin-top: 35px;
			margin-left: -245px;
			z-index: 1000;
			border-radius: var(--radius);
			box-shadow: var(--shadow);
			text-align: left;
			display: inline;
		}

		:global(.tooltip)::before {
			content: " ";
			position: absolute;
			top: -30px;
			left: 50%;
			margin-left: -15px;
			border-width: 15px;
			border-style: solid;
			border-color: transparent transparent #c4c4c4 transparent;
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
		margin-bottom: 1rem;
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

	.subheading {
		margin-left: 1rem;
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

	aside ul {
		list-style: none;
	}

	aside ul li {
		padding: 0 3rem;
		margin: 1rem 0;
		line-height: 1.5;
	}

	aside ul li:first-child {
		margin-top: 13rem;
	}

	aside ul li a {
		color: var(--white);
		font-size: 16px;
		cursor: pointer;
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
	}

	.external-link-icon {
		grid-area: icon;
	}

	.external-link {
		font-size: 16px;
		border-bottom: 3px solid var(--brand-light);
		grid-area: link;
		margin-bottom: 15px;
	}
</style>