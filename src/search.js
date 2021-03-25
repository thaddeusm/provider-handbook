import Handbook from './Docs/Handbook.json';

export const search = (term) => {
	let results = [];

	for (let i=0; i<Handbook.sections.length; i++) {
		let section = Handbook.sections[i];

		let sectionTitle = section[0].content;

		for (let j=0; j<section.length; j++) {
			let contentBlock = section[j];

			if (contentBlock.style.includes('heading')) {
				sectionTitle = contentBlock.content;
			}

			if (contentBlock.style.includes('list')) {
				for (let k=0; k<contentBlock.content.length; k++) {
					let listItem = contentBlock.content[k].toLowerCase();

					if (listItem && listItem.toLowerCase().includes(term)) {
						let index = listItem.toLowerCase().indexOf(term);

						let textSample;

						if (listItem.length > 100) {
							textSample = `...${listItem.slice(index - 25, index + 25)}...`;
						} else {
							textSample = listItem;
						}

						let regex = new RegExp(term, 'i');
						textSample = textSample.replace(regex, `<strong>${term}</strong>`);

						results.push({
							textSample: textSample.toLowerCase(),
							sectionTitle: sectionTitle
						});
					}
				}
			} else {
				if (contentBlock.content && contentBlock.content.toLowerCase().includes(term)) {
					let index = contentBlock.content.toLowerCase().indexOf(term);

					let textSample;

					if (contentBlock.content.length > 100) {
						textSample = `...${contentBlock.content.slice(index - 25, index + 25)}...`;
					} else {
						textSample = contentBlock.contentBlock;
					}

					let regex = new RegExp(term, 'i');
					textSample = textSample.replace(regex, `<strong>${term}</strong>`);

					results.push({
						textSample: textSample.toLowerCase(),
						sectionTitle: sectionTitle
					});
				}	
			}
		}
	}

	return results;
};