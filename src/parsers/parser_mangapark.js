import Cheerio from 'cheerio';

import BaseParser from './base_parser';

const { default: $ } = Cheerio;

export default class ParserMangaPark extends BaseParser {
    /**
     * @returns {Promise[string]} HomePage html
     */
    async getHTMLHomePage() {
        return this.getHTMLContentByPuppeteer(this.homePageUrl);
    }

    /**
     * @param {string} htmlContent
     * @returns {*[]}
     */
    parseHTMLHomePage(htmlContent) {
        const root = $(htmlContent);
        const data = [];

        root.find('#release-list > .item').each((index, node) => {
            const mangaName = $(node).find('a.fw-bold').text().trim();
            const chapterText = $(node).find('a:last').text().trim().replace('c', '');
            const chapterNumber = parseFloat(chapterText);

            data.push({ mangaName, chapterText, chapterNumber });
        });

        return data;
    }
}
