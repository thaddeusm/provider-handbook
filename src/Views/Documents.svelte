<script>
	import { router } from 'tinro';
	export let meta;

	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import Expanded from './../ViewTemplates/Expanded.svelte';
	import InteractiveAvailable from './../Icons/InteractiveAvailable.svelte';
	import ResourceAvailable from './../Icons/ResourceAvailable.svelte';
	import Illustration from './../Components/IllustrationContainer.svelte';
	import DocumentCustomizer from './../Components/DocumentCustomizer.svelte';

	import SupplementalDocuments from './../Docs/SupplementalDocuments.json';

	let activeId = 'Documents';
	let customizing = false;
	let documentToCustomize = null;
	let documentIndexMatrix = null;

	function openCustomizationPanel(section, subsection) {
		customizing = true;
		documentIndexMatrix = [section, subsection];
		documentToCustomize = SupplementalDocuments.documents[documentIndexMatrix[0]][documentIndexMatrix[1]];
	}

	function closeCustomizationPanel() {
		customizing = false;
		documentToCustomize = null;
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

<Expanded contentSource={SupplementalDocuments.documents} {activeId} path={meta.match}>
	{#each SupplementalDocuments.documents as documentSection, i}
		{#each documentSection as section, j}
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
			{:else if section.style == "graphic"}
				<Illustration title={section.title} altText={section.text} />
			{:else if section.style == "link" && section.customizable == "true"}
				<p class="customizable">
					<span class="link-icon" title="External Link">
						<ResourceAvailable width={'2rem'} height={'2rem'} color={'#D11242'} />
					</span>
					{#if section.url == ''}
						<span class="coming-soon">
							{section.text} (coming soon)
						</span>
					{:else}
						<a class="link" href="{section.url}" target="_blank">
							{section.text}
						</a>
					{/if}
					<i class="line"></i>
					{#if customizing && documentIndexMatrix[0] == i && documentIndexMatrix[1] == j}
						<button class="regular-button-small customize" on:click={closeCustomizationPanel}>
							cancel
						</button>
					{:else}
						<button class="action-button-small customize" on:click={() => {openCustomizationPanel(i, j)}} disabled={customizing}>
							customize
						</button>
					{/if}
				</p>
				{#if customizing && documentIndexMatrix[0] == i && documentIndexMatrix[1] == j}
					<div transition:slide="{{duration: 300}}">
						<DocumentCustomizer {documentToCustomize} />
					</div>
				{/if}
			{:else}
				<p class="not-customizable">
					<span class="link-icon" title="External Link">
						<ResourceAvailable width={'2rem'} height={'2rem'} color={'#D11242'} />
					</span>
					{#if section.url == ''}
						<span class="coming-soon">
							{section.text} (coming soon)
						</span>
					{:else}
						<a class="link" href="{section.url}" target="_blank">
							{section.text}
						</a>
					{/if}
				</p>
			{/if}
		{/each}
	{/each}
</Expanded>

<style>
	@media screen and (max-width: 450px) {
		.line {
			display: none;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		.line {
			display: none;
		}
	}

	@media screen and (min-width: 1101px) {
		
	}

	[id]::before { 
		display: inline-block; 
		content: " "; 
		margin-top: -300px; 
		height: 300px; 
		visibility: hidden; 
		pointer-events: none;
	}

	.customizable {
		display: grid;
		grid-template-areas: "icon link line customize";
		grid-template-columns: 3rem auto 1fr auto;
		height: 50px;
		align-items: center;
		justify-content: center;
	}

	.not-customizable {
		display: grid;
		grid-template-columns: 3rem 1fr;
		grid-template-areas: "icon link";
		height: 50px;
		align-items: center;
		justify-content: center;
	}

	.line {
		grid-area: line;
		background: var(--gray);
		height: 2px;
		width: 90%;
		margin: 0 auto;
	}

	.customize {
		grid-area: customize;
	}

	.link-icon {
		grid-area: icon;
	}

	.link {
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
</style>