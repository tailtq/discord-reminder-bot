import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './src/platforms/discord';
import { KeepAppActiveJob, CheckMangaJob, ManageTodoListJob } from './src/jobs';
import { MangaService } from './src/services';

const discordConnector = new DiscordConnector();
// define jobs along with their parameters
const mangaJobTemplates = [
  [CheckMangaJob, 'truyentranhtuan'],
  [CheckMangaJob, 'mangapark'],
];
const standardJobTemplates = [
  ManageTodoListJob,
];
const appJobTemplates = [
  KeepAppActiveJob,
];

async function runConnectors() {
  console.log('Check data availability...');
  // check data availability and run connectors
  const mangaService = new MangaService();
  // sync manga list
  console.log('Sync manga list...');
  await Promise.all([
    mangaService.syncMangaList(),
  ]);
  // run connector
  console.log('Run connector...');
  await discordConnector.init();
  discordConnector.listenMessages();

  mangaJobTemplates.forEach(([cronJobTemplate, website]) => {
    const cronJob = new cronJobTemplate(website, discordConnector);
    cronJob.run();
  });
  standardJobTemplates.forEach((cronJobTemplate) => {
    const cronJob = new cronJobTemplate(discordConnector);
    cronJob.run();
  });
}

async function runStandardJobs() {
  appJobTemplates.forEach(jobTemplate => {
    const cronJob = new jobTemplate();
    cronJob.run();
  });
}

runStandardJobs();
runConnectors();
