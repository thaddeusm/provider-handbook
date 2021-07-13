<script>
	import { router } from 'tinro';
	import { onMount } from 'svelte';

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

		if ($router.hash.length > 1) {
			activeId = router.hash;
		}
	});
</script>

<Expanded contentSource={SupplementalDocuments.documents} {activeId}>
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
			{:else if section.style == "ordered_list"}
				<ol>
					
				</ol>
			{:else if section.style == "unordered_list"}
				<ul>
					
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
</style>