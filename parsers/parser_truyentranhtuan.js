import Cheerio from 'cheerio';

import BaseParser from './base_parser.js';

const { default: $ } = Cheerio;

class ParserTruyenTranhTuan extends BaseParser {
    parseHTMLHomePage(htmlContent) {
        const root = $(htmlContent);
        const data = [];

        root.find('#story-list > .manga-focus').each((index, node) => {
            const mangaName = $(node).find('.manga > a').text();
            const chapter = $(node).find('.chapter > a').text().split(' ')[1];

            data.push({ mangaName, chapter });
        });

        return data;
    }

    async analyzeHomePageData(data) {

        // await this.prisma.user.create({
        //     data: {
        //         firstName: 'Tali',
        //         lastName: 'Le',
        //         platform: 'discord',
        //         platformId: '480527832137728002'
        //     },
        // });
        // console.log(result);
        console.log(await this.prisma.user.findMany());
    }
}

export default ParserTruyenTranhTuan;
