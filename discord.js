import { Client, Intents } from 'discord.js';

const intents = [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
];

class DiscordConnector {
    async init() {
        this.client = new Client({ intents, partials: ['CHANNEL'] });
        await this.client.login(process.env.DISCORD_TOKEN);

        if (this.client.isReady()) {
            console.log(`Logged in as ${this.client.user.tag}!`);
        }
    }

    async publishMessage(userId, message, additionalData = {}) {
        const user = await this.client.users.fetch(userId);

        return user.send({ content: message, ...additionalData });
    }

    listenMessages() {
        this.client.on('messageCreate', (message) => {
            if (message.author.bot) return;

            console.log(message);
        });
    }
}

export default DiscordConnector;
