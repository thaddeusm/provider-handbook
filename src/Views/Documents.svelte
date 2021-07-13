<script>
	import { router } from 'tinro';

	import { onMount } from 'svelte';
	export let meta;

	import Expanded from './../ViewTemplates/Expanded.svelte';
	import InteractiveAvailable from './../Icons/InteractiveAvailable.svelte';
	import ResourceAvailable from './../Icons/ResourceAvailable.svelte';
	import Illustration from './../Components/IllustrationContainer.svelte';

	import SupplementalDocuments from './../Docs/SupplementalDocuments.json';

	let activeId = 'Documents';

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

		if (meta.length > 1) {
			activeId = meta.hash;
		}
	});
</script>

<Expanded contentSource={SupplementalDocuments.documents} {activeId} path={meta.match}>
	{#each SupplementalDocuments.documents as documentSection}
		{#each documentSection as section}
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
					<button class="action-button-small customize">
						customize
					</button>
				</p>
			{:else}
				<p>
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
		
	}

	@media screen and (min-width: 451px) and (max-width: 1100px) {
		
	}

	@media screen and (min-width: 1101px) {
		
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

	[id]::before { 
		display: inline-block; 
		content: " "; 
		margin-top: -300px; 
		height: 300px; 
		visibility: hidden; 
		pointer-events: none;
	}

	.customizable {
		grid-template-areas: "icon link customize";
		grid-template-columns: 3rem 1fr auto;
	}

	p {
		display: grid;
		grid-template-columns: 3rem auto 1fr;
		grid-template-areas: "icon link .";
		height: 50px;
		align-items: center;
		justify-content: center;
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