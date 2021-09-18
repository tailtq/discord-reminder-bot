import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import DiscordConnector from './src/platforms/discord.js';
import { MangaCheckingJob } from './src/jobs';
import { MangaService } from './src/services';
import { seedData } from './prisma/seeds';

const discordConnector = new DiscordConnector();
const mangaJobTemplates = [
    [MangaCheckingJob, 'truyentranhtuan'],
    [MangaCheckingJob, 'mangafreak'],
];

async function runConnectors() {
    console.log('Check data availability and run connectors');
    // check data availability and run connectors
    const mangaService = new MangaService();

    if ((await mangaService.findMany()).length === 0) {
        await seedData();
    }

    discordConnector.init().then(async () => {
        mangaJobTemplates.forEach(([cronJobTemplate, website]) => {
            const cronJob = new cronJobTemplate(website, discordConnector);
            cronJob.run();
        });
        // after discord initialization => run cron jobs + catch error logs => send mail + write to somewhere else
    }).catch((error) => {
        console.error(error);
    });
}

runConnectors();

// ======== EXPRESS APP ========
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`Discord Reminder Bot is running at port ${port}`);
});
