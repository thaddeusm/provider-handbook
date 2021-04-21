import Handbook from './Docs/Handbook.json';

import { navigatingResults, searchOpen, results, searchQuery, activeResult } from './stores.js';

let results_value;

const unsubscribeResults = results.subscribe(value => {
	results_value = value;
});

let search_query_value;

const unsubscribeSeachQuery = searchQuery.subscribe(value => {
	search_query_value = value;
});

let active_result_value;

const unsubscribeActiveResult = activeResult.subscribe(value => {
	active_result_value = value;
});

export const search = (term) => {
	term = term.toLowerCase().trim();

	let results = [];
	let includedSections = [];

	for (let i=0; i<Handbook.sections.length; i++) {
		let section = Handbook.sections[i];

		let sectionTitle = section[0].text;

		for (let j=0; j<section.length; j++) {
			let contentBlock = section[j];

			if (contentBlock.style.includes('heading')) {
				sectionTitle = contentBlock.text;
			}

			if (contentBlock.style.includes('list')) {
				for (let k=0; k<contentBlock.text.length; k++) {
					let listItem = contentBlock.text[k];

					if (listItem && listItem.toLowerCase().includes(term)) {
						let index = listItem.toLowerCase().indexOf(term);

						let itemLength = listItem.length;

						let textSample;

						if (itemLength > 200) {
							if (index > 80) {
								textSample = `...${listItem.slice(index - 60, index + 60)}...`;
							} else {
								textSample = `${listItem.slice(0, index + 60)}...`;
							}
						} else {
							textSample = listItem;
						}

						let regex = new RegExp(term, 'i');
						textSample = textSample.replace(regex, `<span class="bold-text">${term}</span>`);

						if (includedSections.indexOf(sectionTitle) == -1) {
							results.push({
								textSample: textSample,
								sectionTitle: sectionTitle
							});
							
							includedSections.push(sectionTitle)
						}
					}
				}
			} else {
				let contentItem = contentBlock.text;

				if (contentBlock.text && contentItem.toLowerCase().includes(term)) {
					let index = contentItem.toLowerCase().indexOf(term);

					let textLength = contentBlock.text.length;

					let textSample;

					if (textLength > 200) {
						if (index > 80) {
							textSample = `...${contentItem.slice(index - 60, index + 60)}...`;
						} else {
							textSample = `${contentItem.slice(0, index + 60)}...`;
						}
					} else {
						textSample = contentItem;
					}

					let regex = new RegExp(term, 'i');
					textSample = textSample.replace(regex, `<span class="bold-text">${term}</span>`);

					if (includedSections.indexOf(sectionTitle) == -1) {
						results.push({
							textSample: textSample,
							sectionTitle: sectionTitle
						});
						
						includedSections.push(sectionTitle)
					}
				}	
			}
		}
	}

	return results;
};

export const clearResults = () => {
	results.set([]);
	activeResult.set({
		index: 0,
		section: ''
	});
};

export const resetSearchQuery = () => {
	searchQuery.set('');
};

export const closeSearch = () => {
	searchOpen.set(false);
};

export const openSearch = () => {
	searchOpen.set(true);
};

export const closeResultNavigator = () => {
	navigatingResults.set(false);
};

export const openResultNavigator = () => {
	navigatingResults.set(true);
};

export const incrementActiveResult = () => {
	let newIndex = active_result_value.index + 1;
	let newSection = results_value[newIndex].sectionTitle.split(' ').join('');

	activeResult.set({
		index: newIndex,
		section: newSection
	});

	jumpToId(newSection);
};

export const decrementActiveResult = () => {
	let newIndex = active_result_value.index - 1;
	let newSection = results_value[newIndex].sectionTitle.split(' ').join('');

	activeResult.set({
		index: newIndex,
		section: newSection
	});

	jumpToId(newSection);
};