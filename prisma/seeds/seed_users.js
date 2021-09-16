async function fakeUsers(prisma) {
    const mangaList = [
        {
            firstName: 'Tai',
            lastName: 'Le',
            platform: PLATFORMS.discord,
            platformId: '480527832137728000',
        },
    ];
    await Promise.all(
        mangaList.map(data => prisma.user.create({ data }))
    );
}

export {
    fakeUsers,
};
