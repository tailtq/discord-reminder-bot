import Cheerio from 'cheerio';

import BaseParser from '../core/base_parser';

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
            const $linkTag = $(node).find('.chapter_box a:first-child');
            const chapterText = $linkTag.text().split(' ')[1].trim();
            const chapterNumber = parseFloat(chapterText);
            const chapterLink = $linkTag.attr('href');

            data.push({ mangaName, chapterText, chapterNumber, chapterLink });
        });

        return data;
    }
}

export default ParserMangaFreak;
