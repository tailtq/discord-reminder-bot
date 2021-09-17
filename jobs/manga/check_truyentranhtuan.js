import BaseCronJob from '../base';
import { REMINDER_ITEMS } from '../../constants';
import { MangaChapterService, ReminderService, UserService } from '../../services';

export default class CheckTruyenTranhTuanCronJob extends BaseCronJob {
    CRON_JOB_PATTERN = '* * * * * *';

    /**
     * @param {DiscordConnector} platformConnector
     */
    constructor(platformConnector) {
        super(platformConnector);
        this.mangaChapterService = new MangaChapterService();
        this.reminderService = new ReminderService();
        this.userService = new UserService();
    }

    /**
     * @returns {Promise<void>}
     */
    async handle() {
        const newChapters = await this.mangaChapterService.getAndAddNewChapters('truyentranhtuan');
        const users = await this.userService.findMany();

        if (newChapters.length > 0) {
            // get chapters with manga -> show relevant message
            const reminders = [];

            newChapters.forEach((chapter) => {
                users.forEach((user) => {
                    return reminders.push({
                        userId: user.id,
                        userPlatformId: user.platformId,
                        itemId: chapter.id,
                        itemType: REMINDER_ITEMS.mangaChapter,
                        platform: user.platform,
                        chapter,
                    });
                });
            });
            const requests = reminders.map(async (reminder) => {
                const { userPlatformId, chapter, ...reminderData } = reminder;
                const message = `Chapter ${chapter.chapterNumber} has been released. Check it out.`;
                const platformMessage = await this.platformConnector.publishEmbeddedMessage(
                    userPlatformId, `Manga Release - ${chapter.manga.name}`, message, 'https://google.com', chapter.manga.thumbnailUrl
                );
                reminderData.platformMessageId = platformMessage.id;
                reminderData.message = message;

                return this.reminderService.create({ data: reminderData });
            });
            await Promise.all(requests);
        }
    }
}
