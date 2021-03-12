<script>
	import { onMount } from 'svelte';

	import Handbook from './../Docs/Handbook.json';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';
	import PreviewModal from './../Components/PreviewModal.svelte';

	let activeId;
	let showPreview = false;
	
	let previewSection;
	let previewURL;
	let previewDescription;

	function openPreview(sectionTitle, link, description) {
		showPreview = !showPreview;
		
		previewSection = sectionTitle;
		previewURL = link;
		previewDescription = description;
	}

	onMount(async () => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					activeId = entry.target.getAttribute('id');
				}
			});
		});

		document.querySelectorAll('div[id]').forEach((div) => {
			observer.observe(div);
		});
	});
</script>

<div class="container">
	<aside>
		<ul>
			{#each Handbook.sections as handbookSection, i}
				<li>
					<a class={activeId == handbookSection[0].content.split(' ').join('') ? 'active': ''} href="#/handbook#{handbookSection[0].content.split(' ').join('')}" tinro-ignore>
						{handbookSection[0].content}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section id="handbook">
		{#each Handbook.sections as handbookSection}
 			{#each handbookSection as section}
 				{#if section.style == "icon_subheading"}
 					<div class="icon-subheading" id="{handbookSection[0].content.split(' ').join('')}">
 						<h3>
 							{section.content}
 						</h3>
 						<button 
 							on:click={() => {openPreview(section.content.split(' ').join(''), section.link, section.interactive_description)}}
 						>
 							<InteractiveAvailable width={'2rem'} height={'2rem'} />
 						</button>
 					</div>
 				{:else if section.style == "subheading"}
 					<div id="{handbookSection[0].content.split(' ').join('')}">
 						<h3>
	 						{section.content}
	 					</h3>
 					</div>
 				{:else}
 					<p>{section.content}</p>
 				{/if}
 			{/each}
 		{/each}
	</section>
	<footer>
		<h6>sponsored by the U.S. Department of State</h6>
	</footer>
</div>

{#if showPreview}
	<PreviewModal>
		<div slot="body" class="modal-body">
			{#if previewSection}
				<img class="large-preview-image" src={`/PreviewImages/${previewSection}Large.png`} />
				<img class="small-preview-image" src={`/PreviewImages/${previewSection}Small.png`} />
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

		.large-preview-image {
			display: none!important;
		}

		.small-preview-image {
			width: 45%;
		}

		.handbook-content-list {
			padding: 0 35px 0 0;
		}
	}

	@media screen and (min-width: 1101px) {
		.container {
			grid-template-columns: 26rem 1fr;
		}

		#handbook {
			padding: 0 4rem;
		}

		.small-preview-image {
			display: none!important;
		}

		.handbook-content-list {
			padding: 0 5rem;
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
	}

	footer {
		grid-area: footer;
	}

	.large-preview-image {
		width: 50%;
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
</style>