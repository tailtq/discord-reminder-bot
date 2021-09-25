import moment from 'moment';

import BaseCronJob from './base';
import { CoinMarketCapService, CoinService, PriceUpdateService, ReminderService, UserService } from '../services';
import { REMINDER_ITEMS } from '../constants';

export default class FetchCoinPriceJob extends BaseCronJob {
    CRON_JOB_PATTERN = process.env.FETCH_COIN_PRICE_CRON_PATTERN;

    /**
     * @param {DiscordConnector} platformConnector
     */
    constructor(platformConnector) {
        super();
        this.platformConnector = platformConnector;
        this.coinMarketCapService = new CoinMarketCapService();
        this.coinService = new CoinService();
        this.reminderService = new ReminderService();
        this.priceUpdateService = new PriceUpdateService();
        this.userService = new UserService();
    }

    async handle() {
        let { data } = await this.coinMarketCapService.getPriceList();
        // map coin list to key-value format for easier accessing
        const coins = Object.fromEntries(
            (await this.coinService.findMany()).map((coin) => [coin.symbol, coin])
        );
        // map price updates with coins inside database to create relationship
        data = this.coinMarketCapService.mapCoinsToRealTimePrice(coins, data);
        // insert priceUpdates and their price of conversion to database
        const promises = this.coinMarketCapService.transformToDBFormat(data).map(priceUpdate => (
            this.priceUpdateService.create(priceUpdate)
        ));
        const priceUpdates = await Promise.all(promises);
        // send notification to discord
        const currentTime = moment().format('HH:mm');

        if (['07:30', '13:00', '18:00', '22:00'].indexOf(currentTime) >= 0) {
            await this.sendMessages(priceUpdates);
        }
    }

    async sendMessages(priceUpdates) {
        const users = await this.userService.findMany();
        const currentTime = moment().format('HH:mm');

        /**
         * Create message (like the format below)
         * Today at 10:01
         - BTC      --- $42372.7144
         - ETH      --- $2898.7117
         - ADA      --- $2.2799
         - DOGE     --- $0.2099
         - SHIB     --- $0.000007307
         */
        let message = `**---\nToday at ${currentTime}**`;
        message += '\n' + priceUpdates.map(({ coin, conversions }) => {
            const { price } = conversions[0];
            let priceString;

            if (price >= 1) {
                priceString = (price).toFixed(4);
            } else {
                const zeroDecimals = -Math.floor(Math.log10(price) + 1);
                priceString = (price).toFixed(zeroDecimals + 4);
            }
            return `- **${coin.symbol.padEnd(8, ' ')} ---** $${priceString}`;
        }).join('\n');

        const notifications = await Promise.all(
            users.map((user) => this.platformConnector.publishMessage(user.platformId, message))
        );
        // create one reminder to one user (itemId = 0)
        await Promise.all(
            users.map((user, index) => this.reminderService.create({
                data: {
                    userId: user.id,
                    itemId: 0,
                    itemType: REMINDER_ITEMS.coinPrices,
                    platform: user.platform,
                    platformMessageId: notifications[index].id,
                    message: message,
                },
            })),
        );
    }
}
