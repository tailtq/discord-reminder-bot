import BaseService from '../../core/base_service';

/**
 * @deprecated This won't be maintained anymore
 */
export default class PriceUpdateService extends BaseService {
    constructor() {
        super('priceUpdate');
    }

    /**
     * @param priceUpdates
     * @returns {string}
     */
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

    async clearAllPriceUpdates() {
        const PriceUpdateConversionService = (await import('./price_update_conversion')).default;
        const priceUpdateConversionService = new PriceUpdateConversionService();
        await priceUpdateConversionService.deleteMany();
        await this.deleteMany();
    }
}
