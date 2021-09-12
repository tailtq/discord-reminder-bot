import axios from 'axios';
import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

export default class BaseParser {
    constructor(homePageUrl) {
        this.homePageUrl = homePageUrl;
        this.prisma = new PrismaClient();
    }

    async parseHomePage() {
        const htmlContent = await this.getHTMLHomePage();
        const data = this.parseHTMLHomePage(htmlContent);
        const result = await this.analyzeHomePageData(data);

        return result;
    }

    /**
     * 
     * @returns string HomePage html
     */
    async getHTMLHomePage() {
        const response = await axios.get(this.homePageUrl);

        return response.data;
    }
    /**
     * Re-implement this method for parsing and returning necessary data for comparison for a particular site
     * @param {*} htmlContent
     */
    parseHTMLHomePage(htmlContent) {
        throw new Error('Re-implement this method! ಠ╭╮ಠ');
    }

    /**
     * Comparing data for a particular site
     * @param {*} data 
     */
    analyzeHomePageData(data) {
        throw new Error('Re-implement this method! ಠ╭╮ಠ');
    }
}
