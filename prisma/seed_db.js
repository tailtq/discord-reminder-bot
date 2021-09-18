import { tearDownDB, seedData } from './seeds';

tearDownDB().then(async () => {
    await seedData();
});
