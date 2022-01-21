// ======== EXPRESS APP ========
import express from 'express';
import fs from 'fs';

import './run_jobs';

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
