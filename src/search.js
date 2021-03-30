import Handbook from './Docs/Handbook.json';

export const search = (term) => {
	term = term.toLowerCase().trim();

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
					let listItem = contentBlock.content[k];

					if (listItem && listItem.toLowerCase().includes(term)) {
						let index = listItem.toLowerCase().indexOf(term);

						let itemLength = listItem.length;

						let textSample;

						if (itemLength > 150) {
							if (index > 60) {
								textSample = `...${listItem.slice(index - 50, index + 50)}...`;
							} else {
								textSample = `${listItem.slice(0, index + 50)}...`;
							}
						} else {
							textSample = listItem;
						}

						let regex = new RegExp(term, 'i');
						textSample = textSample.replace(regex, `<strong>${term}</strong>`);

						results.push({
							textSample: textSample,
							sectionTitle: sectionTitle
						});
					}
				}
			} else {
				let contentItem = contentBlock.content;

				if (contentBlock.content && contentItem.toLowerCase().includes(term)) {
					let index = contentItem.toLowerCase().indexOf(term);

					let textLength = contentBlock.content.length;

					let textSample;

					if (textLength > 150) {
						if (index > 60) {
							textSample = `...${contentItem.slice(index - 50, index + 50)}...`;
						} else {
							textSample = `${contentItem.slice(0, index + 50)}...`;
						}
					} else {
						textSample = contentItem;
					}

					let regex = new RegExp(term, 'i');
					textSample = textSample.replace(regex, `<strong>${term}</strong>`);

					results.push({
						textSample: textSample,
						sectionTitle: sectionTitle
					});
				}	
			}
		}
	}

	return results;
};