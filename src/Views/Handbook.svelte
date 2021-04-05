<script>
	import { onMount } from 'svelte';

	import Handbook from './../Docs/Handbook.json';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';
	import PreviewModal from './../Components/PreviewModal.svelte';

	import Illustration from './../Components/IllustrationContainer.svelte';
	import Icon from './../Components/IconContainer.svelte'

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

	function textWithTooltips(text, section) {
		let glossary = Handbook.glossary;

		let terms = Object.keys(glossary);
		let defs = Object.values(glossary);

		let newText;

		for (let i=0; i<terms.length; i++) {
			let term = new RegExp(terms[i], 'i');
			let termText = terms[i];

			if (section !== termText) {
				newText = text.replace(term, `<button class="glossary-term"><u>${termText}</u><aside class="tooltip"><div class="tooltip-body"><p>${defs[i].definition}</p></div><div class="tooltip-footer"><a class="action-button-small tooltip-link" onclick="jumpToId('${defs[i].reference}')">read more</a><a class="regular-button-small tooltip-close">close</a></div></aside></button>`);
			} else {
				newText = text;
			}
		}

		return newText;
	}

	function handleJump(section) {
		jumpToId(section);

		setTimeout(() => {
			console.log(section)
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
								class={activeId == section.content.split(' ').join('') ? 'active': ''}
								on:click={() => {handleJump(section.content.split(' ').join(''))}}>
								{section.content}
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
 					<section id="{section.content.split(' ').join('')}">
 						<h2>
 							{section.content}
 						</h2>
 					</section>
 				{:else if section.style == "icon_subheading"}
 					<span id="{section.content.split(' ').join('')}"></span>
 					<section class="icon-subheading">
 						<h3>
 							{section.content}
 						</h3>
 						<button 
 							on:click={() => {openPreview(section.preview_image.split(' ').join(''), section.link, section.interactive_description)}}
 						>
 							<InteractiveAvailable width={'2rem'} height={'2rem'} />
 						</button>
 					</section>
 				{:else if section.style == "subheading"}
 					<section id="{section.content.split(' ').join('')}">
 						<h3>
	 						{section.content}
	 					</h3>
 					</section>
 				{:else if section.style == "ordered_list"}
 					<ol>
 						{#each section.content as item}
 							<li>{item}</li>
 						{/each}
 					</ol>
 				{:else if section.style == "graphic"}
 					<Illustration title={section.title} />
 				{:else if section.style == "icon"}
 					<Icon title={section.title} />
 				{:else}
 					<p>{@html textWithTooltips(section.content, section.section)}</p>
 				{/if}
 			{/each}
 		{/each}
	</div>
	<footer>
		<h6>sponsored by the U.S. Department of State</h6>
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
		}

		#handbook {
			padding: 0 1rem;
		}

		aside {
			display: none;
		}

		.large-preview-image {
			display: none!important;
		}

		.small-preview-image {
			width: 35%;
		}

		.handbook-content-list {
			padding: 0 15px 0 0;
		}

		:global(.tooltip) {
			height: 30%;
		}

		:global(.tooltip)::before {
			height: 70%;
		}

		:global(.tooltip-body) {
			padding: 0 15px;
		}

		:global(.tooltip-footer) {
			align-self: flex-start;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		.large-preview-image {
			display: none!important;
		}

		.small-preview-image {
			height: 450px;
		}
	}

	@media screen and (min-width: 801px) and (max-width: 1100px) {
		.large-preview-image {
			width: 40%;
		}

		.small-preview-image {
			display: none!important;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.container {
			grid-template-columns: 0 1fr;
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
			height: 23%;
		}

		:global(.tooltip)::before {
			height: 77%;
		}

		:global(.tooltip-body) {
			padding: 0 32px;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-columns: 26rem 1fr;
			margin-top: -15px;
		}

		#handbook {
			padding: 0 4rem;
		}

		.small-preview-image {
			display: none!important;
		}

		.large-preview-image {
			width: 50%;
			min-width: 400px;
		}

		.handbook-content-list {
			padding: 0 5rem;
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
		grid-template-areas: 
			". handbook"
			". footer";
	}

	#handbook {
		grid-area: handbook;
	}

	ol {
		list-style-position: inside;
		margin-bottom: 1rem;
	}

	ol li:first-child {
		margin-top: -.5rem;
	}

	ol li {
		margin: 1rem 0;
		font-size: 15px;
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
		top: 0;
		padding-top: 10px;
		width: 26rem;
		padding-bottom: 65px;
		grid-area: links;
		z-index: 1;
		height: 100%;
	}

	aside ul {
		/*position: fixed;
		top: 3rem;*/
	}

	aside ul li {
		padding: 0 3rem;
		margin: 2rem 0;
	}

	aside ul li:first-child {
		margin-top: 13rem;
	}

	aside ul li a {
		color: var(--white);
		font-size: 15px;
		cursor: pointer;
	}

	.icon-subheading {
		margin-top: 30px;
		display: grid;
		grid-template-columns: 1fr 45px;
	}

	.icon-subheading h3 {
		margin-top: 0;
	}

	.icon-subheading button {
		display: block;
	}

	footer {
		grid-area: footer;
	}

	.large-preview-image {
		margin: 0 auto;
		display: block;
		box-shadow: var(--shadow);
		border-radius: var(--radius);
	}

	.small-preview-image {
		margin: 0 auto;
		display: block;
		box-shadow: var(--shadow);
		border-radius: var(--radius);
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
</style>