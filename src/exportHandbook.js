import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from './vfs_fonts_montserrat';
import download from 'downloadjs';

import Handbook from './Docs/Handbook.json';
import { illustrations } from './inlineIllustrations.js';

async function formatDate() {
	let today = new Date().toString();

	let arr = today.split(' ');
	return `${arr[1]}. ${arr[2]}, ${arr[3]}`;
}

export const exportPDF = async function(doc) {
	pdfMake.vfs = pdfFonts;
	pdfMake.fonts = {
		Montserrat: {
		    normal: 'MontserratMedium.ttf',
            bold: 'MontserratBold.ttf',
            italics: 'MontserratMedium.ttf',
            bolditalics: 'MontserratBold.ttf'
		}
	};

	let today = await formatDate();

	let flattened = [].concat(...Handbook.sections);

	let content = flattened.map((section) => {
		if (!section.style.includes('external')) {
			if (section.style.includes('list')) {
				if (section.style == 'ordered_list') {
					return {ol: section.text.map((item) => {return {text: item, style: 'paragraph'}}), style: 'list'};
				} else {
					return {ul: section.text.map((item) => {return {text: item, style: 'paragraph'}}), style: 'list'};
				}
			} else {
				if (section.style == 'subheading') {
					return {text: section.text.toUpperCase(), style: section.style};
				} else if (section.style == 'graphic') {
					return {svg: illustrations[section.title], width: 400, alignment: 'center', margin: [0, 10, 0, 10]};
				} else {
					return {text: section.text, style: section.style};	
				}
			}
		}
	}).filter((item) => item !== undefined);

	console.log(content)

	let docDefinition = {
		pageSize: 'A4',
		pageMargins: 72,
		info: {
			title: 'Test',
			author: 'Access',
			producer: 'Thaddeus Mccleary'
		},
		content: [
			{svg: illustrations['Access Logo'], width: 200, alignment: 'center', margin: [0, 0, 0, 130]},
			{text: 'Provider Handbook', style: 'title'},
			{text: today, style: 'paragraph', alignment: 'center', margin: [0, 180, 0, 120]},
			{text: 'Sponsored by the U.S. Department of State', style: 'caption'},
			{svg: illustrations['DOS Seal'], width: 90, alignment: 'center', margin: [0, 30, 0, 0], pageBreak: 'after'},
			...content
		],
		header: function(currentPage, pageCount) {
			return {
				columns: [
					{ 
						text: '', 
						width: '90%' 
					},
					{ 
						text: currentPage, 
						style: 'pageNumber',
						width: '10%' 
					}
				],
				margin: [72, 24]
			};
		},
		styles: {
			pageNumber: {
				font: 'Montserrat',
				fontSize: 11,
				alignment: 'right'
			},
			title: {
				font: 'Montserrat',
				fontSize: 32,
				bold: true,
				alignment: 'center',
				lineHeight: 1,
				color: '#002D62'
			},
			paragraph: {
				font: 'Montserrat',
				fontSize: 11,
				alignment: 'left',
				lineHeight: 1.5,
				margin: [0, 0, 0, 10]
			},
			caption: {
				font: 'Montserrat',
				fontSize: 9,
				bold: true,
				alignment: 'center',
				lineHeight: 1.1
			},
			heading: {
				font: 'Montserrat',
				fontSize: 32,
				bold: true,
				alignment: 'left',
				lineHeight: 1,
				margin: [0, 0, 0, 10],
				color: '#002D62'
			},
			subheading: {
				font: 'Montserrat',
				fontSize: 21,
				bold: true,
				alignment: 'left',
				lineHeight: 1.5,
				color: '#D11242',
				margin: [0, 20, 0, 0]
			},
			list: {
				font: 'Montserrat',
				fontSize: 11,
				alignment: 'left',
				lineHeight: 1.5
			}
		}
	}

	pdfMake.createPdf(docDefinition).download('Handbook.pdf');
}