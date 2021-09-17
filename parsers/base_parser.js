import axios from 'axios';
import Prisma from '@prisma/client';
import { NewChapter } from '../entities/new_chapter';

const { PrismaClient } = Prisma;

export default class BaseParser {
    constructor(homePageUrl) {
        this.homePageUrl = homePageUrl;
        this.prisma = new PrismaClient();
    }

    /**
     * @returns {Promise<*[NewChapter]>}
     */
    async parseHomePage() {
        const htmlContent = await this.getHTMLHomePage();
        const data = this.parseHTMLHomePage(htmlContent);
        const result = await this.analyzeHomePageData(data);

        return result;
    }

    /**
     * @returns {Promise[string]} HomePage html
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
     * @param {*} webData
     */
    async analyzeHomePageData(webData) {
        const newChapters = [];
        const manga = await this.prisma.manga.findMany({
            select: {
                id: true,
                name: true,
                otherNames: true,
                chapters: {
                    select: {
                        chapterNumber: true,
                    }
                }
            }
        });
        manga.forEach(({ id, name: mangaName, otherNames, chapters: allChapters }) => {
            otherNames = JSON.parse(otherNames);
            allChapters = allChapters.map(chapter => chapter.chapterNumber);

            webData.forEach(({ mangaName: webName, chapterNumber }) => {
                if (
                    (webName === mangaName || otherNames.indexOf(webName) >= 0) &&
                    allChapters.indexOf(chapterNumber) === -1
                ) {
                    const newChapter = new NewChapter(id, chapterNumber);
                    newChapters.push(newChapter);
                }
            });
        });
        return newChapters;
    }
}
