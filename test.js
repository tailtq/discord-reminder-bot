import MangaChapterService from './services/manga_chapter';
import DiscordConnector from './discord';
import { MessageAttachment } from 'discord.js';
import axios from 'axios';

const discordConnector = new DiscordConnector();

discordConnector.init().then(async () => {
    const response = await axios.get('http://truyentranhtuan.com/wp-content/uploads/2019/03/tokyo%E5%8D%8Drevengers-200x304.jpg',  { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, "utf-8")

    const attachment = new MessageAttachment(buffer);

    discordConnector.publishMessage('480527832137728000', 'Oke', attachment);
});

