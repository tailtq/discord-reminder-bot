import { COIN_REMINDING_TIME } from '../../constants';
import { CoinMarketCapService, CoinService, UserService } from '../../services';
import SendCoinPriceMessageJob from './base';

export default class FetchCoinPriceJob extends SendCoinPriceMessageJob {
    CRON_JOB_PATTERN = process.env.FETCH_COIN_PRICE_CRON_PATTERN;

    /**
     * @param {DiscordConnector} platformConnector
     */
    constructor(platformConnector) {
        super(platformConnector);
        this.coinMarketCapService = new CoinMarketCapService();
        this.coinService = new CoinService();
        this.userService = new UserService();
    }

    /**
     * @returns {Promise<void>}
     */
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
        const currentTime = this.getVietnameseTime();
        console.log('FetchCoinPriceJob', currentTime);

        if (COIN_REMINDING_TIME.indexOf(currentTime) >= 0) {
            const users = await this.userService.findMany();
            await this.sendMessages(priceUpdates, users);
        }
    }
}
