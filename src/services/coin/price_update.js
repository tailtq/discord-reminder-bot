import BaseService from '../base';

export default class PriceUpdateService extends BaseService {
    constructor() {
        super('priceUpdate');
    }

    createPriceUpdateMessage(priceUpdates) {
        return '\n' + priceUpdates.map(({ coin, conversions }) => {
            const { price } = conversions[0];
            let priceString;

            if (price >= 1) {
                priceString = (price).toFixed(4);
            } else {
                const zeroDecimals = -Math.floor(Math.log10(price) + 1);
                priceString = (price).toFixed(zeroDecimals + 4);
            }
            const padSpace = coin.symbol.padEnd(20, '-').replace(coin.symbol, '');

            return `- **[${coin.symbol}](${coin.binanceUrl}) ${padSpace}** $${priceString}`;
        }).join('\n');
    }
}
