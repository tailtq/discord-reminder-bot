const PLATFORMS = {
    discord: 'discord',
};

const REMINDER_ITEMS = {
    mangaChapter: 'manga',
    anime: 'anime',
    coinPrice: 'coinPrice',
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
    {
        name: 'How to Fight',
        thumbnailUrl: 'https://xcdn-000.animemark.com/images/W600/ed6/60458203c9d6ca277900e6de_605_830_246998.png',
        otherNames: JSON.stringify([]),
    },
];

const COIN_LIST = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
        binanceUrl: 'https://www.binance.com/en/trade/BTC_USDT',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        binanceUrl: 'https://www.binance.com/en/trade/ETH_USDT',
    },
    {
        name: 'Cardano',
        symbol: 'ADA',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
        binanceUrl: 'https://www.binance.com/en/trade/ADA_USDT',
    },
    {
        name: 'Dogecoin',
        symbol: 'DOGE',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
        binanceUrl: 'https://www.binance.com/en/trade/DOGE_USDT',
    },
    {
        name: 'SHIBA INU',
        symbol: 'SHIB',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
        binanceUrl: 'https://www.binance.com/en/trade/SHIB_USDT',
    },
];

export {
    PLATFORMS,
    REMINDER_ITEMS,
    MANGA_LIST,
    COIN_LIST,
};
