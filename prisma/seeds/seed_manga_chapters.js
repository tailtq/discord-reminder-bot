/**
 * @param {PrismaClient} prisma
 * @returns {*}
 */
function tearDownMangaChapters(prisma) {
    return prisma.mangaChapter.deleteMany({});
}

export {
    tearDownMangaChapters,
};
