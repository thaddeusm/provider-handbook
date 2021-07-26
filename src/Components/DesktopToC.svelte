<script>
	import DownArrow from './../Icons/DownArrow.svelte';
	import UpArrow from './../Icons/UpArrow.svelte';

	export let sections;
	export let activeId;
	export let path;

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
		jumpToId(section, path);

		setTimeout(() => {
			activeId = section;
		}, 20, section);
	}

	function toggleSub(headingIndex) {
		if (openSubmenu !== headingIndex) {
			openSubmenu = headingIndex;
		}
	}

	function includesSubheadings(handbookSection) {
		let test = false;

		for (let i=0; i<handbookSection.length; i++) {
			let section = handbookSection[i];

			if (section.style == 'subheading') {
				test = true;
				break;
			}
		}

		return test;
	}
</script>

<ul>
	{#each sections as section, i}
		{#each section as subSection, j}
			{#if subSection.style == 'heading'}
				<li class="heading">
					<button 
						class={activeId == subSection.text.split(' ').join('') ? 'active': 'inactive'}
						on:click={() => {handleJump(subSection.text.split(' ').join(''))}}
					>
						{subSection.text}
					</button>
					{#if includesSubheadings(section)}
						<button on:click={() => {toggleSub(i)}} class="arrow" aria-label="Toggle Secondary List Display">
							{#if openSubmenu !== i}
								<DownArrow color={'#ffffff'} width={'1.2rem'} height={'1.2rem'} />
							{/if}
						</button>
					{/if}
				</li>
			{:else if subSection.style == 'subheading'}
				{#if openSubmenu == i || activeId == subSection.section}
					<li class="subheading">
						<button 
							class={activeId == subSection.text.split(' ').join('') ? 'active': 'inactive'}
							on:click={() => {handleJump(subSection.text.split(' ').join(''))}}
						>
							{subSection.section}
						</button>
					</li>
				{/if}
			{/if}
		{/each}
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		text-align: left;
	}

	ul li {
		padding: 0 2rem;
		margin: .5rem 0;
	}

	ul li:first-child {
		margin-top: 13rem;
	}

	ul li button {
		color: var(--white);
		font-size: 16px;
		cursor: pointer;
		text-align: left;
	}

	.heading {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		justify-content: center;
		text-align: left;
	}

	.arrow {
		text-align: right;
	}

	.subheading {
		margin-left: .5rem;
	}
</style>