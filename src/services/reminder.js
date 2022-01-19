import BaseService from '../core/base_service';
import { REMINDER_ITEMS } from '../constants';

export default class ReminderService extends BaseService {
    constructor() {
        super('reminder');
    }

    /**
     * @param {Array} newChapters
     * @param {Array} users
     * @returns {*[]}
     */
    changeChapterDataStructure(newChapters, users) {
        const reminders = [];

        newChapters.forEach((chapter) => {
            users.forEach((user) => {
                reminders.push({
                    userId: user.id,
                    userPlatformId: user.platformId,
                    itemId: chapter.id,
                    itemType: REMINDER_ITEMS.mangaChapter,
                    platform: user.platform,
                    chapter,
                });
            });
        });

        return reminders;
    }
}
