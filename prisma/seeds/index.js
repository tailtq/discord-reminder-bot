import dotenv from 'dotenv';

dotenv.config();

import { fakeManga, tearDownManga } from './seed_manga';
import { fakeUsers, tearDownUsers } from './seed_users';
import { tearDownMangaChapters } from './seed_manga_chapters';
import { tearDownReminders } from './seed_reminders';
import prismaClient from '../index';
import { REMINDER_ITEMS } from '../../src/constants';
import { fakeCoins, tearDownCoins } from './seed_coins';

async function tearDownMangaData() {
    await tearDownReminders(prismaClient, REMINDER_ITEMS.mangaChapter);
    await tearDownMangaChapters(prismaClient);

    await Promise.all([
        tearDownManga(prismaClient),
        tearDownUsers(prismaClient),
    ]);
}

async function seedMangaData() {
    await Promise.all([
        fakeManga(prismaClient),
        fakeUsers(prismaClient),
    ]);
}

async function tearDownCoinData() {
    await tearDownReminders(prismaClient, REMINDER_ITEMS.coinPrice);
    await tearDownCoins(prismaClient);
}

async function seedCoinData() {
    await fakeCoins(prismaClient);
}

export {
    tearDownMangaData,
    seedMangaData,
    // ----
    tearDownCoinData,
    seedCoinData,
};
