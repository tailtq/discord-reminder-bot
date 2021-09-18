import puppeteer from 'puppeteer';
import axios from 'axios';
import ParserMangaPark from './src/parsers/parser_mangapark';

(async () => {
    const content = await (new ParserMangaPark('https://mangapark.net')).parseHomePage()
    console.log(content);
})();
