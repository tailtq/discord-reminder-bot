import { CoinMarketCapService, UserService } from '../../services';
import SendCoinPriceMessageJob from './base';

export default class GetLatestPriceJob extends SendCoinPriceMessageJob {
    CRON_JOB_PATTERN = process.env.FETCH_COIN_PRICE_CRON_PATTERN;

    /**
     * @param {DiscordConnector} platformConnector
     */
    constructor(platformConnector) {
        super(platformConnector);
        this.coinMarketCapService = new CoinMarketCapService();
        this.userService = new UserService();
    }

    /**
     * @param {string} platformUserId
     * @returns {Promise<void>}
     */
    async handle(platformUserId) {
        const latestPriceUpdates = await this.priceUpdateService.groupBy({
            by: ['coinId'],
            _max: {
                id: true,
            },
        });
        const priceUpdates = await this.priceUpdateService.findMany({
            where: {
                id: { in: latestPriceUpdates.map(e => e._max.id) },
            },
            include: {
                coin: true,
                conversions: true,
            },
        })
        const user = await this.userService.findFirst({
            where: {
                platformId: platformUserId,
            }
        });
        await this.sendMessages(priceUpdates, [user]);
    }
}
