import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './discord.js';
import { MangaChapterService, ReminderService, UserService } from './services';
import { REMINDER_ITEMS } from './constants';

const discordConnector = new DiscordConnector();
const mangaChapterService = new MangaChapterService();
const reminderService = new ReminderService();
const userService = new UserService();

discordConnector.init().then(async () => {
    const newChapters = await mangaChapterService.getAndAddNewChapters('truyentranhtuan');
    const users = await userService.findMany();

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
            const message = `
                Chapter ${chapter.chapterNumber} of ${chapter.manga.name} has been released. Check it out.
            `;
            const platformMessage = await discordConnector.publishMessage(
                userPlatformId,
                message,
                {
                    files: [chapter.manga.thumbnailUrl],
                },
            );
            reminderData.platformMessageId = platformMessage.id;
            reminderData.message = message;

            return reminderService.create({ data: reminderData });
        });
        await Promise.all(requests);
    }
    // after discord initialization => run cron jobs + catch error logs => send mail + write to somewhere else
}).catch((error) => {
    console.error(error);
});
