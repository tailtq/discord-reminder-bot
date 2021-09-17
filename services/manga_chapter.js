import { ParserTruyenTranhTuan } from '../parsers';
import BaseService from './base';

export default class MangaChapterService extends BaseService {
    constructor() {
        super('mangaChapter');
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
        }
        const newChapters = await mangaParser.parseHomePage();

        return Promise.all(
            newChapters.map(chapter => super.create({
                data: {
                    mangaId: chapter.mangaId,
                    chapterNumber: chapter.chapterNumber,
                    chapterName: chapter.chapterName,
                },
                include: {
                    manga: true,
                },
            })),
        );
    }
}
