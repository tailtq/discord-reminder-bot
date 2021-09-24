import axios from 'axios';

export default class CoinMarketCapService {
    async getPriceList(start = 1) {
        const result = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            params: {
                start,
                limit: '100',
                convert: 'USD',
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COIN,
            },
        });
        return result.data;
    }
}
