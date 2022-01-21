import BaseService from '../../core/base_service';
import { COIN_LIST } from '../../constants';

/**
 * @deprecated This won't be maintained anymore
 */
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
