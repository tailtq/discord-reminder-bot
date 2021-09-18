import Cheerio from 'cheerio';

import BaseParser from './base_parser';

const { default: $ } = Cheerio;

export default class ParserTruyenTranhTuan extends BaseParser {
    parseHTMLHomePage(htmlContent) {
        const root = $(htmlContent);
        const data = [];

        root.find('#story-list > .manga-focus').each((index, node) => {
            const mangaName = $(node).find('.manga > a').text().trim();
            const chapterText = $(node).find('.chapter > a').text().split(' ')[1].trim();
            const chapterNumber = parseFloat(chapterText);
            data.push({ mangaName, chapterText, chapterNumber });
        });

        return data;
    }
}
