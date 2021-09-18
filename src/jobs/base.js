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
        cron.schedule(this.CRON_JOB_PATTERN, this.handle.bind(this), {});
    }
}
