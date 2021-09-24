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
