import fs from 'fs';
import cron from 'node-cron';


export default class BaseCronJob {
    CRON_JOB_PATTERN = '30 * * * * *';

    /**
     * Re-implement this method for running cron job
     */
    handle() {
        throw new Error('Re-implement this method! ಠ╭╮ಠ');
    }

    run() {
        let { handle } = this;
        handle = handle.bind(this);

        cron.schedule(this.CRON_JOB_PATTERN, async function () {
            try {
                await handle();
            } catch (e) {
                fs.appendFileSync('logs/jobs.txt', `${e.stack}\n`);
            }
        }, { encoding: 'utf8' });
    }
}
