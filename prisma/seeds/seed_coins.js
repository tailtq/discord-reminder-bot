import { COIN_LIST } from '../../src/constants';

/**
 * @deprecated This won't be maintained anymore
 */
function fakeCoins(prisma) {
    return Promise.all(
        COIN_LIST.map(data => prisma.coin.create({ data }))
    );
}

/**
 * @deprecated This won't be maintained anymore
 */
function tearDownCoins(prisma) {
    return prisma.coin.deleteMany({});
}

export {
    fakeCoins,
    tearDownCoins,
};
