import Cheerio from 'cheerio';

import BaseParser from '../core/base_parser';

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
            const $linkTag = $(node).find('a:last');
            const chapterText = $linkTag.text().trim().replace('c', '');
            const chapterNumber = parseFloat(chapterText);
            const chapterLink = `https://mangapark.net${$linkTag.attr('href')}`;

            data.push({ mangaName, chapterText, chapterNumber, chapterLink });
        });

        return data;
    }
}
