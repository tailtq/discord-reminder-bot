import dotenv from 'dotenv';
import Prisma from '@prisma/client';

dotenv.config();

import { fakeManga } from './seed_manga.js';
import { fakeUsers } from './seed_users.js';

const prisma = new Prisma.PrismaClient();

Promise.all([
    fakeManga(prisma),
    fakeUsers(prisma),
]);
