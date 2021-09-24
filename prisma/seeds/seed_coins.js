import { COIN_LIST } from '../../src/constants';

function fakeCoins(prisma) {
    return Promise.all(
        COIN_LIST.map(data => prisma.coin.create({ data }))
    );
}

function tearDownCoins(prisma) {
    return prisma.coin.deleteMany({});
}

export {
    fakeCoins,
    tearDownCoins,
};
