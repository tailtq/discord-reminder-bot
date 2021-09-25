import BaseService from '../base';
import { COIN_LIST } from '../../constants';

export default class CoinService extends BaseService {
    constructor() {
        super('coin');
    }

    async syncCoinList() {
        for (let i = 0; i < COIN_LIST.length; i += 1) {
            const coin = COIN_LIST[i];
            const existingCoin = await super.findUnique({
                where: {
                    symbol: coin.symbol
                },
            });
            if (!existingCoin) {
                await super.create({ data: coin });
            }
        }
    }
}
