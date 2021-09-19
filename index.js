import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './src/platforms/discord.js';
import { KeepAppActiveJob, MangaCheckingJob } from './src/jobs';
import { MangaService } from './src/services';
import { seedData } from './prisma/seeds';

const discordConnector = new DiscordConnector();
// define jobs along with their parameters
const mangaJobTemplates = [
    [MangaCheckingJob, 'truyentranhtuan'],
    // [MangaCheckingJob, 'mangafreak'], // haven't passed the form yet
    [MangaCheckingJob, 'mangapark'],
];
const standardJobTemplates = [
    KeepAppActiveJob,
];

async function runConnectors() {
    console.log('Check data availability...');
    // check data availability and run connectors
    const mangaService = new MangaService();
    // seed data if there is no data available
    if ((await mangaService.findMany()).length === 0) {
        await seedData();
    }
    console.log('Sync manga list...');
    // sync manga list
    await mangaService.syncMangaList();
    // run connector
    console.log('Run connector...');
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

async function runStandardJobs() {
    standardJobTemplates.forEach(jobTemplate => {
        const cronJob = new jobTemplate();
        cronJob.run();
    });
}

runStandardJobs();
runConnectors();

// ======== EXPRESS APP ========
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.get('/logs', (req, res) => {
    let logs = '';

    if (fs.existsSync('logs/jobs.txt')) {
        logs = fs.readFileSync('logs/jobs.txt', { encoding: 'utf-8' });
    }
    res.set('Content-Type', 'text/plain');
    res.send(logs);
});

app.listen(port, () => {
    console.log(`Discord Reminder Bot is running at port ${port}`);
});
