import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './src/platforms/discord.js';
import { FetchCoinPriceJob, KeepAppActiveJob, MangaCheckingJob } from './src/jobs';
import { CoinService, MangaService } from './src/services';
import { seedMangaData, seedCoinData } from './prisma/seeds';

const discordConnector = new DiscordConnector();
// define jobs along with their parameters
const mangaJobTemplates = [
    [MangaCheckingJob, 'truyentranhtuan'],
    // [MangaCheckingJob, 'mangafreak'], // haven't passed the form yet
    [MangaCheckingJob, 'mangapark'],
];
const coinJobTemplates = [
    FetchCoinPriceJob,
];
const standardJobTemplates = [
    KeepAppActiveJob,
];

async function runConnectors() {
    console.log('Check data availability...');
    // check data availability and run connectors
    const mangaService = new MangaService();
    const coinService = new CoinService();
    // seed data if there is no data available
    if ((await mangaService.findMany()).length === 0) {
        await seedMangaData();
    }
    console.log('Sync manga list...');
    // sync manga list
    await Promise.all([
        mangaService.syncMangaList(),
        coinService.syncCoinList(),
    ]);
    // run connector
    console.log('Run connector...');
    await discordConnector.init();

    mangaJobTemplates.forEach(([cronJobTemplate, website]) => {
        const cronJob = new cronJobTemplate(website, discordConnector);
        cronJob.run();
    });
    coinJobTemplates.forEach((cronJobTemplate) => {
        const cronJob = new cronJobTemplate(discordConnector);
        cronJob.run();
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
