{#each Handbook.sections as handbookSection, area}
 			{#each handbookSection as section, index}
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
 						{#each section.text as item, listItemNumber}
 							{@html textWithMarkup('li', item, section, area, index, listItemNumber, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
 						{/each}
 					</ol>
 				{:else if section.style == "unordered_list"}
 					<ul>
 						{#each section.text as item, listItemNumber}
 							{@html textWithMarkup('li', item, section, area, index, listItemNumber, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
 						{/each}
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
 					{@html textWithMarkup('p', section.text, section, area, index, null, activeId == section.section.split(' ').join(''), $activeResult == section.section.split(' ').join(''), $navigatingResults)}
 				{/if}
 			{/each}
 		{/each}