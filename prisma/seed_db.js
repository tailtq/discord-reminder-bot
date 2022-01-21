import { tearDownMangaData, seedMangaData, tearDownCoinData, seedCoinData } from './seeds';

(async () => {
    await tearDownMangaData();
    await seedMangaData();
})();

// (async () => {
//     await tearDownCoinData();
//     await seedCoinData();
// })();
