import BaseService from '../base';
import { MANGA_LIST } from '../../constants';

export default class MangaService extends BaseService {
    constructor() {
        super('manga');
    }

    /**
     * @returns {Promise<void>}
     */
    async syncMangaList() {
        for (let i = 0; i < MANGA_LIST.length; i += 1) {
            const manga = MANGA_LIST[i];
            const existingManga = await super.findUnique({
                where: {
                    name: manga.name
                },
            });

            if (!existingManga) {
                await super.create({ data: manga });
            }
        }
    }
}
