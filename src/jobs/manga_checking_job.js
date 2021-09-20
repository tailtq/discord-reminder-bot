import BaseCronJob from './base';
import { MangaChapterService, ReminderService, UserService } from '../services';

export default class MangaCheckingJob extends BaseCronJob {
    CRON_JOB_PATTERN = process.env.MANGA_CRON_PATTERN;

    /**
     * @param {string} website
     * @param {DiscordConnector} platformConnector
     */
    constructor(website, platformConnector) {
        super();
        this.website = website;
        this.platformConnector = platformConnector;
        this.mangaChapterService = new MangaChapterService();
        this.reminderService = new ReminderService();
        this.userService = new UserService();
    }

    /**
     * @returns {Promise<void>}
     */
    async handle() {
        const newChapters = await this.mangaChapterService.getAndAddNewChapters(this.website);
        const users = await this.userService.findMany();

        if (newChapters.length > 0) {
            // get chapters with manga -> show relevant message
            const reminders = this.reminderService.formReminderData(newChapters, users);
            const requests = reminders.map(async (reminder) => {
                const { userPlatformId, chapter, ...reminderData } = reminder;
                const message = `Chapter ${chapter.chapterNumber} has been released. Check it out.`;
                const platformMessage = await this.platformConnector.publishEmbeddedMessage(
                    userPlatformId, `Manga Release - ${chapter.manga.name}`, message, chapter.chapterLink, chapter.manga.thumbnailUrl
                );
                reminderData.platformMessageId = platformMessage.id;
                reminderData.message = message;

                return this.reminderService.create({ data: reminderData });
            });
            await Promise.all(requests);
        }
    }
}
