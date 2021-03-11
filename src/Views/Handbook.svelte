<script>
	import { onMount } from 'svelte';

	import Handbook from './../Docs/Handbook.json';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';

	let start;
	let end;

	let activeId;

	$: {
		console.log('start is ', start);
		console.log('end is ', end);
	}

	function openModal() {
		console.log('open the modal');
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
 						<button on:click={openModal}>
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

<style>
	@media screen and (max-width: 450px) {
		.container {
			grid-template-columns: 15px 1fr;
		}

		aside {
			display: none;
		}

		.handbook-content-list {
			padding: 0 15px 0 0;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		.container {
			grid-template-columns: 35px 1fr;
		}

		aside {
			display: none;
		}

		.handbook-content-list {
			padding: 0 35px 0 0;
		}
	}

	@media screen and (min-width: 801px) {
		.container {
			grid-template-columns: 26rem 1fr;
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
		padding: 0 4rem;
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
</style>