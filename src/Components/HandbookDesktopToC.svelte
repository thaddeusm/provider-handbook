<script>
	export let sections;
	export let activeId;

	function handleJump(section) {
		jumpToId(section);

		setTimeout(() => {
			activeId = section;
		}, 20, section);
	}
</script>

<ul>
	{#each sections as handbookSection, i}
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

<style>
	ul {
		list-style: none;
	}

	ul li {
		padding: 0 3rem;
		margin: 1rem 0;
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

	.subheading {
		margin-left: 1rem;
	}
</style>