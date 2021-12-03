/* Example in Node.js ES6 using request-promise */
import dotenv from 'dotenv';
import axios from 'axios';
import querystring from 'querystring';
import crypto from 'crypto';

dotenv.config();

import GateApi from 'gate-api';
const client = new GateApi.ApiClient();
// client.basePath = "https://some-other-host"

const api = new GateApi.SpotApi(client);
let opts = {
    'currency': 'raca' // string | Retrieve data of the specified currency
};
api.listSpotAccounts(opts)
    .then(value => console.log('API called successfully. Returned data: ', value.body),
        error => console.error(error))

opts = {
    'page': 1, // number | Page number
    'limit': 100,
};
api.listAllOpenOrders(opts)
    .then(value => console.log('API called successfully. Returned data: ', JSON.stringify(value.body, null, 4)),
        error => console.error(error))

// const url = 'https://api.gateio.ws/api/v4/spot/accounts';
// const params = {};
// // let bodyParam = {'contract': 'BTC_USD', 'size': 100, 'price': '30', 'tif': 'gtc'};
// let bodyParam = {};
// const method = 'GET';
// const auth = {
//     apiKey: '',
//     secretKey: '',
// };
// const commonHeaders = {'Accept': 'application/json', 'Content-Type': 'application/json'}
//
// const timestamp = (new Date().getTime() / 1000).toString();
// const resourcePath = new URL(url).pathname;
// const queryString = unescape(querystring.stringify(params));
// if (bodyParam && typeof bodyParam !== 'string') {
//     bodyParam = JSON.stringify(bodyParam);
// }
// const hashedPayload = crypto.createHash('sha512').update(bodyParam).digest('hex');
// const signatureString = [method, resourcePath, queryString, hashedPayload, timestamp].join('\n');
// const signature = crypto.createHmac('sha512', auth.secretKey).update(signatureString).digest('hex');
//
// const headers = {
//     'KEY': auth.apiKey,
//     'Timestamp': timestamp,
//     'SIGN': signature,
//     ...commonHeaders,
// }
// axios.request({
//     url,
//     method,
//     headers,
//     body: bodyParam,
// }).then((res) => {
//     console.log(Object.keys(res.data));
// }).catch((err) => {
//     console.log(err.response.data);
// });
