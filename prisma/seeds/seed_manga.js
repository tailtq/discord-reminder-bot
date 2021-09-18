import { MANGA_LIST } from '../../src/constants';

function fakeManga(prisma) {
    return Promise.all(
        MANGA_LIST.map(data => prisma.manga.create({ data }))
    );
}

function tearDownManga(prisma) {
    return prisma.manga.deleteMany({});
}

export {
    fakeManga,
    tearDownManga,
};
