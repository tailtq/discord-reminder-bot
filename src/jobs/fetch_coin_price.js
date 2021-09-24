import BaseCronJob from './base';
import CoinMarketCapService from '../services/coin/coin_market_cap';

export default class FetchCoinPriceJob extends BaseCronJob {
    CRON_JOB_PATTERN = process.env.FETCH_COIN_PRICE_CRON_PATTERN;

    constructor() {
        super();
        this.coinMarketCapService = new CoinMarketCapService();
    }

    async handle() {
        const response = await this.coinMarketCapService.getPriceList();
        console.log(response);
    }
}
