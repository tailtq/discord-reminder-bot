import Cheerio from 'cheerio';

import BaseParser from '../core/base_parser';

const { default: $ } = Cheerio;

export default class ParserTruyenTranhTuan extends BaseParser {
    parseHTMLHomePage(htmlContent) {
        const root = $(htmlContent);
        const data = [];

        root.find('#story-list > .manga-focus').each((index, node) => {
            const mangaName = $(node).find('.manga > a').text().trim();
            const $linkTag = $(node).find('.chapter > a');
            const chapterText = $linkTag.text().split(' ')[1].trim();
            const chapterNumber = parseFloat(chapterText);
            const chapterLink = $linkTag.attr('href');

            data.push({ mangaName, chapterText, chapterNumber, chapterLink });
        });

        return data;
    }
}
