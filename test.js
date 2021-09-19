import puppeteer from 'puppeteer';
import Cheerio from 'cheerio';
import axios from 'axios';

const { default: $ } = Cheerio;

(async () => {
    // try {
    //     const response = await axios.get('https://w12.mangafreak.net');
    //     console.log(response.data);
    // } catch (e) {
    //     const token = $(e.response.data).find('#challenge-form').attr('action');
    //     // const response = await axios.get(`https://w12.mangafreak.net${token}`);
    //     // console.log(response.data);
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setExtraHTTPHeaders({
    //         'Accept-Language': 'en'
    //     });
    //     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    //     await page.goto(`https://w12.mangafreak.net${token}`);
    //     await page.screenshot({ path: 'test.png' });
    //     const content = await page.content();
    //     await browser.close();
    //
    //     console.log(content);
    // }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto('https://w12.mangafreak.net/');
    await page.waitForTimeout(5000);
    await page.waitForNavigation();
    // const form = await page.$('#challenge-form');
    // await form.evaluate(form => form.submit());
    // const page2 = await browser.newPage();
    // await page2.goto('https://w12.mangafreak.net/');
    console.log(await page.content(), page.url());
    // const content = await page.content();
    // console.log(content);
    await browser.close();
    // // console.log(test);
    // // await page.goto('https://w12.mangafreak.net/');
    // await page.screenshot({ path: 'test.png' });

    // return content;
})();
