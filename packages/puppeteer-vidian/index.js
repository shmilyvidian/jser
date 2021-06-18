const puppeteer = require('puppeteer');
const { writeFile } = require('./utils/file');
const { evaluate } = require('./utils/evaluate')
const { account, password } = require('./config');
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });//打开浏览器
    const page = await browser.newPage();//打开一个空白页
    await page.goto('https://mubu.com/login');//打开豆瓣网站
    await page.click('body > div.mt-portal > div > div > div > div:nth-child(2) > div.sc-kEqYlL.bcxYtT > span > button')
    await page.waitForTimeout(1000);
    await page.type('body > div.mt-portal > div > div > div > div:nth-child(2) > div.sc-dIsAE.dWzdfH > div > div:nth-child(1) > div > input', account);
    await page.type('body > div.mt-portal > div > div > div > div:nth-child(2) > div.sc-dIsAE.dWzdfH > div > div:nth-child(2) > div > input', password);
    await page.click('body > div.mt-portal > div > div > div > div:nth-child(2) > button');
    await page.waitForNavigation({
        waitUntil: 'load'
    });

    // await page.screenshot({path: 'example.png'});//截个图
   
   
    // let cookie =  await evaluate(page, () => document.cookie);
    await page.evaluate(() => document.cookie);
    
    const token = `export default '${cookie}'`
    writeFile('/token.js', token)
    await browser.close();//关掉浏览器
})();