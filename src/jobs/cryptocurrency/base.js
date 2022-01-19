import moment from 'moment';

import BaseCronJob from '../../core/base_cron_job';
import { REMINDER_ITEMS } from '../../constants';
import { PriceUpdateService, ReminderService, UserService } from '../../services';

/**
 * @deprecated This won't be maintained anymore
 */
export default class SendCoinPriceMessageJob extends BaseCronJob {
    CRON_JOB_PATTERN = process.env.FETCH_COIN_PRICE_CRON_PATTERN;

    /**
     * @param {DiscordConnector} platformConnector
     */
    constructor(platformConnector) {
        super();
        this.platformConnector = platformConnector;
        this.reminderService = new ReminderService();
        this.priceUpdateService = new PriceUpdateService();
        this.userService = new UserService();
    }

    /**
     * @param {Array} priceUpdates
     * @param {Array} users
     * @param {string} currentTime
     * @returns {Promise<void>}
     */
    async sendMessages(priceUpdates, users) {
        /**
         * Create message (like the format below)
         * Cryptocurrency Price at 10:01
         * - BTC      --- $42372.7144
         * - ETH      --- $2898.7117
         * - ADA      --- $2.2799
         * - DOGE     --- $0.2099
         * - SHIB     --- $0.000007307
         */
        const message = this.priceUpdateService.createPriceUpdateMessage(priceUpdates);
        const messages = await Promise.all(
            users.map((user) => this.platformConnector.publishEmbeddedMessage(
                user.platformId,
                `Cryptocurrency Price at ${this.getVietnameseTime(moment(priceUpdates[0].updatedTime).format('HH:mm'))}`,
                message,
                null,
                null,
            )),
        );
        // create one reminder to one user (itemId = 0)
        await Promise.all(
            users.map((user, index) => this.reminderService.create({
                data: {
                    userId: user.id,
                    itemId: 0,
                    itemType: REMINDER_ITEMS.coinPrices,
                    platform: user.platform,
                    platformMessageId: messages[index].id,
                    message: message,
                },
            })),
        );
    }
}
