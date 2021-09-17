import Cheerio from 'cheerio';

import BaseParser from './base_parser.js';

const { default: $ } = Cheerio;

class ParserMangaFreak extends BaseParser {
    /**
     * @param {string} htmlContent
     * @returns {*[]}
     */
    parseHTMLHomePage(htmlContent) {
        const root = $(htmlContent);
        const data = [];

        root.find('.latest_list > .latest_item').each((index, node) => {
            const mangaName = $(node).find('.name').text().trim();
            const chapterText = $(node).find('.chapter_box a:first-child').text().split(' ')[1].trim();
            const chapterNumber = parseFloat(chapterText);
            data.push({ mangaName, chapterText, chapterNumber });
        });

        return data;
    }
}

export default ParserMangaFreak;
