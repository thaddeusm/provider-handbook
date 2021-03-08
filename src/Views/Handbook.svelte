<script>
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import Handbook from './../Docs/Handbook.json';
	import InteractiveAvailable from './../Graphics/Icons/InteractiveAvailable.svelte';

	let start;
	let end;

	$: {
		console.log('start is ', start);
		console.log('end is ', end);
	}

	function openModal() {
		console.log('open the modal');
	}
</script>

<div class="container">
	<aside>
		<ul>
			{#each Handbook.sections as handbookSection, i}
				<li>
					<a class={start == i ? 'active': ''} href="#/handbook#{handbookSection[0].content.split(' ').join('')}" tinro-ignore>
						{handbookSection[0].content}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section id="handbook">
		<VirtualList items={Handbook.sections} let:item bind:start bind:end>
			<div id="#{item[0].content.split(' ').join('')}" class="handbook-content-list">
				{#each item as section}
					{#if section.style == "icon_subheading"}
						<div class="icon-subheading">
							<h3>
								{section.content}
							</h3>
							<button on:click={openModal}>
								<InteractiveAvailable width={'2rem'} height={'2rem'} />
							</button>
						</div>
					{:else if section.style == "subheading"}
						<h3>{section.content}</h3>
					{:else}
						<p>{section.content}</p>
					{/if}
				{/each}
			</div>
		</VirtualList>
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
			grid-template-columns: 28rem 1fr;
		}

		.handbook-content-list {
			padding: 0 5rem;
		}
	}

	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 73vh 100px;
		grid-template-areas: 
			"links handbook ."
			"links footer .";
	}

	#handbook {
		grid-area: handbook;
		margin: 0 auto;
	}

	aside {
		background: var(--brand-dark);
		margin-top: -65px;
		padding-bottom: 65px;
		grid-area: links;
		z-index: 1;
		height: 100%;
	}

	aside ul {

	}

	aside ul li {
		padding: 0 3rem;
		margin: 3rem 0;
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