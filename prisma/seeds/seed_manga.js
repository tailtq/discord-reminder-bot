function fakeManga(prisma) {
    const mangaList = [
        {
            name: 'One Piece',
            thumbnailUrl: 'https://images.mangafreak.net/manga_images/one_piece.jpg',
            otherNames: JSON.stringify([]),
        },
        {
            name: 'Jagaaaaaan',
            thumbnailUrl: 'https://cdn.truyentranh.net/upload/image/comic/20170303/jagaaaaaan-58b945b82d7bc-thumbnail-176x264.jpg',
            otherNames: JSON.stringify([]),
        },
        {
            name: 'Tokyo Revengers',
            thumbnailUrl: 'https://images.mangafreak.net/manga_images/toukyou_revengers.jpg',
            otherNames: JSON.stringify([
                'Tokyo卍Revengers',
                'Toukyou Revengers',
            ]),
        },
    ];
    return Promise.all(
        mangaList.map(data => prisma.manga.create({ data }))
    );
}

function tearDownManga(prisma) {
    return prisma.manga.deleteMany({});
}

export {
    fakeManga,
    tearDownManga,
};
