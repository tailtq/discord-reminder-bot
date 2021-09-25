/* Example in Node.js ES6 using request-promise */
import dotenv from 'dotenv';

dotenv.config();

import axios from 'axios';
import FetchCoinPriceJob from './src/jobs/fetch_coin_price';
import DiscordConnector from './src/platforms/discord';

const test = (async () => {
    const discordConnector = new DiscordConnector();
    await discordConnector.init();

    const test = new FetchCoinPriceJob(discordConnector);
    const result = await test.handle();
    console.log(result);
})();
