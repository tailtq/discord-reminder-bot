import { ParserMangaFreak, ParserMangaPark, ParserTruyenTranhTuan } from '../../parsers';
import BaseService from '../../core/base_service';
import { NewChapter } from '../../entities/new_chapter';
import { MangaService } from '../index';

export default class MangaChapterService extends BaseService {
    constructor() {
        super('mangaChapter');
        this.mangaService = new MangaService();
    }

    /**
     * @param {string} website
     * @returns {Promise<Object[]>}
     */
    async getAndAddNewChapters(website = 'truyentranhtuan') {
        let mangaParser;

        switch (website) {
            case 'truyentranhtuan':
                mangaParser = new ParserTruyenTranhTuan('http://truyentranhtuan.com/');
                break;
            case 'mangafreak':
                mangaParser = new ParserMangaFreak('https://w12.mangafreak.net/');
                break;
            case 'mangapark':
                mangaParser = new ParserMangaPark('https://mangapark.net/');
                break;
        }
        const data = await mangaParser.parseHomePage();
        const newChapters = await this.analyzeNewChaptersData(data);

        return Promise.all(
            newChapters.map(chapter => super.create({
                data: {
                    mangaId: chapter.mangaId,
                    chapterNumber: chapter.chapterNumber,
                    chapterName: chapter.chapterName,
                    chapterLink: chapter.chapterLink,
                },
                include: {
                    manga: true,
                },
            })),
        );
    }

    /**
     * Comparing data for a particular site
     * @param {*} webData
     */
    async analyzeNewChaptersData(webData) {
        const newChapters = [];
        const manga = await this.mangaService.findMany({
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
        // compare crawled data and existing data in DB
        manga.forEach(({ id, name: mangaName, otherNames, chapters: allChapters }) => {
            otherNames = JSON.parse(otherNames);
            otherNames = otherNames.map((e) => e.toLowerCase());
            mangaName = mangaName.toLowerCase();
            allChapters = allChapters.map(chapter => chapter.chapterNumber);

            webData.forEach(({ mangaName: webName, chapterNumber, chapterLink }) => {
                webName = webName.toLowerCase();
                if (
                    (webName === mangaName || otherNames.indexOf(webName) >= 0)
                    && allChapters.indexOf(chapterNumber) === -1
                ) {
                    const newChapter = new NewChapter(id, chapterNumber, chapterLink);
                    newChapters.push(newChapter);
                }
            });
        });

        return newChapters;
    }
}
