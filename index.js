import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './discord.js';
import { ParserTruyenTranhTuan } from './parsers/index.js';

const discordConnector = new DiscordConnector();
discordConnector.init().then(() => {
    const mangaParser = new ParserTruyenTranhTuan('http://truyentranhtuan.com/');

    mangaParser.parseHomePage().then(() => {
        discordConnector.publishMessage('480527832137728000', 'Hello friend');
    });
})
