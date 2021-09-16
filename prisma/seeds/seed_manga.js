async function fakeManga(prisma) {
    const mangaList = [
        {
            name: 'One Piece',
            otherNames: JSON.stringify([]),
        },
        {
            name: 'Jagaaaaaan',
            otherNames: JSON.stringify([]),
        },
        {
            name: 'Tokyo Revengers',
            otherNames: JSON.stringify([]),
        },
    ];
    await Promise.all(
        mangaList.map(data => prisma.manga.create({ data }))
    );
}

export {
    fakeManga,
};
