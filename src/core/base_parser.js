import axios from 'axios';
import puppeteer from 'puppeteer';

export default class BaseParser {
    constructor(homePageUrl) {
        this.homePageUrl = homePageUrl;
    }

    /**
     * @returns {Promise<*[NewChapter]>}
     */
    async parseHomePage() {
        const htmlContent = await this.getHTMLHomePage();

        return this.parseHTMLHomePage(htmlContent);
    }

    /**
     * @returns {Promise[string]} HomePage html
     */
    async getHTMLHomePage() {
        return this.getHTMLContentByAxios(this.homePageUrl);
    }

    /**
     * @param {string} url
     * @returns {Promise<any>}
     */
    async getHTMLContentByAxios(url) {
        const response = await axios.get(url);
        return response.data;
    }

    /**
     * @param {string} url
     * @returns {Promise<string>}
     */
    async getHTMLContentByPuppeteer(url) {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en'
        });
        console.log(`Running Puppeteer`);
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
        await page.goto(url);
        const content = await page.content();
        await browser.close();
        console.log(`End Puppeteer`);

        return content;
    }

    /**
     * Re-implement this method for parsing and returning necessary data for comparison for a particular site
     * @param {*} htmlContent
     * @return []
     */
    parseHTMLHomePage(htmlContent) {
        throw new Error('Re-implement this method! ಠ╭╮ಠ');
    }
}
