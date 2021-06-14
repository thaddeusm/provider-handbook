<script>
	import DownArrow from './../Graphics/Icons/DownArrow.svelte';
	import UpArrow from './../Graphics/Icons/UpArrow.svelte';

	export let sections;
	export let activeId;

	let openSubmenu = 0;

	$: {
		if (activeId && activeId.length > 1) {
			for (let i=0; i<sections.length; i++) {
				let primarySection = sections[i];
				let match = false;

				if (!match) {
					for (let j=0; j<primarySection.length; j++) {
						let secondarySection = primarySection[j];
						if (activeId == secondarySection.section.split(' ').join('')) {
							openSubmenu = i;
							match = true;
							break;
						}
					}
				} else {
					break;
				}
			}
		}
	}

	function handleJump(section) {
		jumpToId(section);

		setTimeout(() => {
			activeId = section;
		}, 20, section);
	}

	function toggleSub(headingIndex) {
		if (openSubmenu == headingIndex) {
			// openSubmenu = null;
		} else {
			openSubmenu = headingIndex;
		}
	}
</script>

<ul>
	{#each sections as handbookSection, i}
		{#each handbookSection as section, j}
			{#if section.style == 'heading'}
				<li class="heading">
					<a 
						class={activeId == section.text.split(' ').join('') ? 'active': 'inactive'}
						on:click={() => {handleJump(section.text.split(' ').join(''))}}
					>
						{section.text}
					</a>
					<button on:click={() => {toggleSub(i)}}>
						{#if openSubmenu == i}
							<!-- <UpArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} /> -->
						{:else}
							<DownArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
						{/if}
					</button>
				</li>
			{:else if section.style == 'subheading'}
				{#if openSubmenu == i || activeId == section.section}
					<li class="subheading">
						<a 
							class={activeId == section.text.split(' ').join('') ? 'active': 'inactive'}
							on:click={() => {handleJump(section.text.split(' ').join(''))}}
						>
							{section.section}
						</a>
					</li>
				{/if}
			{/if}
		{/each}
	{/each}
</ul>

<style>
	ul {
		list-style: none;
	}

	ul li {
		padding: 0 2rem;
		margin: .7rem 0;
		line-height: 1.5;
	}

	ul li:first-child {
		margin-top: 13rem;
	}

	ul li a {
		color: var(--white);
		font-size: 16px;
		cursor: pointer;
	}

	.heading {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		justify-content: center;
	}

	.heading button {
		text-align: right;
	}

	.subheading {
		margin-left: 1rem;
	}
</style>