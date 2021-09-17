import dotenv from 'dotenv';

dotenv.config();

import { fakeManga, tearDownManga } from './seed_manga.js';
import { fakeUsers, tearDownUsers } from './seed_users.js';
import { tearDownMangaChapters } from './seed_manga_chapters.js';
import { tearDownReminders } from './seed_reminders';
import prismaClient from '../index';

async function tearDownDB() {
    await tearDownReminders(prismaClient);
    await tearDownMangaChapters(prismaClient);

    await Promise.all([
        tearDownManga(prismaClient),
        tearDownUsers(prismaClient),
    ]);
}

tearDownDB().then(async () => {
    await Promise.all([
        fakeManga(prismaClient),
        fakeUsers(prismaClient),
    ]);
});
