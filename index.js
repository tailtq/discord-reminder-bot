import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import DiscordConnector from './discord.js';
import { MangaCheckingJob } from './src/jobs';

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

// ======== EXPRESS APP ========
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`Discord Reminder Bot is running at port ${port}`);
});
