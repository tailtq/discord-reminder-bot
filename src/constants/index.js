const PLATFORMS = {
    discord: 'discord',
};

const REMINDER_ITEMS = {
    mangaChapter: 'manga',
    anime: 'anime',
};

const MANGA_LIST = [
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

export {
    PLATFORMS,
    REMINDER_ITEMS,
    MANGA_LIST,
};
