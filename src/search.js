import Handbook from './Docs/Handbook.json';

export const search = (term) => {
	term = term.toLowerCase().trim();

	let results = [];
	let includedSections = [];

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
				let contentItem = contentBlock.content;

				if (contentBlock.content && contentItem.toLowerCase().includes(term)) {
					let index = contentItem.toLowerCase().indexOf(term);

					let textLength = contentBlock.content.length;

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