import axios from 'axios';
import BaseCronJob from './base';

export default class KeepAppActiveJob extends BaseCronJob {
    CRON_JOB_PATTERN = process.env.KEEP_APP_ALIVE_PATTERN;

    constructor() {
        super();
    }

    async handle() {
        const res = await axios.get('https://tailtq-reminder.herokuapp.com');
        console.log(res.data);
    }
}
