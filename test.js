import MangaChapterService from './services/manga_chapter';
import DiscordConnector from './discord';
import { MessageAttachment } from 'discord.js';
import axios from 'axios';
import { UserService } from './services';

const discordConnector = new DiscordConnector();
const userService = new UserService();

userService.findMany().then((a) => {
    console.log(a);
})

// discordConnector.init().then(async () => {
//     const response = await axios.get('http://truyentranhtuan.com/wp-content/uploads/2019/03/tokyo%E5%8D%8Drevengers-200x304.jpg',  { responseType: 'arraybuffer' })
//     const buffer = Buffer.from(response.data, "utf-8")
//
//     const attachment = new MessageAttachment(buffer);
//
//     const description = `Chapter 1025 of One Piece has been released. Check it out.`;
//     discordConnector.publishEmbeddedMessage(
//         '480527832137728000', 'Manga Release', description, 'https://google.com', 'https://images.mangafreak.net/manga_images/one_piece.jpg'
//     );
// });

