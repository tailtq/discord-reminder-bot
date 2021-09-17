import dotenv from 'dotenv';
import Prisma from '@prisma/client';

dotenv.config();

import { fakeManga, tearDownManga } from './seed_manga.js';
import { fakeUsers, tearDownUsers } from './seed_users.js';
import { tearDownMangaChapters } from './seed_manga_chapters.js';
import { tearDownReminders } from './seed_reminders';

const prisma = new Prisma.PrismaClient();

async function tearDownDB() {
    await tearDownReminders(prisma);
    await tearDownMangaChapters(prisma);

    await Promise.all([
        tearDownManga(prisma),
        tearDownUsers(prisma),
    ]);
}

tearDownDB().then(async () => {
    await Promise.all([
        fakeManga(prisma),
        fakeUsers(prisma),
    ]);
});
