/* Example in Node.js ES6 using request-promise */

import axios from 'axios';

(async () => {
    const result = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        params: {
            start: '1',
            limit: '100',
            convert: 'USD',
        },
        headers: {
            'X-CMC_PRO_API_KEY': '5acdb09a-dda4-42aa-8923-55fd22fbb5d2',
        },
    });
    console.log(JSON.stringify(result.data.data[0], null, 2), result.data.data.length);
})();

const test = {
    'id': 1,
    'name': 'Bitcoin',
    'symbol': 'BTC',
    'slug': 'bitcoin',
    'num_market_pairs': 8737,
    'date_added': '2013-04-28T00:00:00.000Z',
    'tags': [],
    'max_supply': 21000000,
    'circulating_supply': 18824125,
    'total_supply': 18824125,
    'platform': null,
    'cmc_rank': 1,
    'last_updated': '2021-09-23T16:29:02.000Z',
    'quote': {
        'USD': {
            'price': 43778.99427854892,
            'volume_24h': 37794589086.05046,
            'percent_change_1h': -0.38874412,
            'percent_change_24h': 1.17829031,
            'percent_change_7d': -8.78042046,
            'percent_change_30d': -9.10606436,
            'percent_change_60d': 28.1190882,
            'percent_change_90d': 36.92654205,
            'market_cap': 824101260673.6897,
            'market_cap_dominance': 42.032,
            'fully_diluted_market_cap': 919358879849.53,
            'last_updated': '2021-09-23T16:29:02.000Z',
        },
    },
}

