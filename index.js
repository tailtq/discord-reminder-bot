import dotenv from 'dotenv';

dotenv.config();

import DiscordConnector from './discord.js';
import { ParserTruyenTranhTuan } from './parsers/index.js';

const discordConnector = new DiscordConnector();
const mangaParser = new ParserTruyenTranhTuan('http://truyentranhtuan.com/');

mangaParser.parseHomePage().then(() => {
    console.log('ABCD');
});
