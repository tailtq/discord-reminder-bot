import { Client, Intents, MessageEmbed } from 'discord.js';

const intents = [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
];

class DiscordConnector {
    MESSAGE_EMBEDDED_COLOR = '#0099ff';

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

    /**
     * @param {String} userId
     * @param {String} title
     * @param {String} description
     * @param {String} url
     * @param {String} thumbnail
     * @param {Array[Object]} fields
     * @returns {Promise<Message>}
     */
    async publishEmbeddedMessage(userId, title, description, url, thumbnail) {
        // Document: https://discordjs.guide/popular-topics/embeds.html#embed-preview
        const embeddedMessage = new MessageEmbed()
            .setColor(this.MESSAGE_EMBEDDED_COLOR)
            .setTitle(title)
            .setURL(url)
            .setDescription(description)
            .setThumbnail(thumbnail)
            .setFooter(`From ${process.env.APP_ENVIRONMENT.toUpperCase()}`);
        const user = await this.client.users.fetch(userId);

        return user.send({ embeds: [embeddedMessage] });
    }

    listenMessages() {
        this.client.on('messageCreate', async (message) => {
            if (message.author.bot) return;

            switch (message.content) {
                case 'help':
                    await this.publishMessage(message.author.id, 'No options available');
                    return;
            }
        });
    }
}

export default DiscordConnector;
