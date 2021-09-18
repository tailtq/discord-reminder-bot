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
    {
        name: 'My Hero Academia',
        thumbnailUrl: 'https://xcdn-000.animemark.com/images/W600/02a/6044dcd1cc60840d83bdba20_223_350_62952.jpg',
        otherNames: JSON.stringify([]),
    },
    {
        name: 'Onepunch-Man',
        thumbnailUrl: 'https://images.mangafreak.net/manga_images/onepunch_man.jpg',
        otherNames: JSON.stringify([]),
    },
    {
        name: 'Overgeared',
        thumbnailUrl: 'https://images.mangafreak.net/manga_images/overgeared_team_argo.jpg',
        otherNames: JSON.stringify([
            'Overgeared (Team Argo)',
        ]),
    },
    {
        name: 'Kanojo, Okarishimasu',
        thumbnailUrl: 'https://images.mangafreak.net/manga_images/kanojo_okarishimasu.jpg',
        otherNames: JSON.stringify([]),
    },
];

export {
    PLATFORMS,
    REMINDER_ITEMS,
    MANGA_LIST,
};
