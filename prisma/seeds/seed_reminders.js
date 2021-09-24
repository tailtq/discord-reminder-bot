/**
 * @param {PrismaClient} prisma
 * @param {string} itemType
 * @returns {*}
 */
function tearDownReminders(prisma, itemType) {
    return prisma.reminder.deleteMany({
        where: {
            itemType,
        },
    });
}

export {
    tearDownReminders,
};
