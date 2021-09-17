import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './discord.js';
import { MangaCheckingJob } from './jobs';

const discordConnector = new DiscordConnector();
const mangaJobTemplates = [
    [MangaCheckingJob, 'truyentranhtuan'],
    [MangaCheckingJob, 'mangafreak'],
];

discordConnector.init().then(async () => {
    mangaJobTemplates.forEach(([cronJobTemplate, website]) => {
        const cronJob = new cronJobTemplate(website, discordConnector);
        cronJob.run();
    });
    // after discord initialization => run cron jobs + catch error logs => send mail + write to somewhere else
}).catch((error) => {
    console.error(error);
});
