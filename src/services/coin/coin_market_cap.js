import axios from 'axios';

export default class CoinMarketCapService {
    constructor() {
        this.host = 'https://pro-api.coinmarketcap.com/v1';
    }

    async getPriceList(start = 1) {
        const result = await axios.get(`${this.host}/cryptocurrency/listings/latest`, {
            params: {
                start,
                limit: 100,
                convert: 'USD',
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_KEY,
            },
        });
        return result.data;
    }

    /**
     * @param {Object} coins
     * @param {Array} priceUpdates
     */
    mapCoinsToRealTimePrice(coins, priceUpdates) {
        const interestingSymbols = Object.keys(coins);
        priceUpdates = priceUpdates.filter(element => interestingSymbols.indexOf(element.symbol) >= 0);
        priceUpdates.forEach((element) => {
            element.coinId = coins[element.symbol].id;
        });
        return priceUpdates;
    }

    /**
     * @param {Array} priceUpdates
     */
    transformToDBFormat(priceUpdates) {
        return priceUpdates.map((element) => ({
            data: {
                coinId: element.coinId,
                updatedTime: new Date(element.last_updated),
                conversions: {
                    create: [
                        {
                            convertTo: 'USD',
                            price: element.quote.USD.price,
                            volume24h: element.quote.USD.volume_24h,
                            percentChange: JSON.stringify({
                                percentChange1h: element.quote.USD.percent_change_1h,
                                percentChange24h: element.quote.USD.percent_change_24h,
                                percentChange7d: element.quote.USD.percent_change_7d,
                                percentChange30d: element.quote.USD.percent_change_30d,
                                percentChange60d: element.quote.USD.percent_change_60d,
                                percentChange90d: element.quote.USD.percent_change_90d,
                            }),
                        },
                    ],
                },
            },
            include: {
                coin: true,
                conversions: true,
            },
        }));
    }
}
