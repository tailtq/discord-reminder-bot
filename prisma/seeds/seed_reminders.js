/**
 * @param {PrismaClient} prisma
 * @returns {*}
 */
function tearDownReminders(prisma) {
    return prisma.reminder.deleteMany({});
}

export {
    tearDownReminders,
};
