import { Client, Intents } from 'discord.js';

const intents = [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
];
console.log(process.env.DISCORD_TOKEN);

class DiscordConnector {
    constructor() {
        this.init();
    }

    init() {
        this.client = new Client({ intents, partials: ['CHANNEL'] });

        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
            // client.users.fetch(USER_ID).then((user) => {
            //     console.log(user.send('I\'m online'))
            // });
        });

        this.client.login(process.env.DISCORD_TOKEN);
    }

    listenMessages() {
        this.client.on('messageCreate', (message) => {
            if (message.author.bot) return;
            
            // Message Created Listener
            console.log(message);
            // message.author.send('Hello there');
        });
        
    }
}

export default DiscordConnector;
