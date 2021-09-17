import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './discord.js';
import CheckTruyenTranhTuanCronJob from './jobs/manga/check_truyentranhtuan';

const discordConnector = new DiscordConnector();
const cronJobTemplates = [
    CheckTruyenTranhTuanCronJob,
];

discordConnector.init().then(async () => {
    cronJobTemplates.forEach((cronJobTemplate) => {
        const cronJob = new cronJobTemplate(discordConnector);
        cronJob.run();
    });
    // after discord initialization => run cron jobs + catch error logs => send mail + write to somewhere else
}).catch((error) => {
    console.error(error);
});
