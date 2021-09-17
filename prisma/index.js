import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

const prismaClient = new PrismaClient();

export default prismaClient;
