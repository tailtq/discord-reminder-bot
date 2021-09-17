import { PLATFORMS } from '../../constants';

function fakeUsers(prisma) {
    const mangaList = [
        {
            firstName: 'Tai',
            lastName: 'Le',
            platform: PLATFORMS.discord,
            platformId: '480527832137728000',
        },
    ];
    return Promise.all(
        mangaList.map(data => prisma.user.create({data})),
    );
}


function tearDownUsers(prisma) {
    return prisma.user.deleteMany({});
}

export {
    fakeUsers,
    tearDownUsers,
};
